import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, Pressable, Icon, Box, Badge, Heading, Text, Stack, HStack, VStack } from 'native-base'

import api from '../../../services/api';

export default function Restaurantes({ navigation }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [campi, setCampi] = useState(null);

  const buscarCampi = () => {
    api.get('/restaurants').then(({ data }) => {
      setCampi(data);
    }).catch(error => {
      console.log(error);
    });
  }

  const handleOnPress = (campus) => {

  }

  useEffect(() => {
    buscarCampi();
  }, []);

  return (
    <ScrollView>
      {campi && campi.map((campus) => (
        <Box key={campus.id} p={2}>
          <Box width='100%' rounded="lg" overflow="hidden" borderColor="coolGray.300" borderWidth="1" backgroundColor='white'>
            <Pressable onPress={() => navigation.navigate('Cardapio', { id: campus.id, name: campus.name })}>
              <VStack >
                <HStack p='4' space='3'>
                  <Icon size='8' as={<MaterialCommunityIcons name="silverware-variant" />} color="yellow.400" />

                  <VStack alignItems="flex-start">
                    <Heading size="sm">{campus.name}</Heading>
                    <Box mt='1'>
                      {
                        campus.isOpen ?
                          (
                            <Badge colorScheme='success' borderRadius='12'>
                              <Text fontWeight='bold'>Aberto</Text>
                            </Badge>
                          ) :
                          (
                            <Badge colorScheme='danger' borderRadius='12'>
                              <Text fontWeight='bold'>Fechado</Text>
                            </Badge>
                          )
                      }
                    </Box>
                  </VStack>
                </HStack>
                <HStack p='3' space='3' justifyContent='space-between' alignItems='center' bgColor='yellow.100'>
                  <Text fontSize='sm' fontWeight='bold' color='yellow.700'>Ver cardápios</Text>
                  <Icon size='4' as={<MaterialCommunityIcons name="arrow-right" />} color="yellow.500" />
                </HStack>
              </VStack>
            </Pressable>
          </Box>
        </Box>
      ))
      }
    </ScrollView >
  );
}
