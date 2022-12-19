import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Heading, Text, Pressable, Stack, Icon, HStack } from 'native-base'

import api from '../../../services/api';

export default function Calendarios({ navigation }) {
  const [calendarios, setCalendarios] = useState([]);

  const buscarCalendarios = () => {
    api.get('/calendars').then(({ data }) => {
      setCalendarios(data);
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    buscarCalendarios();
  }, []);


  return calendarios.map((calendario) => (
    <Box alignItems="center" key={calendario.id} p={2}>
      <Box width={'100%'} rounded="lg" overflow="hidden" borderColor="coolGray.300" borderWidth="1" shadow="3" >
        <Pressable onPress={() => console.log(calendario)}>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">{calendario.title}</Heading>
              <Text color='gray.400'>Início em {calendario.formatted_start_at} - Término em {calendario.formatted_end_at}</Text>

              <HStack alignItems='center' justifyContent='space-between'>
                <Text fontWeight="medium" color="darkBlue.600">
                  Ver calendário
                </Text>
                <Icon size="5" as={<MaterialCommunityIcons name="arrow-right" />} color="darkBlue.600" />
              </HStack>
            </Stack>
          </Stack>
        </Pressable>
      </Box>
    </Box>
  ));
}