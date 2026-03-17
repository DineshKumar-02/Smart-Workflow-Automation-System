let workflows = [
  {
    _id: "1",
    name: "Leave Approval",
    type: "HR",
    version: 1,
    status: "Pending",
    startedBy: "Dinesh",
    startDate: "17-03-2026",
    endDate: "-",
    is_active: true
  },
  {
    _id: "2",
    name: "Salary Processing",
    type: "Finance",
    version: 1,
    status: "Approved",
    startedBy: "Admin",
    startDate: "15-03-2026",
    endDate: "16-03-2026",
    is_active: true
  }
]

export const getWorkflows = async () => {
  return { data: workflows }
}

export const createWorkflow = async (data) => {
  const newWorkflow = {
    _id: Date.now().toString(),
    ...data,
    version: 1,
    status: "Pending",
    startedBy: "You",
    startDate: new Date().toLocaleDateString(),
    endDate: "-",
    is_active: true
  }
  workflows.push(newWorkflow)
  return { data: newWorkflow }
}

export const deleteWorkflow = async (id) => {
  workflows = workflows.filter(w => w._id !== id)
}

export const updateWorkflow = async (id, updatedData) => {
  workflows = workflows.map(w =>
    w._id === id ? { ...w, ...updatedData } : w
  )
}