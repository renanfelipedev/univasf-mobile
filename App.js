import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import { DrawerNavigation, StackNavigation } from './navigation';

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <DrawerNavigation />
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
