import axios from 'axios'
const baseUrl = '/api/blogs/:id/comments'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}



const create = async (id, comment) => {
/*   {
    "content": "Reading Rocks-- a big shout out to reading blogs! ", "blogId": "5ee25a61cc9ed0b2a451ca30"
    } */
  try{
  const response = await axios.post(`/api/blogs/${id}/comments`, comment)
 // const response = await axios.post(`/api/blogs/${id}/comments`, comment)
  return response.data
  } catch(error){
    console.log(error.message)
  }
} 




export default { getAll, create }