import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Agenda } from 'react-native-calendars';
import { ScrollView, Spinner, Pressable, Icon, Box, Heading, Text, Stack, HStack, VStack, Center } from 'native-base';

import api from '../../../services/api';

const CardapioVazio = () => (
  <Center height='80%' px='4' justifyContent="center" alignItems="center">
    <Heading textAlign='center'>Nenhum cardápio para hoje</Heading>
  </Center>
)
const Carregando = () => (
  <Center height='100%' mt='4' justifyContent="center" alignItems="center">
    <Spinner size="lg" />
  </Center>
)

function CardapioDia(item) {
  return (
    <SafeAreaView>
      <Box p='4'>
        {item.cafes?.length > 0 && (
          <>
            <Box p='4' backgroundColor='white' borderRadius='8'>
              <Heading my='2'>Café da Manhã</Heading>
              {item.cafes?.map(cafe => (
                <Text my='1' key={cafe.id}>{cafe.name}</Text>
              ))}
            </Box>
          </>
        )}

        {item.almocos?.length > 0 && (
          <>
            <Box p='4' backgroundColor='white' borderRadius='8'>
              <Heading my='2'>Almoço</Heading>
              {item.almocos?.map(almoco => (
                <Box my='1' key={almoco.id}>{almoco.name}</Box>
              ))}
            </Box>
          </>
        )}

        {item.jantas?.length > 0 && (
          <>
            <Box p='4' backgroundColor='white' borderRadius='8'>
              <Heading my='2'>Jantar</Heading>
              {item.jantas?.map(janta => (
                <Box my='1' key={janta.id}>{janta.name}</Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </SafeAreaView>
  )
}

export default function Cardapio({ route }) {
  const { id } = route.params;
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const formatItems = (meals) => {
    const items = {};
    const hasCafe = meals.cafe.length > 0;
    const hasAlmoco = meals.almoco.length > 0;
    const hasJanta = meals.janta.length > 0;

    if (hasCafe || hasAlmoco || hasJanta) {
      Object.assign(items, {
        [meals.day]: []
      })

      if (hasCafe) {
        items[meals.day].push({ cafes: meals.cafe });
      }

      if (hasAlmoco) {
        items[meals.day].push({ almocos: meals.almoco });
      }

      if (hasJanta) {
        items[meals.day].push({ jantas: meals.janta });
      }
    }

    return items;
  }

  const buscarRefeicao = async (day) => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`restaurants/${id}/meals`, {
        params: { day: day.dateString }
      });

      const items = formatItems(data);
      setItems(items);
    } finally {
      setIsLoading(false);
    }
  }

  return <Agenda
    firstDay={0}
    onDayPress={(day) => buscarRefeicao(day)}
    renderItem={CardapioDia}
    renderEmptyData={isLoading ? Carregando : CardapioVazio}
    showOnlySelectedDayItems={true}
    items={items}
  />
}
