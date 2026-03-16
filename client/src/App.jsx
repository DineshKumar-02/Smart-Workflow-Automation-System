// import New from "./New";

// function App() {
//   return (
//     <div>
//       <New />
//     </div>
//   );
// }

// export default App;


import Workflowform from "./components/Workflowform";
import WorkflowTable from "./components/WorkflowTable";
import Notification from "./components/Notification";
import React, { useState } from "react";


function App() {
  const [workflows, setWorkflows] = useState([]);
  const [message, setMessage] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Workflow Automation System</h1>

      <Workflowform
        setWorkflows={setWorkflows}
        setMessage={setMessage}
      />

      <Notification message={message} />

      <WorkflowTable workflows={workflows} />
    </div>
  );
}

export default App;
