import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { CalendarList, Calendar, Agenda } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Center, Spinner, Heading, Text } from 'native-base'

import api from '../../../services/api';

const CalendarioVazio = () => (
  <Center height='80%' px='4' justifyContent="center" alignItems="center">
    <Heading textAlign='center'>Os dias com marcação, possuem eventos cadastrados. Verifique!</Heading>
  </Center>
)
const Carregando = () => (
  <Center height='100%' mt='4' justifyContent="center" alignItems="center">
    <Spinner size="lg" />
  </Center>
)

const Eventos = (item) => (
  <SafeAreaView>
    <Box backgroundColor='white' mt='4' p='4' borderRadius='8'>
      <Text>{item.title}</Text>
    </Box>
  </SafeAreaView>
)

export default function Calendario({ navigation, route }) {
  const [eventos, setEventos] = useState([]);
  const [items, setItems] = useState();
  const [dates, setDates] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const evento = { marked: true, dotColor: '#075985', selectedColor: '#e0f2fe', selectedTextColor: '#0c4a6e' };

  function buscarEventosPorDia(day) {
    api.get(`/events`, { params: { day: day.dateString } })
      .then(({ data }) => {
        const newItems = formatarItens(data);
        setItems(newItems)
      })
      .catch((error) => console.log(error));
  }

  function buscarEventos() {
    api.get(`/events`)
      .then(({ data }) => setEventos(data))
      .catch((error) => console.log(error));
  }

  function formatarItens(eventos) {
    const items = {};
    const array = [];
    eventos.map((evento) => {
      array.push(evento);
      Object.assign(items, {
        [evento.date]: array
      })
    })

    return items;
  }

  function formatarDatas(eventos) {
    const markedDates = {};

    eventos.map(({ start_at, end_at, date }) => {
      if (date) {
        Object.assign(markedDates, {
          [date]: evento
        })
      } else {
        Object.assign(markedDates, {
          [start_at]: evento
        })
      }

    });

    return markedDates;
  }

  useEffect(() => {
    setIsLoading(true);
    buscarEventos();
    const newDates = formatarDatas(eventos);
    setDates(newDates);
    setIsLoading(false);
  }, []);

  return isLoading
    ? <Carregando />
    : (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <Agenda
          onDayPress={(day) => buscarEventosPorDia(day)}
          firstDay={0}

          renderEmptyData={isLoading ? Carregando : CalendarioVazio}
          renderItem={Eventos}
          markedDates={dates}
          items={items}

        />
      </SafeAreaView>
    );
}
