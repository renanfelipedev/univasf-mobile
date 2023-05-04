import { useState } from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Icon, Center, VStack, FormControl, Input, Button, Box, Image } from 'native-base'

import logo from '../../../assets/logo.png';

import { useAuth } from '../../../hooks/auth';

export default function Login() {
  const [login, setLogin] = useState('renan.dantas');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const { logIn, user, loading } = useAuth();

  const changeVisibility = () => setShow(!show);

  return (
    <KeyboardAvoidingView
      h={{ base: '400px', lg: 'auto' }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      flex={1}
    >
      <Center p="4" >
        <Image size={180} source={logo} alt='UNIVASF Logo' resizeMode='center' />
        <Box w="100%">
          <VStack space={3} >
            <FormControl>
              <Input
                value={login}
                onChangeText={(value) => setLogin(value)}
                placeholder='Login'
                variant="rounded"
                autoCapitalize='none'
                InputLeftElement={<Icon ml="4" color="muted.400" size={5} as={<MaterialCommunityIcons name="account" />} />}
              />
            </FormControl>
            <FormControl>
              <Input
                value={password}
                onChangeText={(value) => setPassword(value)}
                placeholder='Senha'
                variant="rounded"
                type={show ? 'text' : 'password'}
                InputRightElement={<Icon mr="4" color="muted.400" size={5} onPress={changeVisibility} as={<MaterialCommunityIcons name={show ? 'eye' : 'eye-off'} />} />}
              />
            </FormControl>
            <Button color="#0289e0" onPress={() => logIn({ login, password })} isLoading={loading}>
              Acessar
            </Button>
          </VStack>
        </Box>
      </Center >
    </KeyboardAvoidingView>
  );
}
