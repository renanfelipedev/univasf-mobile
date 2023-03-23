import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Agenda, ExpandableCalendar } from 'react-native-calendars';
import { ScrollView, Pressable, Icon, Box, Heading, Text, Stack, HStack, VStack } from 'native-base';

function CardapioVazio() {
  return <Heading mt='4' p='2' textAlign='center'>Nenhum cardápio para esse dia</Heading>
}

function CardapioDia(item) {
  return (
    <Box p='2'>
      <Heading>{item.name}</Heading>
    </Box>
  )
}

export default function Cardapio() {
  return <Agenda renderItem={CardapioDia} renderEmptyData={CardapioVazio} showOnlySelectedDayItems={true} items={{
    '2023-01-22': [],
    '2023-01-27': [{ name: 'Teste' }],
  }} />
}
