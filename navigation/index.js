import { Box } from 'native-base'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import CustomDrawerContent from '../components/CustomDrawerContent';

import Login from '../screens/Drawer/Login';
import Sobre from '../screens/Drawer/Sobre';
import Inicio from '../screens/Drawer/Inicio';
import Eventos from '../screens/Drawer/Eventos';
import Contatos from '../screens/Drawer/Contatos';
import Calendarios from '../screens/Drawer/Calendarios';
import Transportes from '../screens/Drawer/Transporte';
import Restaurantes from '../screens/Drawer/Restaurantes';

import Calendario from '../screens/Stack/Calendario';

const screenOptions = {
  headerStyle: {
    backgroundColor: '#0289e0',
  },
  headerTintColor: '#FFF',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center'
}

export function DrawerNavigation() {
  return (
    <Box safeArea flex={1} >
      <Drawer.Navigator
        initialRouteName='Inicio'
        screenOptions={screenOptions}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Inicio" component={Inicio} />
        <Drawer.Screen options={{ title: '' }} name="Fazer Login" component={Login} />
        <Drawer.Screen name="Calendarios" component={CalendarioNavigation} />
        <Drawer.Screen name="Restaurantes" component={Restaurantes} />
        <Drawer.Screen name="Transporte" component={Transportes} />
        <Drawer.Screen name="Eventos" component={Eventos} />
        <Drawer.Screen name="Contatos" component={Contatos} />
        <Drawer.Screen name="Sobre" component={Sobre} />
      </Drawer.Navigator>
    </Box>
  );
}

export function CalendarioNavigation() {
  return (
    <Stack.Navigator initialRouteName='VerCalendarios'>
      <Stack.Screen options={{ title: '', headerShown: false }} name="VerCalendarios" component={Calendarios} />
      <Stack.Screen options={{ title: '' }} name="Calendario" component={Calendario} />
    </Stack.Navigator>
  );
}

export function StackNavigation() {
  return (
    <Stack.Navigator>

    </Stack.Navigator>
  );
}
