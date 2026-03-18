import { useState, useEffect } from 'react'
import Workflowform  from '../Components/Workflowform'
import Workflowtable from '../Components/workflowtable'
import { getWorkflows } from '../Services/Api'

function Dashboard() {
  const [workflows, setWorkflows] = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => { load() }, [])

  const load = async () => {
    setLoading(true)
    const res = await getWorkflows()
    setWorkflows(res.data)
    setLoading(false)
  }

  return (
    <div>
      <h1>⚡ FlowForge Dashboard</h1>
      <Workflowform onCreated={load} />
      <h2>All Workflows</h2>
      {loading ? <p>Loading...</p> : <Workflowtable workflows={workflows} onRefresh={load} />}
    </div>
  )
}
export default Dashboard