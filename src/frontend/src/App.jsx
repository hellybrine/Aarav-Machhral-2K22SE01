import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Recognize from './pages/Recognize'
import Leaderboard from './pages/Leaderboard'
import Redeem from './pages/Redeem'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function App(){
  const location = useLocation()
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 max-w-5xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/recognize" element={<Recognize />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/redeem" element={<Redeem />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}