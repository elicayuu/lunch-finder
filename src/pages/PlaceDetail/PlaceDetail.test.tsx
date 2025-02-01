import { render, screen } from '@testing-library/react'
import * as Router from 'react-router'

import { TestWrapper } from '@/tests/TestWrapper'
import { server, http, HttpResponse } from '@/tests/server'
import { genPlaceDetail } from '@/tests/fixtures/place'
import { FSQ_API_URL } from '@/services/fsqApi'
import { PlaceDetail } from './PlaceDetail'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
}))

const PlaceDetailWithWrapper = () => (
  <TestWrapper>
    <PlaceDetail />
  </TestWrapper>
)

describe('<PlaceDetail />', () => {
  const mockPlaceDetail = genPlaceDetail()

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('show the restaurant detail info', async () => {
    jest
      .spyOn(Router, 'useParams')
      .mockReturnValue({ placeId: mockPlaceDetail.fsq_id })

    server.use(
      http.get(`${FSQ_API_URL}/${mockPlaceDetail.fsq_id}`, () =>
        HttpResponse.json(mockPlaceDetail),
      ),
    )

    render(<PlaceDetailWithWrapper />)

    expect(await screen.findByText(mockPlaceDetail.name)).toBeInTheDocument()
    expect(await screen.findAllByTestId('restaurant-photo')).toHaveLength(3)
    expect(await screen.findAllByTestId('review-card')).toHaveLength(
      mockPlaceDetail.tips.length,
    )
  })

  test('show error if the request fails', async () => {
    server.use(
      http.get(`${FSQ_API_URL}/${mockPlaceDetail.fsq_id}`, () =>
        HttpResponse.error(),
      ),
    )

    render(<PlaceDetailWithWrapper />)

    expect(await screen.findByText(/oops/i)).toBeInTheDocument()
  })
})
