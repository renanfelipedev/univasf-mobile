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
          <Center my='2' key={comunicado.id}>
            <Box alignItems="center" >
              <Box minWidth='80' maxWidth='80' rounded="lg" overflow="hidden" borderColor="coolGray.300" borderWidth="1" p='2' backgroundColor='white' >
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1">{comunicado.title}</Heading>
                  </Stack>
                  <Text textAlign={'justify'} fontWeight="400">{comunicado.body}</Text>
                </Stack>
              </Box>
            </Box>
          </Center>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
