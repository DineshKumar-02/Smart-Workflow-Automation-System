import { useState } from 'react'

function Notification() {
  const [open, setOpen] = useState(false)

  // Later you can fetch real notifications from backend
  const notifications = [
    { id: 1, message: 'Expense Approval needs your action', time: '2 min ago' },
    { id: 2, message: 'CEO Approval step completed', time: '10 min ago' },
  ]

  return (
    <div style={{ position: 'relative' }}>
      {/* Bell button */}
      <button onClick={() => setOpen(!open)} style={styles.bell}>
        🔔 <span style={styles.badge}>{notifications.length}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={styles.dropdown}>
          <strong style={{ padding: '8px', display: 'block' }}>Notifications</strong>
          {notifications.map(n => (
            <div key={n.id} style={styles.item}>
              <p style={{ margin: 0 }}>{n.message}</p>
              <small style={{ color: '#888' }}>{n.time}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  bell: {
    background: 'none', border: 'none',
    color: 'white', fontSize: '18px', cursor: 'pointer', position: 'relative'
  },
  badge: {
    background: 'red', borderRadius: '50%',
    padding: '2px 6px', fontSize: '11px', color: 'white'
  },
  dropdown: {
    position: 'absolute', right: 0, top: '36px',
    background: 'white', border: '1px solid #ddd',
    borderRadius: '8px', width: '260px', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  item: {
    padding: '10px 12px',
    borderBottom: '1px solid #f0f0f0'
  }
}

export default Notification