import { useState } from 'react'
import { createWorkflow } from '../Services/Api'

function Workflowform({ onCreated }) {
  const [name, setName] = useState('')

  const handleSubmit = async () => {
    if (!name) return alert('Enter workflow name')
    await createWorkflow({ name, version: 1, is_active: true })
    setName('')
    onCreated()
  }

  return (
    <div style={{ background:'#f9f9f9', padding:'16px', borderRadius:'8px', marginBottom:'20px' }}>
      <h3>➕ Create New Workflow</h3>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Expense Approval"
        style={{ padding:'8px 12px', width:'300px', marginRight:'10px', borderRadius:'6px', border:'1px solid #ccc' }} />
      <button onClick={handleSubmit}
        style={{ padding:'8px 16px', background:'#4f46e5', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' }}>
        Create
      </button>
    </div>
  )
}
export default Workflowform