import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Text, Button, VStack, HStack, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAuth } from '../../../hooks/auth';

export default function CustomDrawerHeader() {


  const { user, loading, logOut } = useAuth();
  const navigation = useNavigation();

  return user ? (
    <Box px="4">
      <Text bold color="gray.700">
        Bem vindo, {user.nome}
      </Text>
      <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
        {user.email}
      </Text>
      <Button mt="2" rounded="md" size="sm" variant='outline' colorScheme='red' onPress={logOut} isLoading={loading} >
        Sair
      </Button>
    </Box>
  ) : (
    <Box px="4">
      <HStack alignItems='center'>
        <Icon size='6xl' mr='4' as={<MaterialCommunityIcons name='account-circle-outline' />} />

        <Button maxW='full' mt="2" rounded="md" size="sm" variant='outline' colorScheme='primary' onPress={() => navigation.navigate('Fazer Login')} >
          Entrar
        </Button>
      </HStack>
    </Box>
  )
}
