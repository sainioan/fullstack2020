import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null


const getAll =  () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
/* const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
} */

const create = async (newObject, user) => {
  const response = await axios({
    url: baseUrl,
    method: 'POST',
    data: newObject,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })

  return response.data
}

const remove = async Object => {
  const url = `${baseUrl}/${Object.id}`
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(url, config)

  return response
}
export default { getAll, create, update, setToken, remove }