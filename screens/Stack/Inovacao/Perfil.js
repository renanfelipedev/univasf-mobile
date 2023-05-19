import { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, Container, Pressable, Icon, Box, Heading, Text, HStack, VStack, Stack, Badge, Link, Divider } from 'native-base'

import Carregando from '../../../components/Carregando';

import api from '../../../services/api';

export default function Perfil({ route }) {
  const { cpf } = route.params;

  const [pesquisador, setPesquisador] = useState(null);
  const [loading, setLoading] = useState();


  useEffect(() => {
    async function buscarPesquisador() {
      setLoading(true);
      await api
        .get(`/researchers/${cpf}`)
        .then(({ data }) => {
          setPesquisador(data);
        })
        .catch(() => { });


      setLoading(false);
    }

    buscarPesquisador();
  }, [])

  return loading ? <Carregando /> : (
    <ScrollView >
      {pesquisador && (
        <Box p='4'>
          <VStack space='6' >
            <Box borderRadius='8' backgroundColor='white'>
              <Box>
                <Badge colorScheme='info'>
                  <Heading>Dados Pessoais</Heading>
                </Badge>
                <Box px='2'>
                  <Heading mt='2' size='sm'>{pesquisador.ds_nome}</Heading>
                  {pesquisador.vs_cargo && pesquisador.vs_cargo == 'S' && <Text>{pesquisador.ds_cargo}</Text>}
                  {pesquisador.vs_localtrabalho && pesquisador.vs_localtrabalho == 'S' && <Text>{pesquisador.ds_localtrabalho}</Text>}

                  <Heading size="sm" mt='2'>Contatos: </Heading>
                  {pesquisador.vs_telefone && pesquisador.vs_telefone == 'S' && <Text>{pesquisador.ds_telefone}</Text>}
                  {pesquisador.vs_email && pesquisador.vs_email == 'S' && <Text>{pesquisador.ds_email}</Text>}
                </Box>
              </Box>

              <Box mt='4'>
                <Badge colorScheme='info'>
                  <Heading>Formações e cursos</Heading>
                </Badge>
                {pesquisador && pesquisador.formacoes && pesquisador.formacoes.map((formacao) => (
                  <VStack space='2' px='2'>
                    <Box mt='2'>
                      <Text fontWeight='semibold'>
                        {formacao.ds_curso} -
                        <Text color='gray.500'>({formacao.nm_ano_inicio}/{formacao.nm_ano_fim})</Text>
                      </Text>
                      <Text>{formacao.cd_nivel}</Text>
                      <Text mb='2'>{formacao.ds_nome_instituicao}</Text>
                    </Box>
                  </VStack>
                ))}
              </Box>
            </Box>

            <Box borderRadius='8' backgroundColor='white'>
              <Badge colorScheme='warning'>
                <Heading>Áreas de conhecimento</Heading>
              </Badge>
              {pesquisador && pesquisador.conhecimentos && pesquisador.conhecimentos.map((conhecimento) => (
                <VStack space='2' p='2'>
                  <Box mt='4'>
                    <Text fontWeight='semibold'>{conhecimento.ds_descricao}</Text>

                    <HStack mt='4' space='1' flexWrap='wrap'>
                      <Badge m='1'>{conhecimento.ds_palavra_chave_1}</Badge>
                      <Badge m='1'>{conhecimento.ds_palavra_chave_2}</Badge>
                      <Badge m='1'>{conhecimento.ds_palavra_chave_3}</Badge>
                      <Badge m='1'>{conhecimento.ds_palavra_chave_4}</Badge>
                    </HStack>
                  </Box>
                </VStack>
              ))}
            </Box>

            <Box borderRadius='8' backgroundColor='white'>
              <Badge colorScheme='warning'>
                <Heading>Linhas de pesquisa</Heading>
              </Badge>
              {pesquisador && pesquisador.linhaspesquisa && pesquisador.linhaspesquisa.map((linha) => (
                <VStack space='2' p='2'>
                  <Box mt='4'>
                    <Text fontWeight='semibold'>{linha.ds_titulo} - {`${linha.nm_mes_inicio}/${linha.nm_ano_inicio}`}</Text>
                    <Text>{linha.ds_nome_orgao}</Text>
                  </Box>
                </VStack>
              ))}
            </Box>

            <Box borderRadius='8' backgroundColor='white'>
              <Badge colorScheme='warning'>
                <Heading>Laboratórios</Heading>
              </Badge>
              {pesquisador && pesquisador.laboratorios && pesquisador.laboratorios.map((laboratorio) => (
                <VStack space='2' p='2'>
                  <Box mt='4'>
                    <Text fontWeight='semibold'>{laboratorio.ds_nome}</Text>
                    <Text textAlign='justify' mt='2'>{laboratorio.ds_descricao}</Text>

                    <HStack mt='4' space='1' flexWrap='wrap'>
                      <Badge m='1'>{laboratorio.ds_palavra_chave_1}</Badge>
                      <Badge m='1'>{laboratorio.ds_palavra_chave_2}</Badge>
                      <Badge m='1'>{laboratorio.ds_palavra_chave_3}</Badge>
                      <Badge m='1'>{laboratorio.ds_palavra_chave_4}</Badge>
                    </HStack>

                  </Box>

                </VStack>
              ))}
            </Box>
          </VStack>
        </Box>
      )}

    </ScrollView >
  );
}
