import { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, RefreshControl } from 'react-native';
import { ScrollView, Center, Text, Box, Heading, Stack, Link, Divider, AspectRatio, Image } from 'native-base';

import Carregando from '../../../components/Carregando';

import api from '../../../services/api';

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const buscarNoticias = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/posts');
      setNoticias(data);
    } catch (error) {
      console.log(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  }, [])

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    buscarNoticias();
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    buscarNoticias();
  }, []);

  return isLoading ? <Carregando /> : (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      {noticias.length <= 0 && <Heading padding={8} fontSize={18} textAlign='center'>Nenhuma notícia cadastrada!</Heading>}

      <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
        {noticias.map(noticia => (
          <Center key={noticia.id}>
            <Box m='2' rounded="lg" overflow="hidden" borderColor="coolGray.300" borderWidth="1" p='4' backgroundColor='white' >
              {noticia.image_url && (
                <Box>
                  <AspectRatio w='full' maxW='full' ratio={16 / 9}>
                    <Image resizeMode="contain" source={{ uri: noticia.image_url }} alt="image" />
                  </AspectRatio>
                </Box>
              )}
              <Stack p='1' space={3}>
                <Box p='4'>
                  <Heading size="md" ml="-1">{noticia.title}</Heading>
                  <Text textAlign={'justify'} fontWeight="400">{noticia.body}</Text>

                  {noticia.slug && (
                    <Box mt='4'>
                      <Divider />
                      <Link isExternal href={noticia.full_slug}>Acesse aqui para mais informações no site</Link>
                    </Box>
                  )}
                </Box>
              </Stack>
            </Box>
          </Center>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
