import { deleteWorkflow, updateWorkflow } from "../Services/Api"

function Workflowtable({ workflows, onRefresh }) {

  const handleDelete = async (id) => {
    if (!confirm("Delete this workflow?")) return
    await deleteWorkflow(id)
    onRefresh()
  }

  const handleEdit = async (wf) => {
    const newName = prompt("Edit name:", wf.name)
    if (!newName) return

    await updateWorkflow(wf._id, { name: newName })
    onRefresh()
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr style={styles.header}>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Started By</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {workflows.map(wf => (
          <tr key={wf._id}>
            <td>{wf._id}</td>
            <td>{wf.name}</td>
            <td>{wf.type}</td>
            <td>{wf.status}</td>
            <td>{wf.startedBy}</td>
            <td>{wf.startDate}</td>
            <td>{wf.endDate}</td>
            <td>
              <button onClick={() => handleEdit(wf)} style={styles.edit}>Edit</button>
              <button onClick={() => handleDelete(wf._id)} style={styles.delete}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const styles = {
  table: { width: "100%", borderCollapse: "collapse" },
  header: { background: "#1e293b", color: "white" },
  edit: {
    marginRight: "6px",
    padding: "6px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px"
  },
  delete: {
    padding: "6px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px"
  }
}

export default Workflowtable 