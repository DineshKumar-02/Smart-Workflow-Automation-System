import axios from "axios"

const API = "http://localhost:5173/api/workflows"

export const getWorkflows = () => axios.get(API)
export const createWorkflow = (data) => axios.post(API, data)
export const deleteWorkflow = (id) => axios.delete(`${API}/${id}`)
export const updateWorkflow = (id, data) => axios.put(`${API}/${id}`, data) 