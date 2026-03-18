import { Link } from 'react-router-dom'
import Notification from './Notification'

function Nav() {
  return (
    <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 24px', background:'#1e1e2e', color:'white' }}>
      <span style={{ fontSize:'20px', fontWeight:'bold' }}>⚡ FlowForge</span>
      <div style={{ display:'flex', gap:'20px', alignItems:'center' }}>
        <Link to="/"        style={{ color:'white', textDecoration:'none' }}>Dashboard</Link>
        <Link to="/approval" style={{ color:'white', textDecoration:'none' }}>Approvals</Link>
        <Link to="/audit"   style={{ color:'white', textDecoration:'none' }}>Audit Log</Link>
        <Notification />
      </div>
    </nav>
  )
}
export default Nav