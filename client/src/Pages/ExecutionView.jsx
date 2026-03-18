import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { executeWorkflow } from '../Services/Api'

function ExecutionView() {
  const { id } = useParams()
  const [amount,   setAmount]   = useState('')
  const [priority, setPriority] = useState('High')
  const [country,  setCountry]  = useState('IN')
  const [result,   setResult]   = useState(null)
  const [loading,  setLoading]  = useState(false)

  const run = async () => {
    setLoading(true)
    const res = await executeWorkflow(id, { data: { amount: Number(amount), priority, country }, triggered_by: 'user' })
    setResult(res.data)
    setLoading(false)
  }

  return (
    <div>
      <h1>▶️ Run Workflow</h1>
      <div style={{ background:'#f9f9f9', padding:'16px', borderRadius:'8px', marginBottom:'24px' }}>
        <h3>Input Data</h3>
        <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} style={inp} />
        <select value={priority} onChange={e => setPriority(e.target.value)} style={inp}>
          <option>High</option><option>Medium</option><option>Low</option>
        </select>
        <input placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} style={inp} />
        <br/><br/>
        <button onClick={run} disabled={loading} style={{ padding:'10px 20px', background:'#10b981', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' }}>
          {loading ? 'Running...' : '▶ Start'}
        </button>
      </div>
      {result && (
        <div>
          <h2>Result — <span style={{ color: result.status === 'completed' ? 'green' : 'red' }}>{result.status.toUpperCase()}</span></h2>
          {result.logs.map((log, i) => (
            <div key={i} style={{ border:'1px solid #ddd', borderRadius:'8px', padding:'12px', marginBottom:'10px' }}>
              <b>Step {i+1}: {log.step_name}</b> [{log.step_type}]
              <p>Next: {log.selected_next_step || '🏁 Ended'}</p>
              <details>
                <summary>Rules Evaluated</summary>
                {log.evaluated_rules.map((r, j) => (
                  <p key={j} style={{ color: r.result ? 'green' : 'gray', margin:'4px 0' }}>
                    {r.result ? '✅' : '❌'} {r.rule}
                  </p>
                ))}
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
const inp = { padding:'8px', marginRight:'8px', borderRadius:'6px', border:'1px solid #ccc' }
export default ExecutionView