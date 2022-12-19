import { VStack, Divider } from 'native-base';
import { DrawerContentScrollView } from '@react-navigation/drawer';

import CustomDrawerItem from './CustomDrawerItem';
import CustomDrawerHeader from './CustomDrawerHeader';

export default function CustomDrawerContent({ state, ...props }) {
  const { routeNames } = state;

  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="8" my="2" mx="1">
        <CustomDrawerHeader />

        <Divider />

        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {routeNames.map((name, index) => <CustomDrawerItem key={name} name={name} selected={index === state.index} />)}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}
