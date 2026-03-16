import React, { useState } from "react";

function WorkflowForm({ setWorkflows, setMessage }) {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    department: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just update the table locally
    const newWorkflow = {
      id: Date.now(),
      ...formData,
      status: "Pending",
      priority: ""
    };

    setWorkflows(prev => [...prev, newWorkflow]);
    setMessage("Workflow submitted successfully!");
    setFormData({ name: "", amount: "", department: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        name="name"
        placeholder="Request Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
      />
      <input
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default WorkflowForm;