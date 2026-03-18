import axios from 'axios'

const API = 'http://localhost:5000/api/workflows'

export const getWorkflows    = ()          => axios.get(API)
export const getWorkflow     = (id)        => axios.get(`${API}/${id}`)
export const createWorkflow  = (data)      => axios.post(API, data)
export const updateWorkflow  = (id, data)  => axios.put(`${API}/${id}`, data)
export const deleteWorkflow  = (id)        => axios.delete(`${API}/${id}`)

export const getSteps        = (wfId)      => axios.get(`${API}/${wfId}/steps`)
export const createStep      = (wfId, data)=> axios.post(`${API}/${wfId}/steps`, data)
export const deleteStep      = (wfId, sid) => axios.delete(`${API}/${wfId}/steps/${sid}`)

export const getRules        = (stepId)    => axios.get(`${API}/steps/${stepId}/rules`)
export const createRule      = (stepId, d) => axios.post(`${API}/steps/${stepId}/rules`, d)
export const deleteRule      = (ruleId)    => axios.delete(`${API}/rules/${ruleId}`)

export const executeWorkflow = (id, data)  => axios.post(`${API}/${id}/execute`, data)
export const getAllExecutions = ()          => axios.get(`${API}/executions/all`)
export const getExecution    = (id)        => axios.get(`${API}/executions/${id}`)