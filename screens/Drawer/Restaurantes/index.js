import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, Pressable, Icon, Center, Box, Select, FormControl, Heading, Text, Stack, HStack, VStack, Divider, Button } from 'native-base'

import api from '../../../services/api';

export default function Restaurantes() {
  const [selectedItem, setSelectedItem] = useState(null);
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
          <Box width={'100%'} rounded="lg" overflow="hidden" borderColor="coolGray.300" borderWidth="1" shadow="3" >
            <Pressable onPress={() => console.log('teste')}>
              <Stack p="4" space={3}>
                <HStack alignItems='center' justifyContent='space-between'>
                  <HStack alignItems='center' space={4}>
                    <Icon size="4" as={<MaterialCommunityIcons name="food-variant" />} color="orange.600" />
                    <VStack space={2}>
                      <Heading size="sm">{campus.name}</Heading>
                      <Text>Aberto</Text>
                    </VStack>
                  </HStack>
                  <Box>
                    <Icon size="4" as={<MaterialCommunityIcons name="arrow-right" />} color="darkBlue.600" />
                  </Box>
                </HStack>
              </Stack>
            </Pressable>
          </Box>
        </Box>
      ))}
    </ScrollView>
  );
}
