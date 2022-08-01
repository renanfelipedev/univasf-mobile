import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import { DrawerNavigation } from './navigation';

export default function App() {
    return (
        <NavigationContainer>
            <NativeBaseProvider>
                <DrawerNavigation />
            </NativeBaseProvider>
        </NavigationContainer>
    )
}
