import { useState, useEffect } from 'react';
import { CalendarList } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Heading, Text, Pressable, Stack, Icon, HStack } from 'native-base'

import api from '../../../services/api';

export default function Calendario({ navigation }) {
  const [calendario, setCalendario] = useState([]);

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;

  const buscarCalendarios = () => {
    api.get('/calendars').then(({ data }) => {
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    buscarCalendarios();
  }, []);


  return (<CalendarList showScrollIndicator={true} />);
}
