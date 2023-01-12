import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, Pressable, Icon, Center, Box, Select, FormControl, Heading, Text, Stack, HStack, VStack, Divider, Button } from 'native-base'

import api from '../../../services/api';

export default function Restaurantes() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [campi, setCampi] = useState(null);

  const buscarCampi = () => {
    api.get('/restaurants').then(({ data }) => {
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
          <Box width={'100%'} rounded="lg" overflow="hidden" borderColor="coolGray.300" borderWidth="1" shadow="3" >
            <Pressable onPress={() => console.log(campus)}>
              <VStack>
                <HStack p="4" space={3} alignItems='center'>
                  <Icon size="8" as={<MaterialCommunityIcons name="food-fork-drink" />} color="orange.600" />

                  <VStack space={2}>
                    <Heading size="sm">{campus.name}</Heading>
                    <Text>Aberto</Text>
                  </VStack>
                </HStack>
                <HStack alignItems='center' alignSelf='end' p='2' space='2'>
                  <Text fontSize="xs" color="darkBlue.700">Ver Cardápio</Text>
                  <Icon size="5" as={<MaterialCommunityIcons name="arrow-right" />} color="darkBlue.600" />
                </HStack>
              </VStack>
            </Pressable>
          </Box>
        </Box>
      ))}
    </ScrollView>
  );
}
