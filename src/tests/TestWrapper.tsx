import { FC, ReactNode, ComponentProps } from 'react'
import { MemoryRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

type InitialEntries = ComponentProps<typeof MemoryRouter>['initialEntries']

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export const TestWrapper: FC<{
  children: ReactNode
  initialEntries?: InitialEntries
}> = ({ children, initialEntries }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
