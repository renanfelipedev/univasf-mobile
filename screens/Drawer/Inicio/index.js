import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Noticias from '../../Tabs/Inicio/Noticias';
import Comunicados from '../../Tabs/Inicio/Comunicados';

const Tab = createBottomTabNavigator();

export default function Inicio() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarIcon: () => { },
        tabBarLabelStyle: { fontSize: 18, padding: 16 },
        tabBarStyle: {
          height: 64
        }
      })}

    >
      <Tab.Screen name='Noticias' component={Noticias} options={{ unmountOnBlur: true }} />
      <Tab.Screen name='Comunicados' component={Comunicados} options={{ unmountOnBlur: true }} />
    </Tab.Navigator >
  )
}
