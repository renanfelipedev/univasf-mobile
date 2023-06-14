import { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, RefreshControl } from 'react-native';
import { ScrollView, Center, Text, Box, Heading, Stack } from 'native-base';

import api from '../../../services/api';

import Carregando from '../../../components/Carregando';

export default function Comunicados() {

  const [comunicados, setComunicados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const buscarComunicados = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/announcements');
      setComunicados(data);
    } catch (error) {
      console.log(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  }, [])

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    buscarComunicados();
    setIsRefreshing(false);
  }, []);


  useEffect(() => {
    buscarComunicados();
  }, []);


  return isLoading ? <Carregando /> : (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      {comunicados.length <= 0 && <Heading padding={8} fontSize={18} textAlign='center'>Nenhum comunicado cadastrado!</Heading>}
      <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
        {comunicados.map(comunicado => (
          <Center key={comunicado.id}>
            <Box m='4' rounded="lg" overflow="hidden" borderColor="coolGray.300" borderWidth="1" p='2' backgroundColor='white' >
              <Stack p="1" space='3'>
                <Box p='4'>
                  <Heading size="md" ml="-1">{comunicado.title}</Heading>
                  <Text textAlign='justify' >{comunicado.body}</Text>
                </Box>
              </Stack>
            </Box>
          </Center>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
