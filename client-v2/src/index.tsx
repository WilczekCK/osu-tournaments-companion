import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'routes/Home'
import Test from 'routes/Test'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <div className="flex size-full">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </div>
)
