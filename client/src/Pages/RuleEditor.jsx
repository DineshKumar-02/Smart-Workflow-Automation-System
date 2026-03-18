import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRules, createRule, deleteRule } from '../Services/Api'

function RuleEditor() {
  const stepId    = new URLSearchParams(useLocation().search).get('stepId')
  const navigate  = useNavigate()
  const [rules, setRules]         = useState([])
  const [condition, setCondition] = useState('')
  const [nextStep, setNextStep]   = useState('')
  const [priority, setPriority]   = useState(1)

  useEffect(() => { if(stepId) load() }, [stepId])

  const load = async () => { const r = await getRules(stepId); setRules(r.data) }

  const add = async () => {
    if (!condition) return alert('Enter condition')
    await createRule(stepId, { condition, next_step_id: nextStep || null, priority })
    setCondition(''); setNextStep(''); load()
  }

  const remove = async (id) => { await deleteRule(id); load() }

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>📋 Rule Editor</h1>
      <table style={{ width:'100%', borderCollapse:'collapse', marginBottom:'24px' }}>
        <thead>
          <tr style={{ background:'#1e1e2e', color:'white' }}>
            <th style={th}>Priority</th><th style={th}>Condition</th><th style={th}>Next Step ID</th><th style={th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rules.map(r => (
            <tr key={r._id} style={{ borderBottom:'1px solid #eee' }}>
              <td style={td}>{r.priority}</td>
              <td style={td}><code>{r.condition}</code></td>
              <td style={td}>{r.next_step_id || '🏁 END'}</td>
              <td style={td}><button onClick={() => remove(r._id)} style={{ background:'#ef4444', color:'white', border:'none', padding:'4px 10px', borderRadius:'4px', cursor:'pointer' }}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ background:'#f9f9f9', padding:'16px', borderRadius:'8px' }}>
        <h3>Add Rule</h3>
        <input type="number" value={priority} onChange={e => setPriority(Number(e.target.value))} placeholder="Priority" style={{ ...inp, width:'70px' }} />
        <input value={condition} onChange={e => setCondition(e.target.value)} placeholder="e.g. amount > 100 && priority == 'High'" style={{ ...inp, width:'320px' }} />
        <input value={nextStep} onChange={e => setNextStep(e.target.value)} placeholder="Next Step ID (blank = END)" style={{ ...inp, width:'200px' }} />
        <button onClick={add} style={{ padding:'8px 16px', background:'#4f46e5', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' }}>+ Add Rule</button>
      </div>
    </div>
  )
}
const th  = { padding:'10px', textAlign:'left' }
const td  = { padding:'10px' }
const inp = { padding:'8px', marginRight:'8px', borderRadius:'6px', border:'1px solid #ccc' }
export default RuleEditor