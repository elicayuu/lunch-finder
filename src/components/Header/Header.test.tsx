import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Routes, Route } from 'react-router'

import { Header } from './Header'

const MockPage = () => <div>Search Page</div>

describe('<Header />', () => {
  test('search input should navigate to search page with searchParams', async () => {
    const user = userEvent.setup()
    const searchPhrase = 'yakiniku'

    render(
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/places/search" element={<MockPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>,
    )

    const input = screen.getByPlaceholderText(/search/i)

    await user.type(input, searchPhrase)
    await waitFor(() => {
      fireEvent.submit(input)
    })

    expect(screen.getByText(/Search Page/i)).toBeInTheDocument()
    expect(window.location.href).toContain(
      `/places/search?query=${searchPhrase}`,
    )
  })
})
