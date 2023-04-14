import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, Box, Heading, Text, Pressable, Stack, Icon, HStack, Spinner } from 'native-base'

import api from '../../../services/api';

import Carregando from '../../../components/Carregando';

export default function Calendarios({ navigation }) {
  const [calendarios, setCalendarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function buscarCalendarios() {
    setIsLoading(true);
    const { data } = await api.get('/calendars');
    setCalendarios(data);
    setIsLoading(false);
  }

  useEffect(() => {
    buscarCalendarios();
  }, []);

  return isLoading ? <Carregando /> : (
    <SafeAreaView>
      <ScrollView>
        {calendarios.length <= 0 && <Heading>Nenhum calendário cadastrado</Heading>}
        {calendarios.map((calendario) => (
          <Box alignItems="center" key={calendario.id} p={2}>
            <Box width={'100%'} rounded="lg" overflow="hidden" borderColor="coolGray.300" borderWidth="1" backgroundColor='white' >
              <Pressable onPress={() => navigation.navigate('Calendario', { id: calendario.id, name: calendario.title })}>
                <Stack p='4' space='3'>
                  <Heading size="md" ml="-1">{calendario.title}</Heading>
                  <Text color='gray.500'>Início em {calendario.formatted_start_at} - Término em {calendario.formatted_end_at}</Text>

                  <HStack alignItems='center' justifyContent='space-between'>
                    <Text fontWeight="medium" color="darkBlue.600">
                      Ver calendário
                    </Text>
                    <Icon size="5" as={<MaterialCommunityIcons name="arrow-right" />} color="darkBlue.600" />
                  </HStack>
                </Stack>

              </Pressable>
            </Box>
          </Box>
        ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}
