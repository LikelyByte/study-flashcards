import React from 'react'
import { Route, Routes, BrowserRouter} from 'react-router-dom'
import AppLayout from './AppLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
        
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App