import axios from 'axios'

const server = 'https://actimindtraining.azurewebsites.net/api/notes'
export const fetchNotesApi = () => {
 return axios.get(server)
}
