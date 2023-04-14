import { Center, Spinner } from 'native-base';


export default function Carregando() {
  return (
    <Center height='100%' justifyContent="center" alignItems="center" backgroundColor='white'>
      <Spinner size="lg" />
    </Center>
  )
}
