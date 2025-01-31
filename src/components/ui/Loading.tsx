import { FC } from 'react'
import { Center, Text, Spinner } from '@chakra-ui/react'

export const Loading: FC = () => {
  return (
    <Center>
      <Spinner size="sm" mr="8px" />
      <Text>Loading</Text>
    </Center>
  )
}
