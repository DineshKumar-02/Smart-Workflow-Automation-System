import { deleteWorkflow } from '../Services/Api'

function Workflowtable({ workflows, onRefresh }) {

  const handleDelete = async (id) => {
    if (!confirm('Delete this workflow?')) return
    await deleteWorkflow(id)
    onRefresh()
  }

  return (
    <div>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Version</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workflows.map(wf => (
            <tr key={wf._id} style={styles.row}>
              <td style={styles.td}>{wf.name}</td>
              <td style={styles.td}>v{wf.version}</td>
              <td style={styles.td}>
                <span style={{ color: wf.is_active ? 'green' : 'gray' }}>
                  {wf.is_active ? '✅ Active' : '⛔ Inactive'}
                </span>
              </td>
              <td style={styles.td}>
                <button onClick={() => handleDelete(wf._id)} style={styles.deleteBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {workflows.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
          No workflows yet. Create one above!
        </p>
      )}
    </div>
  )
}

const styles = {
  table: { width: '100%', borderCollapse: 'collapse' },
  headerRow: { background: '#1e1e2e', color: 'white' },
  row: { borderBottom: '1px solid #eee' },
  th: { padding: '12px', textAlign: 'left' },
  td: { padding: '10px 12px' },
  deleteBtn: { padding: '4px 10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
}

export default Workflowtable