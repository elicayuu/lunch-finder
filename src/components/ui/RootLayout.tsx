import { FC } from 'react'
import { Outlet } from 'react-router'
import styled from '@emotion/styled'
import { Header } from '@/components/Header'

const Main = styled.main`
  padding: 0 80px;
`

export const RootLayout: FC = () => {
  return (
    <Main>
      <Header />
      <Outlet />
    </Main>
  )
}
