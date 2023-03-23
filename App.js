import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

import { DrawerNavigation } from './navigation';

import './configs/calendar.config';


export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <DrawerNavigation />
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
