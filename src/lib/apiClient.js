import axios from 'axios'
import Cookies from 'js-cookie'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(async (config) => {
  const token = Cookies.get('UNTAN_ACCESS')

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response.status === 401) {
      // window location reload
      window.location.reload()
    }

    return Promise.reject(error)
  }
)

export default apiClient
