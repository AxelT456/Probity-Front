// Creamos una "instancia" de Axios con la configuración base.
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/formulas',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const calculateBinomial = (params) => {
  return apiClient.post('/binomial/', params)
}

export const calculateBernoulli = (params) => {
  return apiClient.post('/bernoulli/', params)
}

export const calculateMultinomial = (params) => {
  return apiClient.post('/multinomial/', params)
}
import axios from 'axios'

export const calculateNormalStandard = (params) => {
  return apiClient.post('/normal-standard/', params)
}

export const calculateGibbs = (params) => {
  return apiClient.post('/gibbs/', params)
}

export const calculateExponencial = (params) => {
  return apiClient.post('/exponencial/', params)
}
