import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, Pressable, Icon, Box, Heading, HStack, VStack } from 'native-base'

import api from '../../../services/api';

export default function Restaurantes({ navigation }) {
  const [campi, setCampi] = useState(null);

  const buscarCampi = () => {
    api.get('/campuses').then(({ data }) => {
      setCampi(data);
    }).catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    buscarCampi();
  }, []);

  return (
    <ScrollView>
      {campi && campi.map((campus) => (
        <Box key={campus.id} p={2}>
          <Box width={'100%'} rounded="lg" overflow="hidden" borderColor="coolGray.300" borderWidth="1" >
            <Pressable onPress={() => navigation.navigate('Rotas', { id: campus.id, name: campus.name })}>
              <VStack>
                <HStack p='4' space='3' alignItems='center'>
                  <Icon size='8' as={<MaterialCommunityIcons name="bus-multiple" />} color="blue.400" />
                  <Heading size="sm">{campus.name}</Heading>
                </HStack>

                <HStack p='3' space='3' alignItems='center' justifyContent='space-between' bgColor='blue.100'>
                  <Heading size="sm" fontSize='xs' color='blue.500'>Ver Rotas</Heading>
                  <Icon size='4' as={<MaterialCommunityIcons name="arrow-right" />} color="blue.500" />
                </HStack>
              </VStack>
            </Pressable>

          </Box>
        </Box>
      ))}
    </ScrollView>
  );
}
