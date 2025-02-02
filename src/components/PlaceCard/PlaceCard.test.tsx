import { render, screen } from '@testing-library/react'

import { TestWrapper } from '@/tests/TestWrapper'
import { genPlace } from '@/tests/fixtures/place'
import { getFsqPhotoUrl } from '@/libs/utils'
import { PlaceCard } from './PlaceCard'

describe('<PlaceCard />', () => {
  test('show the place info', async () => {
    const mockPlace = genPlace()
    const [photo] = mockPlace.photos
    const imageUrl = getFsqPhotoUrl(photo.prefix, photo.suffix)

    render(
      <TestWrapper>
        <PlaceCard
          id={mockPlace.fsq_id}
          name={mockPlace.name}
          imageUrl={imageUrl}
          address={mockPlace.location.formatted_address}
        />
        ,
      </TestWrapper>,
    )

    expect(screen.getByText(mockPlace.name)).toBeInTheDocument()
    expect(
      screen.getByText(mockPlace.location.formatted_address),
    ).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', imageUrl)
    expect(screen.getByRole('link', { name: /Details/i })).toHaveAttribute(
      'href',
      `/places/${mockPlace.fsq_id}`,
    )
  })
})
