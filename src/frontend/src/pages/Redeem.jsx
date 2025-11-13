import React, { useEffect, useState } from 'react'
import { fetchStudent, redeemCredits } from '../api'
import { CURRENT_USER_ID } from '../config'
import VoucherCard from '../components/VoucherCard'
import { motion } from 'framer-motion'

export default function Redeem(){
  const [me, setMe] = useState(null)
  const [credits, setCredits] = useState(10)
  const [vouchers, setVouchers] = useState([])

  useEffect(()=>{ load() }, [])

  async function load(){
    try {
      const s = await fetchStudent(CURRENT_USER_ID)
      setMe(s)
      if (s.vouchers) setVouchers(s.vouchers)
    } catch (err) { console.error(err) }
  }

  async function handleRedeem(e){
    e.preventDefault()
    if (!credits || credits <= 0) return alert('Enter positive credits')
    if (credits > (me?.balance ?? 0)) return alert('Insufficient balance')
    try {
      const v = await redeemCredits(CURRENT_USER_ID, parseInt(credits))
      setVouchers(prev => [v, ...prev])
      const s = await fetchStudent(CURRENT_USER_ID)
      setMe(s)
      alert(`Voucher created: ₹${v.value_inr}`)
    } catch (err) {
      console.error(err)
      alert(err?.response?.data?.error || 'Redeem failed')
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
      <div className="card">
        <h2 className="text-xl font-semibold mb-2">Redeem Credits</h2>
        <div className="muted mb-3">Available balance: <strong style={{color:'#92400e'}}>{me?.balance ?? '-'}</strong> credits</div>

        <form onSubmit={handleRedeem} className="flex items-center gap-4">
          <input type="number" min="1" value={credits} onChange={e=>setCredits(e.target.value)} className="border rounded p-2 w-32" />
          <div className="muted">Value: <strong>₹{credits * 5}</strong></div>
          <button className="btn btn-primary" type="submit">Generate Voucher</button>
        </form>
      </div>

      <h3 className="mt-6 mb-3 text-lg font-semibold">Your Vouchers</h3>
      {vouchers.length === 0 && <div className="card">No vouchers yet</div>}
      {vouchers.map(v => <VoucherCard key={v.id || v.code} v={v} />)}
    </motion.div>
  )
}
