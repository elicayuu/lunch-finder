import { render, screen } from '@testing-library/react'

import { TestWrapper } from '@/tests/TestWrapper'
import { server, http, HttpResponse } from '@/tests/server'
import { genPlace } from '@/tests/fixtures/place'
import { FSQ_API_URL } from '@/services/fsqApi'
import { Home } from './Home'

const HomeWithWrapper = () => (
  <TestWrapper>
    <Home />
  </TestWrapper>
)

describe('<Home />', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('show the restaurant info', async () => {
    const mockPlace = genPlace()

    server.use(
      http.get(`${FSQ_API_URL}/search`, () =>
        HttpResponse.json({ results: [mockPlace] }),
      ),
    )

    render(<HomeWithWrapper />)

    expect(await screen.findByText(mockPlace.name)).toBeInTheDocument()
    expect(
      await screen.findByText(mockPlace.location.formatted_address),
    ).toBeInTheDocument()
    expect(await screen.getByText(/details/i).closest('a')).toHaveProperty(
      'href',
      `http://localhost/places/${mockPlace.fsq_id}`,
    )
  })

  test('show error if the request fails', async () => {
    server.use(http.get(`${FSQ_API_URL}/search`, () => HttpResponse.error()))

    render(<HomeWithWrapper />)

    expect(await screen.findByText(/oops/i)).toBeInTheDocument()
  })
})
