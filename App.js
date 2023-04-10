import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { CalendarProvider } from 'react-native-calendars'

import { DrawerNavigation } from './navigation';

import './configs/calendar.config';


export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <CalendarProvider>
          <DrawerNavigation />

        </CalendarProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
