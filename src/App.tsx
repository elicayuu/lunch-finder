import { BrowserRouter, Routes, Route } from 'react-router'
import { RootLayout } from '@/components/ui/RootLayout'
import { Home } from '@/pages/Home'
import { PlaceDetail } from '@/pages/PlaceDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/places/:placeId" element={<PlaceDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
