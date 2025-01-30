import { FC } from 'react'
import { Outlet } from 'react-router'
import styled from '@emotion/styled'

const Header = styled.header`
  margin: 0 0 30px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  color: #444;
  font-size: 1.5em;
  font-weight: bold;
`

const Main = styled.main`
  padding: 0 80px;
`

export const RootLayout:FC = () => {
  return (
    <Main>
      <Header>LUNCH FINDER</Header>
      <Outlet />
    </Main>
  )
}