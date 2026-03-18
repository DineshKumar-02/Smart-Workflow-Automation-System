import { useNavigate } from 'react-router-dom'
import { deleteWorkflow } from '../Services/Api'

function Workflowtable({ workflows, onRefresh }) {
  const navigate = useNavigate()
  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return
    await deleteWorkflow(id)
    onRefresh()
  }
  return (
    <table style={{ width:'100%', borderCollapse:'collapse' }}>
      <thead>
        <tr style={{ background:'#1e1e2e', color:'white' }}>
          <th style={{ padding:'12px', textAlign:'left' }}>Name</th>
          <th style={{ padding:'12px', textAlign:'left' }}>Version</th>
          <th style={{ padding:'12px', textAlign:'left' }}>Status</th>
          <th style={{ padding:'12px', textAlign:'left' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {workflows.map(wf => (
          <tr key={wf._id} style={{ borderBottom:'1px solid #eee' }}>
            <td style={{ padding:'10px 12px' }}>{wf.name}</td>
            <td style={{ padding:'10px 12px' }}>v{wf.version}</td>
            <td style={{ padding:'10px 12px', color: wf.is_active ? 'green' : 'gray' }}>{wf.is_active ? '✅ Active' : '⛔ Inactive'}</td>
            <td style={{ padding:'10px 12px' }}>
              <button onClick={() => navigate(`/workflow/${wf._id}/edit`)}    style={btn('#4f46e5')}>Edit</button>
              <button onClick={() => navigate(`/workflow/${wf._id}/execute`)} style={btn('#10b981')}>Run</button>
              <button onClick={() => handleDelete(wf._id)}                   style={btn('#ef4444')}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
const btn = (bg) => ({ marginRight:'6px', padding:'4px 10px', background:bg, color:'white', border:'none', borderRadius:'4px', cursor:'pointer' })
export default Workflowtable