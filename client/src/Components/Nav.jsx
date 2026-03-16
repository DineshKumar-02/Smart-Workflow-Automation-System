import { Link } from 'react-router-dom'
import Notification from './Notification'

function Nav() {
  return (
    <nav style={styles.nav}>
      <span style={styles.logo}>⚡ FlowForge</span>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/approval" style={styles.link}>Approvals</Link>
        <Link to="/audit" style={styles.link}>Audit Log</Link>
        <Notification />
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#1e1e2e',
    color: 'white'
  },
  logo: { fontSize: '20px', fontWeight: 'bold' },
  links: { display: 'flex', gap: '20px', alignItems: 'center' },
  link: { color: 'white', textDecoration: 'none', fontSize: '14px' }
}

export default Nav