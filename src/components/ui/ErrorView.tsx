import { FC } from 'react'
import { Box, Center, Text } from '@chakra-ui/react'

export const ErrorView: FC = () => {
  return (
    <Center>
      <Box p="20px" rounded="2xl" bgColor="colorPalette.100">
        <Text>🛠 Oops! Something went wrong</Text>
      </Box>
    </Center>
  )
}
