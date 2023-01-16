import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, Pressable, Text, Icon, Box, Heading, Stack, HStack, VStack } from 'native-base'

import api from '../../../services/api';

export default function Rotas({ route, navigation }) {
  const [rotas, setRotas] = useState([]);
  const { id } = route.params;

  const buscarRotas = () => {
    api.get(`/campuses/${id}/transports/`)
      .then(({ data }) => {
        setRotas(data);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  useEffect(() => {
    buscarRotas();
  }, [])
  return (
    <ScrollView>
      {rotas && rotas.map(rota => (
        <Box key={rota.id} p={2}>
          <Box width={'100%'} rounded="lg" overflow="hidden" borderColor="coolGray.300" borderWidth="1" >
            <Pressable onPress={() => navigation.navigate('Paradas', { id, transportId: rota.id, name: rota.title, })}>
              <Stack p='3' space='4' backgroundColor='white'>
                <VStack>
                  <Heading>{rota.title}</Heading>
                  <Text color='gray.700'>{rota.busname}</Text>
                  <Text color='gray.400'>{rota.description}</Text>
                </VStack>

                <VStack>
                  <Heading fontSize='sm'>Origem: {rota.origin}</Heading>
                  <Heading fontSize='sm'>Destino: {rota.destination}</Heading>
                </VStack>
              </Stack>

            </Pressable>
          </Box>
        </Box>
      ))}

    </ScrollView>
  )
}
