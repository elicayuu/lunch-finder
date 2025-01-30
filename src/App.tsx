import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LatLngExpression } from 'leaflet'

import { OpenStreetMap } from '@/components/OpenStreetMap'
import { searchPlaces, PLACE_CATEGORY } from '@/services/fsqApi'
import { getRandomNumber } from '@/libs/utils'

function App() {
  const { data } = useQuery({
    queryKey: ['places'],
    queryFn: async () => {
      return searchPlaces({
        ll: '35.6646782,139.7378198',
        radius: 1000,
        categories: PLACE_CATEGORY.restaurant,
        limit: 50,
      })
    },
  })

  const todayChoice = useMemo(() => {
    if (!data) return
    const { results } = data
    const rnd = getRandomNumber(0, results.length - 1)
    return results[rnd]
  }, [data])
  const geoLocation = todayChoice?.geocodes.main
  const marker: LatLngExpression = [geoLocation?.latitude ?? 0, geoLocation?.longitude ?? 0]

  return (
    <>
      <div>
        🍙Lunch

        <h1>{todayChoice?.name}</h1>
        <OpenStreetMap
          width="600px"
          height="600px"
          defaultLocation={[35.6646782,139.7378198]}
          marker={marker}
        />
      </div>
    </>
  )
}

export default App
