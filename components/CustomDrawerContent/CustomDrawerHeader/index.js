import { useState } from 'react';
import { Box, Text, Button, VStack, HStack, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CustomDrawerHeader() {

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return isAuthenticated ? (
    <Box px="4">
      <Text bold color="gray.700">
        Bem vindo, Usuário teste
      </Text>
      <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
        usuario@email.com
      </Text>
      <Button mt="2" rounded="md" size="sm" variant='outline' colorScheme='red' onPress={() => setIsAuthenticated(false)} >
        Sair
      </Button>
    </Box>
  ) : (
    <Box px="4">
      <HStack alignItems='center'>
        <Icon size='6xl' mr='4' as={<MaterialCommunityIcons name='account-circle-outline' />} />

        <Button maxW='full' mt="2" rounded="md" size="sm" variant='outline' colorScheme='primary' onPress={() => setIsAuthenticated(true)} >
          Entrar
        </Button>
      </HStack>
    </Box>
  )
}
