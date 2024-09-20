import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Features from './components/Features/Features'
import Trending from './components/Trending/Trending'
import Turfs from './pages/turfs/turf';
import Tournaments from './pages/tournaments/tournament'


function App() {
  

  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={
          <><Hero></Hero>
          <Features></Features>
          <Trending></Trending></>
        } />
         <Route path="/turfs" element={<Turfs />} />
         <Route path="/tournaments" element={<Tournaments />} /> {/* Add Tournament Route */}
         

      </Routes>
      
    </Router>
  )
}

export default App


// pages
// landing page -> (sections[hero,features,trending] in components(landing page))
// turf explore
// team build
// tournaments 
// profile

// carousel,cards in components(common)
// navbar, footer in components(layout)
// margins, heading in components(common)