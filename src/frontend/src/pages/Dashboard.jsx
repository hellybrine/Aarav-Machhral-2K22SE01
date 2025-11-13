import React, { useEffect, useState } from 'react'
import { fetchStudent, fetchLeaderboard } from '../api'
import RecognitionCard from '../components/RecognitionCard'
import { CURRENT_USER_ID } from '../config'
import { motion } from 'framer-motion'

export default function Dashboard(){
  const [me, setMe] = useState(null)
  const [top, setTop] = useState([])
  const [recent, setRecent] = useState([])

  useEffect(()=>{ load() }, [])

  async function load(){
    try {
      const s = await fetchStudent(CURRENT_USER_ID)
      setMe(s)
      // attempt to get recent recognitions - backend doesn't have endpoint for recent list in our simple version
      // If student object contains received recognitions, use that; otherwise empty.
      setRecent(s.recent_recognitions || [])
    } catch (err) { console.error(err) }
    try {
      const lb = await fetchLeaderboard(5)
      setTop(lb)
    } catch (err) {}
  }

  return (
    <div>
      <motion.div className="card mb-6"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="muted">Welcome back</div>
            <div className="text-2xl font-bold">{me?.name ?? 'Student'}</div>
            <div className="muted">Keep the vibes high — recognize someone today!</div>
          </div>
          <div className="text-right">
            <div className="muted">Balance</div>
            <div className="text-2xl font-bold" style={{ color: '#92400e' }}>{me?.balance ?? '-' } <span className="text-sm muted">credits</span></div>
            <div className="muted">Sent this month: {me?.sent_this_month ?? 0}/100</div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Recent Recognitions</h3>
          {recent.length === 0 && <div className="card">No recognitions yet — be the first to recognize someone!</div>}
          {recent.map(r => <RecognitionCard key={r.id} rec={r} />)}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Top Students</h3>
          {top.map((s,i) => (
            <motion.div key={s.id} className="card mb-3 flex items-center justify-between"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i*0.06 }}
            >
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="muted">Credits: {s.total_received} • Recognitions: {s.recognitions_received}</div>
              </div>
              <div className="text-sm muted">❤️ {s.endorsements_received}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}