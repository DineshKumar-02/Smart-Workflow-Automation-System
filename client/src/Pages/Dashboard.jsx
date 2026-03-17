import { useEffect, useState } from "react"
import Workflowform from "../Components/Workflowform"
import Workflowtable from "../Components/Workflowtable"
import { getWorkflows } from "../Services/Api"

function Dashboard() {
  const [workflows, setWorkflows] = useState([])

  const fetchData = async () => {
    const res = await getWorkflows()
    setWorkflows(res.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>⚡ FlowForge Dashboard</h1>
      <p style={{ color: "#555" }}>
        Manage workflows with smart automation
      </p>

      <Workflowform onCreated={fetchData} />

      <Workflowtable workflows={workflows} onRefresh={fetchData} />
    </div>
  )
}

export default Dashboard