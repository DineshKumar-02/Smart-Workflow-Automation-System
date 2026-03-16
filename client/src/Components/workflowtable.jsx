import React from "react";

function WorkflowTable({ workflows }) {
  return (
    <table border="1" cellPadding="5" cellSpacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Department</th>
          <th>Status</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        {workflows.map((wf) => (
          <tr key={wf.id}>
            <td>{wf.id}</td>
            <td>{wf.name}</td>
            <td>{wf.amount}</td>
            <td>{wf.department}</td>
            <td>{wf.status}</td>
            <td>{wf.priority}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default WorkflowTable;