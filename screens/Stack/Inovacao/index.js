import { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, Container, Pressable, Icon, Box, Heading, Text, HStack, VStack, Badge, Link } from 'native-base'

import Carregando from '../../../components/Carregando';

import api from '../../../services/api';

export default function Inovacao({ navigation }) {

  const [pesquisadores, setPesquisadores] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function buscarPesquisadores() {
      try {
        setLoading(true);
        const { data } = await api.get('/researchers');

        setPesquisadores(data);
      } catch (error) {

      } finally {
        setLoading(false);
      }

    }

    buscarPesquisadores();
  }, [])

  return loading ? <Carregando /> : (
    <ScrollView >
      <VStack p='4' space='4' >
        <Heading textAlign='center' >Busque informações sobre conhecimentos e habilidades dos pesquisadores da universidade</Heading>

        <Box>
          <Text fontSize='18' textAlign='left'>Com dados obtidos através do Sistema de Mapeamento de Competências - SisMapCI é possível identificar as áreas de atuação em pesquisa dos pesquisadores da instituição</Text>

          <Link mt='4' isExternal href='https://www.sistemas.univasf.edu.br/sismapci/'>Acesse aqui o SisMapCI</Link>
        </Box>

        <Text fontWeight='bold' fontSize='18'>Pesquisadores mais buscados no SisMapCI: </Text>

        {pesquisadores && pesquisadores.map && pesquisadores.map((pesquisador) => (
          <Box width='100%' rounded="lg" overflow="hidden" borderColor="coolGray.300" borderWidth="1" backgroundColor='white' key={pesquisador.ds_cpf}>
            <Pressable onPress={() => { navigation.navigate('Perfil', { cpf: pesquisador.ds_cpf }) }}>
              <VStack >
                <Box p='4'>
                  <Heading size="sm">{pesquisador.ds_nome}</Heading>
                  <Text mt='2'>{pesquisador.ds_cargo} - {pesquisador.ds_localtrabalho}</Text>
                </Box>
                <HStack p='3' space='3' justifyContent='space-between' alignItems='center' bgColor='blue.100'>
                  <Text fontSize='sm' fontWeight='bold' color='blue.700'>Ver Perfil</Text>
                  <Icon size='4' as={<MaterialCommunityIcons name="arrow-right" />} color="blue.500" />
                </HStack>
              </VStack>
            </Pressable>
          </Box>
        ))}
      </VStack>
    </ScrollView >
  );
}
