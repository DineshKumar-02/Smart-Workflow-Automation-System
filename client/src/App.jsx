import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Components/Nav'
import Dashboard from './Pages/Dashboard'
import Approval from './Pages/Approval'
import WorkflowEditor from './Pages/WorkflowEditor'
import RuleEditor from './Pages/RuleEditor'
import ExecutionView from './Pages/ExecutionView'
import AuditLog from './Pages/AuditLog'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div style={{ padding: '24px' }}>
        <Routes>
          <Route path="/"                     element={<Dashboard />} />
          <Route path="/approval"             element={<Approval />} />
          <Route path="/workflow/:id/edit"    element={<WorkflowEditor />} />
          <Route path="/workflow/:id/rules"   element={<RuleEditor />} />
          <Route path="/workflow/:id/execute" element={<ExecutionView />} />
          <Route path="/audit"               element={<AuditLog />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App