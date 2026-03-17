import { Link } from "react-router-dom";

function Nav() {
  return (
      <nav style={styles.nav}>                                                           
      <span style={styles.name}>Smart Automation System</span>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/approval" style={styles.link}>Approval</Link>
        <Link to="/Notification" style={styles.link}>Notification</Link>

      </div>
    </nav>
  );
}



const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 28px',
    backgroundColor: '#0f172a',
    color: 'white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  
  name: { fontSize: '22px', fontWeight: '700', letterSpacing: '1px' },
  links: { display: 'flex', gap: '24px', alignItems: 'center' },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    transition: '0.2s',
  }

};

export default Nav;

/* used to style the components internally using link */ 

     