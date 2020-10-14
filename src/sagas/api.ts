import axios from 'axios'
import { Note } from '../entities'

type NewNoteReq = {
  title: string,
  content: string
}

const server = 'https://actimindtraining.azurewebsites.net/api/notes'
export const fetchNotesApi = () => axios.get(server)
export const updateNoteApi = (note: Note) => axios.put(`${server}/${note.id}`, note)
export const createNewNoteApi = (note: NewNoteReq) => axios.post(`${server}`, note)
export const deleteNoteApi = (id: number) => axios.delete(`${server}/${id}`)