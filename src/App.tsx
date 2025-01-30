import { BrowserRouter, Routes, Route } from "react-router";
import { RootLayout } from '@/components/ui/RootLayout'
import { Home } from '@/pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
