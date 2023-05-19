import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Pressable, HStack, Icon } from 'native-base';

const getIcon = (screenName) => {
  switch (screenName) {
    case 'Inicio':
      return 'home-outline';
    case 'Discente':
      return 'school-outline';
    case 'Fazer Login':
      return 'login-variant';
    case 'Calendarios':
      return 'calendar';
    case 'Restaurantes':
      return 'silverware-fork-knife';
    case 'Transportes':
      return 'bus-multiple';
    case 'Eventos':
      return 'calendar-star';
    case 'Contatos':
      return 'account-box-outline';
    case 'Sobre':
      return 'information-outline'
    case 'Inovação':
      return 'lightbulb-on-outline'
    default:
      return undefined;
  }
};

export default function CustomDrawerItem({ name, selected }) {
  const navigation = useNavigation();

  return (
    <Pressable
      px="5"
      py="3"
      rounded="md"
      bg={selected ? 'rgba(6, 182, 212, 0.1)' : 'transparent'}
      onPress={() => { navigation.navigate(name) }}
    >
      <HStack space="7" alignItems="center">
        <Icon
          color={selected ? 'primary.500' : 'gray.500'}
          size="5"
          as={<MaterialCommunityIcons name={getIcon(name)} />}
        />
        <Text fontWeight="500" color={selected ? 'primary.500' : 'gray.700'}>{name}</Text>
      </HStack>
    </Pressable>
  )

}
