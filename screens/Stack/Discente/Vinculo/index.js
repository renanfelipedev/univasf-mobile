import { useEffect, useState } from 'react';
import { ScrollView, Container, Pressable, Icon, Box, Heading, Text, HStack, VStack, Badge } from 'native-base'

import Carregando from '../../../../components/Carregando';

import api from '../../../../services/api';

export default function Vinculo({ route }) {
  const [vinculo, setVinculo] = useState({});
  const [loading, setLoading] = useState(false);

  const { matricula } = route.params;

  useEffect(() => {
    async function obterDisciplinas() {
      setLoading(true);
      api.get(`/vinculos/${matricula}/historico`)
        .then(({ data }) => setVinculo(data))
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }

    obterDisciplinas();
  }, []);

  return loading ? <Carregando /> :
    (
      <ScrollView >
        <Box p='4' space='4'>
          <Heading mb='8'>Disciplinas cursadas</Heading>

          {vinculo?.historico?.map(disciplina => {
            const { id_historicoalunos, situacao_disciplina, ds_situacaodisciplina, nm_ano, nm_semestre, nm_nota, nm_conceito } = disciplina;

            return (
              <Box p='4' m='2' key={id_historicoalunos} backgroundColor='white' borderRadius='8'>
                <HStack justifyContent='space-between'>
                  <Text isTruncated w='75%' fontWeight='bold'>{disciplina.disciplina.ds_disciplina}</Text>
                  <Badge>{`${nm_ano}.${nm_semestre}`}</Badge>
                </HStack>
                <Box>

                </Box>
                <HStack alignItems='center' justifyContent='space-between' mt='4'>
                  {ds_situacaodisciplina && <Badge colorScheme={ds_situacaodisciplina == 'A' ? 'success' : 'danger'}>{situacao_disciplina}</Badge>}
                  {nm_nota && (
                    <Badge>
                      <Text>Nota: {nm_nota}</Text>
                    </Badge>
                  )}
                  {nm_conceito && (
                    <Badge>
                      <Text>Nota: {nm_conceito}</Text>
                    </Badge>
                  )}
                </HStack>
              </Box>
            )
          })}


        </Box>
      </ScrollView>
    )

}
