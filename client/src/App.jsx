import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Landing from './pages/landing/landing';
import Turfs from './pages/turfs/turf';
import TurfDetails from './pages/turfDetails/turfDetail';
import Tournaments from './pages/tournaments/tournament';
import BuildTeam from './pages/buildTeam/BuildTeam';
import Profile from './pages/profile/profile';


function App() {
  

  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Landing /> } />
        <Route path="/turfs" element={<Turfs />} />
        <Route path="/turf/:name" element={<TurfDetails />} />
        <Route path="/tournaments" element={<Tournaments />} /> {/* Add Tournament Route */}
         
        <Route path="/teams" element={<BuildTeam />} /> {/* Add Tournament Route */}
        <Route path="/profile" element={<Profile />} />
         

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