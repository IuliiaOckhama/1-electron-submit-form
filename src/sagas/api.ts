import axios from 'axios'
import { Note } from '../entities'

type NewNoteReq = {
  title: string,
  content: string
}

const server = 'https://actimindtraining.azurewebsites.net/api/notes'
export const fetchNotesApi = (page: number) => axios.get(`${server}/?page=${page}`)
export const fetchSortedNotes = (sortBy: string, page: number) => axios.get(`${server}?page=${page}&sortBy=${sortBy}`)
export const updateNoteApi = (note: Note) => axios.put(`${server}/${note.id}`, note)
export const createNewNoteApi = (note: NewNoteReq) => axios.post(`${server}`, note)
export const deleteNoteApi = (id: number) => axios.delete(`${server}/${id}`)