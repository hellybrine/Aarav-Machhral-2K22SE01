import React from 'react'
import { motion } from 'framer-motion'

export default function VoucherCard({ v }){
  return (
    <motion.div className="card mb-3 flex justify-between items-center"
      initial={{ opacity: 0, rotateX: -8 }}
      animate={{ opacity: 1, rotateX: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div>
        <div className="text-sm muted">Voucher</div>
        <div className="font-semibold">{v.code}</div>
        <div className="text-sm muted">Credits: {v.credits} • ₹{v.value_inr}</div>
      </div>
      <div className="text-xs muted">{new Date(v.created_at || Date.now()).toLocaleDateString()}</div>
    </motion.div>
  )
}