import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, Pressable, Text, Icon, Box, Heading, Stack, HStack, VStack } from 'native-base'

import api from '../../../services/api';

export default function Paradas({ route, navigation }) {
  const [paradas, setParadas] = useState([]);
  const { id, transportId } = route.params;

  const buscarParadas = () => {
    api.get(`/campuses/${id}/transports/${transportId}`)
      .then(({ data }) => {
        console.log(data);
        setParadas(data);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  useEffect(() => {
    buscarParadas();
  }, [])
  return (
    <ScrollView>
      {paradas && paradas.map(parada => (
        <Box key={parada.id} p={2}>
          <Box width={'100%'} rounded="lg" overflow="hidden" borderColor="coolGray.300" borderWidth="1" >
            <HStack p='4' backgroundColor='white' justifyContent='space-between'>
              <Heading fontSize='lg'>{parada.time}</Heading>
              <Text fontSize='sm'>{parada.title}</Text>
            </HStack>
          </Box>
        </Box>
      ))}

    </ScrollView>
  )
}
