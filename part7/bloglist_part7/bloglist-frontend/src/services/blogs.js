import axios from 'axios'
import storage from '../utils/storage'
const baseUrl = '/api/blogs'


const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

/* const setToken = newToken => {
  token = `bearer ${newToken}`
} */

const update = (blog) => {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  return request.then(response => response.data)
}

const create = (blog) => {
  const request = axios.post(baseUrl, blog, getConfig())
  return request.then(response => response.data)
}



const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.then(response => response.data)
}

/* const remove = async Object => {
  const url = `${baseUrl}/${Object.id}`
  const config = {
    headers: { Authorization: token },
  } */

  //const response = await axios.delete(url, config)
/* 
  return response
} */
export default { getAll, create, update, remove }