import { useState } from 'react'
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import LoginPage from './components/LoginPage'
import LoginPage from "./pages/LoginPage"
import RegisterPage from './pages/RegisterPage'
import Home from './pages/Home'
import Gigs from './pages/Gigs/Gigs'
import Add from './pages/add/Add'
import Orders from './pages/orders/Orders'
import Mygigs from './pages/mygigs/Mygigs'
import Messages from './pages/messages/Messages'
import Message from './pages/message/Message'
import Gig from './pages/gig/Gig'
import Navbar from './components/Navbar/Navbar'
import Pay from './pages/Pay/Pay'
import Explore from './pages/explore/Explore'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
      <Router>
      
        <Routes>
          <Route path='/' Component={LoginPage} />
          <Route path='/register' Component={RegisterPage} />
          <Route path='/home' Component={Home} />
          <Route path='/add' Component={Add} />
          <Route path='/gigs' Component={Gigs} />
          <Route path='/orders' Component={Orders} />
          <Route path='/mygigs' Component={Mygigs} />
          <Route path='/messages' Component={Messages} />
          <Route path='/message/:id' Component={Message} />
          <Route path='/gig/:id' Component={Gig} />
          <Route path='/pay/:id' Component={Pay} />
          <Route path='/explore' Component={Explore} />

        </Routes>
      </Router>
    </>
  )
}

export default App
