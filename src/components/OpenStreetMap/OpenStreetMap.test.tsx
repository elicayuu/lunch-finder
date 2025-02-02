import { render, screen } from '@testing-library/react'
import { LatLngTuple } from 'leaflet'

import { COGENT_LAB_GEO } from '@/constants/locations'
import { OpenStreetMap } from './OpenStreetMap'

describe('<OpenStreetMap />', () => {
  test('render map', async () => {
    render(
      <OpenStreetMap
        width="500px"
        height="500px"
        defaultLocation={[COGENT_LAB_GEO.latitude, COGENT_LAB_GEO.longitude]}
      />,
    )

    expect(screen.getByRole('application')).toBeInTheDocument()
  })

  test('render map with marker', async () => {
    const markerLocation: LatLngTuple = [35.669257, 139.738533]

    render(
      <OpenStreetMap
        width="500px"
        height="500px"
        defaultLocation={[COGENT_LAB_GEO.latitude, COGENT_LAB_GEO.longitude]}
        marker={markerLocation}
      />,
    )

    expect(screen.getByRole('application')).toHaveAttribute(
      'data-marker',
      markerLocation.join(','),
    )
  })
})
