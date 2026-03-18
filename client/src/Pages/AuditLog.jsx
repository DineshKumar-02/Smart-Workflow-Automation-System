import { useState, useEffect } from 'react'
import { getAllExecutions } from '../Services/Api'

function AuditLog() {
  const [list, setList]       = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllExecutions()
      .then(r => { setList(r.data); setLoading(false) })
      .catch(err => { console.log(err); setLoading(false) })
  }, [])

  return (
    <div>
      <h1>📋 Audit Log</h1>
      {loading ? <p>Loading...</p> : (
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'#1e1e2e', color:'white' }}>
              <th style={th}>ID</th>
              <th style={th}>Workflow</th>
              <th style={th}>Status</th>
              <th style={th}>By</th>
              <th style={th}>Time</th>
            </tr>
          </thead>
          <tbody>
            {list.map(e => (
              <tr key={e._id} style={{ borderBottom:'1px solid #eee' }}>
                <td style={td}><code>{e._id.slice(0,8)}...</code></td>
                <td style={td}>{e.workflow_id}</td>
                <td style={td}>{e.status.toUpperCase()}</td>
                <td style={td}>{e.triggered_by}</td>
                <td style={td}>{new Date(e.started_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && list.length === 0 && (
        <p style={{ textAlign:'center', color:'#888' }}>No executions yet.</p>
      )}
    </div>
  )
}

const th = { padding:'12px', textAlign:'left' }
const td = { padding:'10px 12px' }

export default AuditLog