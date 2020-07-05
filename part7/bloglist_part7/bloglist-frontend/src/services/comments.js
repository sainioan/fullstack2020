import axios from 'axios'
const baseUrl = '/api/blogs/:id/comments'


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}



const create = ( id, comment) => {
  const request = axios.post(`/api/blogs${id}/comments`, comment)
  return request.then(response => response.data)
}




export default { getAll, create }