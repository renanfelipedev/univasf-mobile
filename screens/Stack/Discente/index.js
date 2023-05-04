import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, Container, Pressable, Icon, Box, Heading, Text, HStack, VStack } from 'native-base'

import api from '../../../services/api';
import { useAuth } from '../../../hooks/auth';
import Carregando from '../../../components/Carregando';

export default function Discente({ navigation }) {

  const [vinculos, setVinculos] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    async function obterVinculos() {
      setLoading(true);
      const { data } = await api.get('/vinculos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setVinculos(data);
      setLoading(false);
    }

    obterVinculos();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Box p='4' space='4'>
        <Heading>Meus vínculos</Heading>

        {loading ? <Carregando /> : (
          <VStack mt='4'>
            {vinculos.map(vinculo => (
              <Pressable mt='4' key={vinculo.ds_matricula} p='4' backgroundColor='white' borderRadius='8' onPress={() => navigation.navigate('Vinculos', { matricula: vinculo.ds_matricula })}>
                <Text fontWeight='bold'>{vinculo.curso.ds_nomecurso}</Text>
                <Text mt='2'>
                  Matrícula: {vinculo.ds_matricula} - {vinculo.situacao ? vinculo.situacao?.ds_tiposituacaoaluno : <Text color='red.500'>Desvinculado</Text>}
                </Text>
              </Pressable>
            ))}
          </VStack>
        )}
      </Box>
    </ScrollView>
  );
}
