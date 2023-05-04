import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { CalendarProvider } from 'react-native-calendars'

import { DrawerNavigation } from './navigation';

import AppProvider from './hooks';

import './configs/calendar.config';


export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <CalendarProvider>
          <AppProvider>
            <DrawerNavigation />
          </AppProvider>
        </CalendarProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
