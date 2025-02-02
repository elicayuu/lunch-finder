import { FC } from 'react'
import { useSearchParams } from 'react-router'
import { Heading, Grid } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { PlaceCard } from '@/components/PlaceCard'
import { Loading } from '@/components/ui/Loading'
import { ErrorView } from '@/components/ui/ErrorView'
import { searchPlaces, PLACE_CATEGORY } from '@/services/fsqApi'
import { COGENT_LAB_GEO } from '@/constants/locations'
import { getFsqPhotoUrl } from '@/libs/utils'

export const SearchPlaces: FC = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''

  const { data, error, isPending } = useQuery({
    queryKey: ['places', query],
    queryFn: async () => {
      return searchPlaces({
        ll: `${COGENT_LAB_GEO.latitude},${COGENT_LAB_GEO.longitude}`,
        radius: 1000,
        categories: PLACE_CATEGORY.restaurant,
        limit: 50,
        query,
      })
    },
  })

  if (error) return <ErrorView />

  if (isPending || !data) return <Loading />

  return (
    <>
      <Heading>🔍 Search results for: {query}</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap="10" mt={8} pb="20">
        {data.map((place) => {
          const [photo] = place.photos
          return (
            <PlaceCard
              key={place.fsq_id}
              id={place.fsq_id}
              name={place.name}
              imageUrl={getFsqPhotoUrl(photo.prefix, photo.suffix, 600, 600)}
              address={place.location.formatted_address}
            />
          )
        })}
      </Grid>
    </>
  )
}
