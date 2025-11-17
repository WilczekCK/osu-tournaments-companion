import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Home from 'routes/Home'
import Tournament from 'routes/Tournament'

function ViewTransitionWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    if (!document.startViewTransition) return;

    document.startViewTransition(_ => {});
  }, [location.pathname]);

  return children;
}

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <div className="flex flex-col gap-6 size-full px-4">
    <BrowserRouter>
      <ViewTransitionWrapper>     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournament/:id" element={<Tournament />} />
        </Routes>
      </ViewTransitionWrapper>
    </BrowserRouter>
  </div>
)
