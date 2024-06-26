import axios from 'axios'

const baseUrl = import.meta.env.MODE === 'production'
  ? 'https://bloglist-for-cicd-fs-learnergit.fly.dev/api/blogs'
  : 'http://localhost:3001/api/blogs'

console.log(import.meta.env.MODE)
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async ( newBlog ) => {

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async ( updatedBlog ) => {
  const formatedBlog = { ...updatedBlog, user: updatedBlog.user.id }
  delete formatedBlog.id
  const response = await axios.put(`${baseUrl}/${updatedBlog.id.toString()}`, formatedBlog)
  return response.data
}

const remove = async (blogID) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blogID.toString()}`, config)
}

export default { setToken, getAll, create, update, remove }