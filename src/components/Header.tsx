import { FC, FormEvent, ChangeEvent, useState } from 'react'
import styled from '@emotion/styled'
import { Input, Box } from '@chakra-ui/react'
import { useNavigate, createSearchParams, NavLink } from 'react-router'

const Root = styled.header`
  display: flex;
  align-items: center;
  margin: 0 0 30px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
`

const Logo = styled.h1`
  display: inline;
  color: #444;
  font-size: 1.5em;
  font-weight: bold;
`

export const Header: FC = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    navigate({
      pathname: '/places/search',
      search: createSearchParams({ query: input }).toString(),
    })
  }

  return (
    <Root>
      <Box flexGrow="1">
        <NavLink to="/">
          <Logo>LUNCH FINDER</Logo>
        </NavLink>
      </Box>
      <form onSubmit={handleSubmit}>
        <Input
          variant="subtle"
          placeholder="search"
          width="300px"
          value={input}
          onChange={handleInputChange}
        />
      </form>
    </Root>
  )
}
