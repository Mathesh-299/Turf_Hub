import axios from "axios";

const API="http://localhost:7777";

const getProjects =()=>axios.get(`${API}/projects/all`)
// const getProjectsbyID=(id)=>axios.get(`${API}/ground/${id}`)
const addProjects=(projectdata)=>axios.post(`${API}/projects/add`,projectdata)
const editProjects=(id,projectdata)=>axios.put(`${API}/projects/edits/${id}`,projectdata)
const deleteProjects=(id)=>axios.delete(`${API}/projects/delete/${id}`)
export {getProjects,editProjects,addProjects,deleteProjects}