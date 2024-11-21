import { useState, useEffect } from 'react'
import Topbar from "./components/Topbar"
import CreateCard from './components/CreateCard/CreateCard'
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Flashcard from "./pages/Flashcard"
import Layout from "./pages/Layout"
function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element = {<Layout />}>
          <Route path="/Flashcard-project/Home" element={<Home />}/>
          <Route path="/Flashcard-project/Flashcard" element={<Flashcard />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
