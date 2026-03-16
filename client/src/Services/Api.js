import axios from 'axios'

const API = 'http://localhost:5000/api'

// WORKFLOWS
export const getWorkflows = () => axios.get(`${API}/workflows`)
export const createWorkflow = (data) => axios.post(`${API}/workflows`, data)
export const deleteWorkflow = (id) => axios.delete(`${API}/workflows/${id}`)

// EXECUTIONS
export const executeWorkflow = (id, data) => axios.post(`${API}/workflows/${id}/execute`, data)
export const getAllExecutions = () => axios.get(`${API}/executions`)