import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import Signup from './pages/Signup'

import MainLayout from './components/MainLayout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<><Header /><About /><Footer /></>} />
        <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App