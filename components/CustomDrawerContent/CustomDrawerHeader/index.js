import { Box, Text, Button } from 'native-base';

export default function CustomDrawerHeader() {
    return (
        <Box px="4">
            <Text bold color="gray.700">
                Bem vindo, Usuário teste
            </Text>
            <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
                usuario@email.com
            </Text>
            <Button mt="2" rounded="md" onPress={() => console.log('Pressed')} size="sm">
                Sair
            </Button>
        </Box>
    )
}
