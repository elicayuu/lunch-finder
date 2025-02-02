import { FC } from 'react'
import { render, screen } from '@testing-library/react'
import { Routes, Route } from 'react-router'

import { TestWrapper } from '@/tests/TestWrapper'
import { server, http, HttpResponse } from '@/tests/server'
import { genPlaceDetail } from '@/tests/fixtures/place'
import { FSQ_API_URL } from '@/services/fsqApi'
import { PlaceDetail } from './PlaceDetail'

const PlaceDetailWithWrapper: FC<{ placeId: string }> = ({ placeId }) => (
  <TestWrapper initialEntries={[`/places/${placeId}`]}>
    <Routes>
      <Route path="/places/:placeId" element={<PlaceDetail />} />
    </Routes>
  </TestWrapper>
)

describe('<PlaceDetail />', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('show the restaurant detail info', async () => {
    const mockPlaceDetail = genPlaceDetail()

    server.use(
      http.get(`${FSQ_API_URL}/${mockPlaceDetail.fsq_id}`, () =>
        HttpResponse.json(mockPlaceDetail),
      ),
    )

    render(<PlaceDetailWithWrapper placeId={mockPlaceDetail.fsq_id} />)

    expect(await screen.findByText(mockPlaceDetail.name)).toBeInTheDocument()
    expect(await screen.findAllByTestId('restaurant-photo')).toHaveLength(3)
    expect(await screen.findAllByTestId('review-card')).toHaveLength(
      mockPlaceDetail.tips.length,
    )
    expect(await screen.findByRole('application')).toHaveAttribute(
      'data-marker',
      `${mockPlaceDetail.geocodes.main.latitude},${mockPlaceDetail.geocodes.main.longitude}`,
    )
  })

  test('show message if no reviews', async () => {
    const mockPlaceDetail = genPlaceDetail({ tips: [] })

    server.use(
      http.get(`${FSQ_API_URL}/${mockPlaceDetail.fsq_id}`, () =>
        HttpResponse.json(mockPlaceDetail),
      ),
    )

    render(<PlaceDetailWithWrapper placeId={mockPlaceDetail.fsq_id} />)

    expect(await screen.findByText(/No reviews yet/i)).toBeInTheDocument()
  })

  test('should hide website info if no website data', async () => {
    const mockPlaceDetail = genPlaceDetail({ website: '' })

    server.use(
      http.get(`${FSQ_API_URL}/${mockPlaceDetail.fsq_id}`, () =>
        HttpResponse.json(mockPlaceDetail),
      ),
    )

    render(<PlaceDetailWithWrapper placeId={mockPlaceDetail.fsq_id} />)

    expect(await screen.findByText(mockPlaceDetail.name)).toBeInTheDocument()
    expect(await screen.findByText(/website:/i)).not.toBeInTheDocument()
  })

  test('should hide menu info if no menu data', async () => {
    const mockPlaceDetail = genPlaceDetail({ menu: '' })

    server.use(
      http.get(`${FSQ_API_URL}/${mockPlaceDetail.fsq_id}`, () =>
        HttpResponse.json(mockPlaceDetail),
      ),
    )

    render(<PlaceDetailWithWrapper placeId={mockPlaceDetail.fsq_id} />)

    expect(await screen.findByText(mockPlaceDetail.name)).toBeInTheDocument()
    expect(await screen.findByText(/menu:/i)).not.toBeInTheDocument()
  })

  test('show error if the request fails', async () => {
    const mockPlaceDetail = genPlaceDetail()

    server.use(
      http.get(`${FSQ_API_URL}/${mockPlaceDetail.fsq_id}`, () =>
        HttpResponse.error(),
      ),
    )

    render(<PlaceDetailWithWrapper placeId={mockPlaceDetail.fsq_id} />)

    expect(await screen.findByText(/oops/i)).toBeInTheDocument()
  })
})
