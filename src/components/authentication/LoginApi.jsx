import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/auth'
})

const googleAuth = (code) => api.get(`/google?code=${code}`);