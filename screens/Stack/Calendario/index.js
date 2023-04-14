import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { CalendarList, Calendar, Agenda } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Center, Spinner, Heading, Text } from 'native-base'

import api from '../../../services/api';

import Carregando from '../../../components/Carregando';

const CalendarioVazio = () => (
  <Center height='80%' px='4' justifyContent="center" alignItems="center">
    <Heading textAlign='center'>'Os dias com marcação, possuem eventos cadastrados. Verifique!</Heading>
  </Center>
)

const Eventos = (item) => (
  <SafeAreaView>
    <Box backgroundColor='white' mt='4' p='4' borderRadius='8'>
      <Text>{item.title}</Text>
    </Box>
  </SafeAreaView>
)

export default function Calendario() {
  const [eventos, setEventos] = useState([]);
  const [items, setItems] = useState();
  const [dates, setDates] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const evento = { marked: true, dotColor: '#075985', selectedColor: '#e0f2fe', selectedTextColor: '#0c4a6e' };

  async function buscarEventosPorDia(day) {
    try {
      const { data } = await api.get('calendar-events', { params: { day: day.dateString } });
      getItems(data);
    } catch (error) {

    }

  }

  async function buscarEventos() {
    try {
      setIsLoading(true);
      const { data } = await api.get('/calendar-events');
      setEventos(data);
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
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

    eventos.map(({ date }) => {
      Object.assign(markedDates, {
        [date]: evento
      })
    });

    return markedDates;
  }

  function getItems(data) {
    const newItems = formatarItens(data);
    setItems(newItems)
  }

  function getDates() {
    const newDates = formatarDatas(eventos);
    setDates(newDates);
  }

  useEffect(() => {
    buscarEventos();
    getDates();
  }, []);

  return isLoading
    ? <Carregando />
    : (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <Agenda
          onDayPress={(day) => buscarEventosPorDia(day)}
          firstDay={0}
          renderEmptyData={() => <CalendarioVazio isLoading={isLoading} />}
          renderItem={Eventos}
          markedDates={dates}
          items={items}
        />
      </SafeAreaView>
    );
}
