import axios from 'axios'
const baseUrl = import.meta.env.MODE === 'production'
  ? 'https://bloglist-for-cicd-fs-learnergit.fly.dev/api/login'
  : 'http://localhost:3001/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }