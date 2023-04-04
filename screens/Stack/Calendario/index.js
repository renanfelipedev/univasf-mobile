import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'native-base'

import api from '../../../services/api';

export default function Calendario({ navigation }) {
  const [eventos, setEventos] = useState([]);
  const [dates, setDates] = useState({});

  const eventoMark = { selected: true, selectedColor: '#e0f2fe', selectedTextColor: '#0c4a6e', marked: true, dotColor: '#075985' };

  function buscarCalendarios() {
    api.get('/calendars').then(({ data }) => {
    }).catch(error => console.log(error));
  }

  function buscarEventos() {
    api.get('/events').then(({ data }) => {
      setEventos(data)
    }).catch(error => console.log(error));
  }

  function formatarDatas(eventos) {
    const markedDates = {};

    eventos.map(evento => {
      Object.assign(markedDates, {
        [evento.date]: eventoMark
      });
    });

    return markedDates;
  }

  useEffect(() => {
    buscarCalendarios();
    buscarEventos();

    const newDates = formatarDatas(eventos);
    setDates(newDates);
  }, []);

  useEffect(() => {
  }, [dates]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <CalendarList firstDay={0} markedDates={dates} onDayPress={(day) => {
        console.log(day);
      }} />
    </SafeAreaView>
  );
}
