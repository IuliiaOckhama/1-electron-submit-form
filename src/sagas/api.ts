import axios from 'axios'
import { Note } from '../entities'

const server = 'https://actimindtraining.azurewebsites.net/api/notes'
export const fetchNotesApi = () => axios.get(server)
export const updateNoteApi = (note: Note) => axios.put(`${server}/${note.id}`, note)
export const createNewNoteApi = (note: any) => axios.post(`${server}`, note)
export const deleteNoteApi = (id: number) => axios.delete(`${server}/${id}`)