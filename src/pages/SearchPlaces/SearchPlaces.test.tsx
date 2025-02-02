import { randomUUID } from 'node:crypto'
import { render, screen } from '@testing-library/react'

import { TestWrapper } from '@/tests/TestWrapper'
import { server, http, HttpResponse } from '@/tests/server'
import { genPlace } from '@/tests/fixtures/place'
import { FSQ_API_URL } from '@/services/fsqApi'
import { SearchPlaces } from './SearchPlaces'

const SearchPlacesWithWrapper = () => (
  <TestWrapper>
    <SearchPlaces />
  </TestWrapper>
)

describe('<SearchPlaces />', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('show place card for search results', async () => {
    const places = [...Array(4)].map(() => {
      return genPlace({ fsq_id: randomUUID(), name: randomUUID() })
    })

    server.use(
      http.get(`${FSQ_API_URL}/search`, () =>
        HttpResponse.json({ results: places }),
      ),
    )

    render(<SearchPlacesWithWrapper />)

    const results = await screen.findAllByTestId('place-card')
    const resultTitles = results.map(
      (el) => el.getElementsByTagName('h3')[0].textContent,
    )

    expect(results).toHaveLength(4)
    expect(resultTitles).toEqual(places.map((p) => p.name))
  })

  test('show error if the request fails', async () => {
    server.use(http.get(`${FSQ_API_URL}/search`, () => HttpResponse.error()))

    render(<SearchPlacesWithWrapper />)

    expect(await screen.findByText(/oops/i)).toBeInTheDocument()
  })
})
