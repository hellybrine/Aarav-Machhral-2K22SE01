import React, { useEffect, useState } from 'react'
import { fetchLeaderboard } from '../api'
import { motion } from 'framer-motion'

export default function Leaderboard(){
  const [rows, setRows] = useState([])

  useEffect(()=>{ load() }, [])

  async function load(){
    const data = await fetchLeaderboard(10)
    setRows(data)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
      <div className="card">
        <table className="w-full table-auto">
          <thead>
            <tr className="table">
              <th className="text-left py-2">Rank</th>
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Credits</th>
              <th className="text-left py-2">Recognitions</th>
              <th className="text-left py-2">Endorsements</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i) => (
              <motion.tr key={r.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <td className="py-3">{i+1}</td>
                <td className="py-3 font-semibold">{r.name}</td>
                <td className="py-3">{r.total_received}</td>
                <td className="py-3">{r.recognitions_received}</td>
                <td className="py-3">❤️ {r.endorsements_received}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}