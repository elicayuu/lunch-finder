import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LatLngTuple } from 'leaflet'
import {
  Heading,
  Text,
  Image,
  AspectRatio,
  Grid,
  Link,
  Card,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useParams } from 'react-router'

import { OpenStreetMap } from '@/components/OpenStreetMap'
import { Loading } from '@/components/ui/Loading'
import { ErrorView } from '@/components/ui/ErrorView'
import { getPlace } from '@/services/fsqApi'
import { getFsqPhotoUrl } from '@/libs/utils'
import { COGENT_LAB_GEO } from '@/constants/locations'

const Root = styled.div`
  display: flex;
`

const Info = styled.div`
  flex-grow: 1;
  margin-right: 30px;
`

const StyledOpenStreetMap = styled(OpenStreetMap)`
  flex-shrink: 0;
`

export const PlaceDetail: FC = () => {
  const { placeId } = useParams()

  const {
    data: placeDetail,
    error,
    isPending,
  } = useQuery({
    queryKey: ['placeDetail', placeId],
    queryFn: async () => {
      if (!placeId) return
      return getPlace(placeId)
    },
  })

  if (error) return <ErrorView />

  if (isPending || !placeDetail) return <Loading />

  const geoLocation = placeDetail.geocodes.main
  const marker: LatLngTuple = [geoLocation.latitude, geoLocation.longitude]

  return (
    <Root>
      <Info>
        <Heading size="4xl" mb="2">
          {placeDetail.name}
        </Heading>
        <Text mb="2">⭐ {placeDetail.rating}</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap="4" mb="4" maxW="630px">
          {placeDetail.photos.slice(0, 3).map((photo) => {
            return (
              <AspectRatio
                key={photo.id}
                maxW="200px"
                ratio={1}
                backgroundColor="#eee"
              >
                <Image
                  data-testid="restaurant-photo"
                  src={getFsqPhotoUrl(photo.prefix, photo.suffix, 200, 200)}
                  rounded="lg"
                  objectFit="cover"
                />
              </AspectRatio>
            )
          })}
        </Grid>
        <Text mb="2" data-testid="location">
          Location: {placeDetail.location.formatted_address}
        </Text>
        <Text mb="2">Tel: {placeDetail.tel}</Text>
        {placeDetail.website && (
          <Text mb="2">
            Website:{' '}
            <Link
              href={placeDetail.website}
              variant="underline"
              colorPalette="teal"
            >
              {placeDetail.website}
            </Link>
          </Text>
        )}
        {placeDetail.menu && (
          <Text mb="2">
            Menu:{' '}
            <Link
              href={placeDetail.menu}
              variant="underline"
              colorPalette="teal"
            >
              {placeDetail.menu}
            </Link>
          </Text>
        )}
        <Heading size="2xl" mt="20" mb="2">
          Reviews
        </Heading>
        {placeDetail.tips.map((tip) => {
          return (
            <Card.Root key={tip.created_at} mb="4" data-testid="review-card">
              <Card.Body>{tip.text}</Card.Body>
            </Card.Root>
          )
        })}
        {placeDetail.tips.length === 0 && (
          <Text color="#aaa" pl="1px">
            No reviews yet
          </Text>
        )}
      </Info>
      <StyledOpenStreetMap
        width="600px"
        height="600px"
        defaultLocation={[COGENT_LAB_GEO.latitude, COGENT_LAB_GEO.longitude]}
        marker={marker}
      />
    </Root>
  )
}
