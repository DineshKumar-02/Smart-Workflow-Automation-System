import { useState, useEffect } from 'react'
import Workflowform from '../Components/Workflowform'
import Workflowtable from '../Components/workflowtable'
import { getWorkflows } from '../Services/Api'

function Dashboard() {
  const [workflows, setWorkflows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorkflows()
  }, [])

  const fetchWorkflows = async () => {
    setLoading(true)
    try {
      const res = await getWorkflows()
      setWorkflows(res.data)
    } catch (err) {
      console.error('Error fetching workflows:', err)
    }
    setLoading(false)
  }

  return (
    <div>
      <h1>⚡ FlowForge Dashboard</h1>
      <p style={{ color: '#666' }}>Design workflows, define rules, and automate your processes.</p>

      {/* Create Workflow Form */}
      <Workflowform onCreated={fetchWorkflows} />

      {/* Workflows Table */}
      <h2>All Workflows</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Workflowtable workflows={workflows} onRefresh={fetchWorkflows} />
      )}
    </div>
  )
}

export default Dashboard