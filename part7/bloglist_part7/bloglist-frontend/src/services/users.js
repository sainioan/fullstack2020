import axios from 'axios'
import storage from '../utils/storage'
const baseUrl = '/api/users'


const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const update = (user) => {
  const request = axios.put(`${baseUrl}/${user.id}`, user, getConfig())
  return request.then(response => response.data)
}

const create = (user) => {
  const request = axios.post(baseUrl, user, getConfig())
  return request.then(response => response.data)
}



const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }