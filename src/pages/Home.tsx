import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LatLngExpression } from 'leaflet'
import { Button, Heading, Text, Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { NavLink } from 'react-router'

import { OpenStreetMap } from '@/components/OpenStreetMap'
import { Loading } from '@/components/ui/Loading'
import { ErrorView } from '@/components/ui/ErrorView'
import { searchPlaces, PLACE_CATEGORY } from '@/services/fsqApi'
import { getRandomNumber } from '@/libs/utils'

import { COGENT_LAB_GEO } from '@/constants/locations'

const Root = styled.div`
  display: flex;
`

const Info = styled.div`
  width: 400px;
  margin-right: 30px;
`

export const Home: FC = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ['home'],
    queryFn: async () => {
      return searchPlaces({
        ll: `${COGENT_LAB_GEO.latitude},${COGENT_LAB_GEO.longitude}`,
        radius: 1000,
        categories: PLACE_CATEGORY.restaurant,
        limit: 50,
      })
    },
  })

  if (error) return <ErrorView />

  if (isPending || !data) return <Loading />

  const todayChoice = data[getRandomNumber(0, data.length - 1)]
  const geoLocation = todayChoice.geocodes.main
  const marker: LatLngExpression = [geoLocation.latitude, geoLocation.longitude]

  return (
    <Root>
      <Info>
        <Text mb="2">🔥 Today's Choice</Text>
        <Heading size="2xl" mb="2">
          {todayChoice.name}
        </Heading>
        <Text textStyle="sm" mb="2">
          {todayChoice.location.formatted_address}
        </Text>
        <Box mt="6">
          <NavLink to={`/places/${todayChoice.fsq_id}`}>
            <Button>Details</Button>
          </NavLink>
        </Box>
      </Info>
      <OpenStreetMap
        width="100%"
        height="500px"
        defaultLocation={marker}
        marker={marker}
        zoom={16}
      />
    </Root>
  )
}
