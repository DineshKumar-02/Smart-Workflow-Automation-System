import { useState } from "react"
import { createWorkflow } from "../Services/Api"

function Workflowform({ onCreated }) {
  const [name, setName] = useState("")
  const [type, setType] = useState("Leave Approval")

  const handleSubmit = async () => {
    if (!name) return alert("Enter workflow name")

    await createWorkflow({ name, type })
    setName("")
    onCreated()
  }

  return (
    <div style={styles.form}>
      <h3>Create Workflow</h3>

      <input
        style={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Workflow name"
      />

      <select
        style={styles.input}
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option>Leave Approval</option>
        <option>Salary Processing</option>
        <option>Expense Approval</option>
        <option>Recruitment Workflow</option>
      </select>

      <button onClick={handleSubmit} style={styles.button}>
        Create
      </button>
    </div>
  )
}

const styles = {
  form: {
    background: "#f1f5f9",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px"
  },
  input: {
    padding: "10px",
    marginRight: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px 16px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
}

export default Workflowform

