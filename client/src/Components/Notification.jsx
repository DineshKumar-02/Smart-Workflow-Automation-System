import { useState } from 'react'

function Notification() {
  const [open, setOpen] = useState(false)

  const notifications = [
    { id: 1, message: 'Expense Approval needs your action' },
    { id: 2, message: 'CEO Approval step completed' },
  ]

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={styles.bell}>
        🔔 <span style={styles.badge}>{notifications.length}</span>
      </button>

      {open && (
        <div style={styles.dropdown}>
          <strong style={{ padding: '8px', display: 'block' }}>Notifications</strong>
          {notifications.map(n => (
            <div key={n.id} style={styles.item}>
              <p style={{ margin: 0, fontSize: '13px' }}>{n.message}</p>
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
    color: 'white', fontSize: '18px', cursor: 'pointer'
  },
  badge: {
    background: 'red', borderRadius: '50%',
    padding: '2px 6px', fontSize: '11px', color: 'white'
  },
  dropdown: {
    position: 'absolute', right: 0, top: '36px',
    background: 'white', border: '1px solid #ddd',
    borderRadius: '8px', width: '250px', zIndex: 100,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  item: { padding: '10px 12px', borderBottom: '1px solid #f0f0f0' }
}

export default Notification