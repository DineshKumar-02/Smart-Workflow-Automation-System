import { useState } from 'react'
import { createWorkflow } from '../Services/Api'

function Workflowform({ onCreated }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!name) return alert('Enter workflow name')
    setLoading(true)
    try {
      await createWorkflow({ name, version: 1, is_active: true })
      setName('')
      onCreated() // refresh the list in parent
      alert('Workflow created!')
    } catch (err) {
      alert('Error creating workflow')
    }
    setLoading(false)
  }

  return (
    <div style={styles.form}>
      <h3>➕ Create New Workflow</h3>
      <input
        style={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Workflow name (e.g. Expense Approval)"
      />
      <button onClick={handleSubmit} style={styles.button} disabled={loading}>
        {loading ? 'Creating...' : 'Create Workflow'}
      </button>
    </div>
  )
}

const styles = {
  form: { background: '#f9f9f9', padding: '16px', borderRadius: '8px', marginBottom: '20px' },
  input: { padding: '8px 12px', width: '300px', marginRight: '10px', borderRadius: '6px', border: '1px solid #ccc' },
  button: { padding: '8px 16px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }
}

export default Workflowform