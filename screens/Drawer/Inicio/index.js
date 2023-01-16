import { useState, useEffect } from 'react';
import { ScrollView, Center, Text, Box, Heading, Stack, Link, Divider, AspectRatio, Image } from 'native-base';

import api from '../../../services/api';

export default function Inicio() {
  const [noticias, setNoticias] = useState([]);

  const buscarNoticias = () => {
    api.get('/posts').then(({ data }) => {
      setNoticias(data);
    }).catch(error => {
      console.log(error.message);
    });
  }

  useEffect(() => {
    buscarNoticias();
  }, []);

  return (
    <ScrollView onS>
      {!noticias && <Heading>Nenhuma notícia cadastrada!</Heading>}

      {noticias.map(noticia => (
        <Center mt={4} key={noticia.id}>
          <Box alignItems="center" >
            <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.300" borderWidth="1" >
              {noticia.image_url && (
                <Box>
                  <AspectRatio w='100%' ratio={16 / 9}>
                    <Image resizeMode="contain" source={{ uri: noticia.image_url }} alt="image" />
                  </AspectRatio>
                </Box>
              )}
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">{noticia.title}</Heading>
                  {/* <Text fontSize="xs" fontWeight="500" ml="-0.5" mt="-1">The Silicon Valley of India.</Text> */}
                </Stack>
                <Text textAlign={'justify'} fontWeight="400">{noticia.body}</Text>
                <Divider />
                <Link isExternal href={noticia.full_slug}>Acesse aqui para mais informações no site</Link>
              </Stack>
            </Box>
          </Box>
        </Center>
      ))}
    </ScrollView>
  );
}
