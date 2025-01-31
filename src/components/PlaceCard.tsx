import { FC } from 'react'
import { NavLink } from 'react-router'
import { Button, Card, Image, Flex, AspectRatio } from '@chakra-ui/react'

interface PlaceCardProps {
  id: string
  name: string
  imageUrl: string
  address: string
}

export const PlaceCard: FC<PlaceCardProps> = ({
  id,
  name,
  imageUrl,
  address,
}) => {
  return (
    <Card.Root maxW="sm" overflow="hidden">
      <AspectRatio width="100%" ratio={16 / 9} backgroundColor="#eee">
        <Image objectFit="cover" src={imageUrl} alt={name} />
      </AspectRatio>
      <Flex flexDirection="column" height="100%">
        <Card.Body flexGrow="1">
          <Card.Title mb="2">{name}</Card.Title>
          <Card.Description textStyle="sm">{address}</Card.Description>
        </Card.Body>
        <Card.Footer>
          <NavLink to={`/places/${id}`}>
            <Button>Details</Button>
          </NavLink>
        </Card.Footer>
      </Flex>
    </Card.Root>
  )
}
