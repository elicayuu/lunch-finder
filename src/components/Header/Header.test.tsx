import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as Router from 'react-router'

import { TestWrapper } from '@/tests/TestWrapper'
import { Header } from './Header'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}))

describe('<Header />', () => {
  test('should navigate to search page with searchParams', async () => {
    const user = userEvent.setup()
    const searchPhrase = 'yakiniku'
    const navigate = jest.fn()

    jest.spyOn(Router, 'useNavigate').mockImplementation(() => navigate)

    render(
      <TestWrapper>
        <Header />,
      </TestWrapper>,
    )

    const input = screen.getByPlaceholderText(/search/i)

    await user.type(input, searchPhrase)
    await waitFor(() => {
      fireEvent.submit(input)
    })

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith({
      pathname: '/places/search',
      search: `query=${searchPhrase}`,
    })
  })
})
