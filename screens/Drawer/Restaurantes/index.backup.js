import { useState } from 'react';
import { Center, Box, Select, FormControl, Heading, Text, VStack, Divider, Button } from 'native-base'

export default function Restaurantes() {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { name: 'Campus Petrolina' },
    { name: 'Campus Juazeiro' }
  ];

  return (
    <Center pt="4" px='2'>
      <Box w='100%' >
        <FormControl>
          <FormControl.Label>Selecione o RU: </FormControl.Label>
          <Select selectedValue={selectedItem} placeholder="Restaurante Universitário" onValueChange={value => setSelectedItem(value)} >
            {items.map(item => <Select.Item key={item.name} label={item.name} value={item.name} />)}
          </Select>
        </FormControl>
      </Box>
      {selectedItem && (
        <Box border="2" w='100%'>
          <Heading mt='4' fontSize={22}>{selectedItem}</Heading>
          <VStack space="4" divider={<Divider />}>
            <Box mt='2'>
              <Heading color='red.500' fontSize={28}>Fechado</Heading>
            </Box>
            <Box>
              <Heading mb='2'>Horários de funcionamento: </Heading>
              <Text>Café da manhã: 07:00 às 08:30 (segunda a sexta)</Text>
              <Text>Almoço: 11:00 às 13:30 (segunda a sexta)</Text>
              <Text>Jantar: 17:30 às 19:30 (segunda a sexta)</Text>
            </Box>
            <Button size='sm' colorScheme='lightBlue' onPress={() => console.log('Ver cardápio')}>
              Ver cardápio semanal
            </Button>
          </VStack>
        </Box>
      )
      }
    </Center >
  );
}
