import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CURRENT_USER_ID } from '../config'

export default function Navbar(){
  return (
    <motion.nav
      initial={{ y:-12, opacity:0 }}
      animate={{ y:0, opacity:1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="bg-transparent py-4"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="brand">Boostly</div>
          <div className="hidden md:flex items-center gap-4">
            <NavLink to="/" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'text-amber-600 font-semibold' : 'text-stone-600'}`}>Dashboard</NavLink>
            <NavLink to="/recognize" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'text-amber-600 font-semibold' : 'text-stone-600'}`}>Recognize</NavLink>
            <NavLink to="/leaderboard" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'text-amber-600 font-semibold' : 'text-stone-600'}`}>Leaderboard</NavLink>
            <NavLink to="/redeem" className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'text-amber-600 font-semibold' : 'text-stone-600'}`}>Redeem</NavLink>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="balance-pill">User: <span className="ml-2 font-semibold">#{CURRENT_USER_ID}</span></div>
        </div>
      </div>
    </motion.nav>
  )
}