import { useState, useEffect } from 'react';
import { ScrollView, Center, Text, Box, Heading, Stack, HStack, Link, Spacer, Badge } from 'native-base';

import api from '../../../services/api';

export default function Eventos() {
  const [eventos, setEventos] = useState([]);

  const buscarEventos = () => {
    api.get('/events').then(({ data }) => {

    }).catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    buscarEventos();
  }, []);
  return (
    <ScrollView>
      {!eventos && <Heading>Nenhum evento cadastrado!</Heading>}

      {eventos.map(evento => (
        <Center mt={4} key={evento.id}>
          <Box alignItems="center" >
            <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.300" borderWidth="1" >
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="sm">{evento.title}</Heading>
                  {evento.description && (<Text fontSize="xs" textAlign="justify" >{evento.description}</Text>)}
                  {evento.start_at && evento.end_at && (<Text fontSize="xs" fontWeight="500" >{evento.formatted_start_at} à {evento.formatted_end_at}</Text>)}
                </Stack>
              </Stack>

              <Box p={2} backgroundColor="gray.300">
                <HStack alignItems="center" justifyContent='space-between'>
                  <Badge mr='8' colorScheme="darkBlue" _text={{
                    color: "white"
                  }} variant="solid" rounded="4">
                    {evento.formatted_date}
                  </Badge>
                  <Spacer />
                  <Link fontSize={10} color="coolGray.800">
                    Clique para mais informações
                  </Link>
                </HStack>
              </Box>
            </Box>
          </Box>
        </Center>
      ))}
    </ScrollView>
  );
}
