import { useState, useEffect } from 'react';
import { NewCalendarList, Calendar } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Heading, Text, Pressable, Stack, Icon, HStack } from 'native-base'

import api from '../../../services/api';

export default function Calendario({ navigation }) {
  const [calendario, setCalendario] = useState([]);

  const buscarCalendarios = () => {
    api.get('/calendars').then(({ data }) => {
      setCalendario(data);
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    buscarCalendarios();
  }, []);


  return (<NewCalendarList />);
}
