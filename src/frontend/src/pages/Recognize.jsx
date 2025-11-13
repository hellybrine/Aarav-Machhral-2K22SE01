import React, { useState, useEffect } from 'react'
import { fetchStudentsList, postRecognition } from '../api'
import { CURRENT_USER_ID } from '../config'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Recognize(){
  const [students, setStudents] = useState([])
  const [toId, setToId] = useState('')
  const [credits, setCredits] = useState(10)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const nav = useNavigate()

  useEffect(()=>{ load() }, [])

  async function load(){
    const list = await fetchStudentsList()
    setStudents(list)
    if (list.length > 0 && !toId) {
      const first = list.find(s => s.id !== CURRENT_USER_ID) || list[0]
      setToId(first?.id ?? '')
    }
  }

  async function handleSend(e){
    e.preventDefault()
    if (parseInt(toId) === CURRENT_USER_ID) return alert("Cannot send to yourself")
    setSending(true)
    try {
      await postRecognition({ from_id: CURRENT_USER_ID, to_id: parseInt(toId), credits: parseInt(credits), message })
      alert('Recognition sent 🎉')
      nav('/')
    } catch (err) {
      console.error(err)
      alert(err?.response?.data?.error || 'Failed to send recognition')
    } finally {
      setSending(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
      <div className="card">
        <h2 className="text-xl font-semibold mb-3">Recognize a Peer</h2>
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="muted">To</label>
            <select className="w-full border rounded p-2 mt-1" value={toId} onChange={e=>setToId(e.target.value)}>
              <option value="">Select student</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.name} (#{s.id})</option>)}
            </select>
          </div>

          <div>
            <label className="muted">Credits</label>
            <input className="w-40 border rounded p-2 mt-1" type="number" min="1" value={credits} onChange={e=>setCredits(e.target.value)} />
          </div>

          <div>
            <label className="muted">Message (optional)</label>
            <textarea className="w-full border rounded p-2 mt-1" rows="3" value={message} onChange={e=>setMessage(e.target.value)} />
          </div>

          <div className="flex items-center gap-3">
            <button className="btn btn-primary" disabled={sending} type="submit">{sending ? 'Sending…' : 'Send Recognition'}</button>
            <div className="muted">You have 100 credits monthly — choose thoughtfully.</div>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
