import { randomUUID } from 'node:crypto'
import { render, screen } from '@testing-library/react'

import { TestWrapper } from '@/tests/TestWrapper'
import { server, http, HttpResponse } from '@/tests/server'
import { genPlace } from '@/tests/fixtures/place'
import { FSQ_API_URL } from '@/services/fsqApi'
import * as utils from '@/libs/utils'
import { Home } from './Home'

const HomeWithWrapper = () => (
  <TestWrapper>
    <Home />
  </TestWrapper>
)

describe('<Home />', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
    jest.restoreAllMocks()
  })
  afterAll(() => server.close())

  test('should use the number returned by getRandomNumber to render the page', async () => {
    const places = [...Array(10)].map(() => {
      return genPlace({ fsq_id: randomUUID(), name: randomUUID() })
    })
    const randomNumberMock = 3
    const placeShouldBeRendered = places[randomNumberMock]
    const getRandomNumberMock = jest.fn().mockReturnValue(randomNumberMock)

    server.use(
      http.get(`${FSQ_API_URL}/search`, () =>
        HttpResponse.json({ results: places }),
      ),
    )

    jest.spyOn(utils, 'getRandomNumber').mockImplementation(getRandomNumberMock)

    render(<HomeWithWrapper />)

    expect(
      await screen.findByText(placeShouldBeRendered.name),
    ).toBeInTheDocument()
    expect(getRandomNumberMock).toHaveBeenCalledTimes(1)
  })

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
    expect((await screen.findByText(/details/i)).closest('a')).toHaveAttribute(
      'href',
      `/places/${mockPlace.fsq_id}`,
    )
    expect(await screen.findByRole('application')).toHaveAttribute(
      'data-marker',
      `${mockPlace.geocodes.main.latitude},${mockPlace.geocodes.main.longitude}`,
    )
  })

  test('show error if the request fails', async () => {
    server.use(http.get(`${FSQ_API_URL}/search`, () => HttpResponse.error()))

    render(<HomeWithWrapper />)

    expect(await screen.findByText(/oops/i)).toBeInTheDocument()
  })
})
