import React from 'react'
import { motion } from 'framer-motion'

export default function RecognitionCard({ rec, onEndorse, canEndorse }){
  return (
    <motion.div
      className="card mb-4"
      whileHover={{ translateY: -6, boxShadow: "0 18px 40px rgba(15,15,15,0.08)" }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm muted">From</div>
          <div className="font-semibold">{rec.from_name || `User ${rec.from_id}`}</div>
        </div>
        <div className="text-right">
          <div className="text-sm muted">Credits</div>
          <div className="text-xl font-bold" style={{ color: '#b45309' }}>+{rec.credits}</div>
        </div>
      </div>

      <p className="mt-3 text-sm text-stone-700">{rec.message}</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm muted">
          <div>❤️ {rec.endorsements ?? 0}</div>
          <div className="">{new Date(rec.created_at || Date.now()).toLocaleDateString()}</div>
        </div>

        <div>
          <button
            onClick={() => onEndorse && onEndorse(rec.id)}
            disabled={!canEndorse}
            className="btn btn-primary"
            style={{ padding: '8px 10px', borderRadius: 10, fontSize: 14 }}
          >
            Endorse
          </button>
        </div>
      </div>
    </motion.div>
  )
}
