import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getWorkflow, getSteps, createStep, deleteStep } from '../Services/Api'

function WorkflowEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [workflow, setWorkflow] = useState(null)
  const [steps, setSteps]       = useState([])
  const [name, setName]         = useState('')
  const [type, setType]         = useState('task')

  useEffect(() => { load() }, [])

  const load = async () => {
    const w = await getWorkflow(id);  setWorkflow(w.data)
    const s = await getSteps(id);     setSteps(s.data)
  }

  const addStep = async () => {
    if (!name) return alert('Enter step name')
    await createStep(id, { name, step_type: type, order: steps.length + 1 })
    setName(''); load()
  }

  const removeStep = async (sid) => {
    await deleteStep(id, sid); load()
  }

  if (!workflow) return <p>Loading...</p>

  return (
    <div>
      <button onClick={() => navigate('/')}>← Back</button>
      <h1>✏️ {workflow.name}</h1>
      <h2>Steps</h2>
      {steps.map((s, i) => (
        <div key={s._id} style={{ display:'flex', justifyContent:'space-between', padding:'12px', border:'1px solid #ddd', borderRadius:'8px', marginBottom:'8px' }}>
          <span>{i+1}. <b>{s.name}</b> — [{s.step_type}]</span>
          <div>
            <button onClick={() => navigate(`/workflow/${id}/rules?stepId=${s._id}`)} style={btn('#4f46e5')}>Rules</button>
            <button onClick={() => removeStep(s._id)} style={btn('#ef4444')}>Delete</button>
          </div>
        </div>
      ))}
      <div style={{ background:'#f9f9f9', padding:'16px', borderRadius:'8px', marginTop:'16px' }}>
        <h3>Add Step</h3>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Step name" style={inp} />
        <select value={type} onChange={e => setType(e.target.value)} style={inp}>
          <option value="task">Task</option>
          <option value="approval">Approval</option>
          <option value="notification">Notification</option>
        </select>
        <button onClick={addStep} style={btn('#10b981')}>+ Add</button>
      </div>
    </div>
  )
}
const btn = bg => ({ marginRight:'6px', padding:'6px 12px', background:bg, color:'white', border:'none', borderRadius:'4px', cursor:'pointer' })
const inp = { padding:'8px', marginRight:'8px', borderRadius:'6px', border:'1px solid #ccc' }
export default WorkflowEditor