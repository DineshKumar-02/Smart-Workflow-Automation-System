import { useState } from 'react'

function Notification() {
  const [open, setOpen] = useState(false)
  const notifications = [
    { id: 1, message: 'Expense Approval needs action', time: '2 min ago' },
    { id: 2, message: 'CEO Approval completed',        time: '10 min ago' },
  ]
  return (
    <div style={{ position:'relative' }}>
      <button onClick={() => setOpen(!open)} style={{ background:'none', border:'none', color:'white', fontSize:'18px', cursor:'pointer' }}>
        🔔 <span style={{ background:'red', borderRadius:'50%', padding:'2px 6px', fontSize:'11px' }}>{notifications.length}</span>
      </button>
      {open && (
        <div style={{ position:'absolute', right:0, top:'36px', background:'white', border:'1px solid #ddd', borderRadius:'8px', width:'260px', zIndex:100, boxShadow:'0 4px 12px rgba(0,0,0,0.1)' }}>
          {notifications.map(n => (
            <div key={n.id} style={{ padding:'10px 12px', borderBottom:'1px solid #f0f0f0', color:'#333' }}>
              <p style={{ margin:0, fontSize:'13px' }}>{n.message}</p>
              <small style={{ color:'#888' }}>{n.time}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default Notification