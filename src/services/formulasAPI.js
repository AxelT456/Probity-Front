import axios from 'axios'

// Creamos una "instancia" de Axios con la configuración base.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

export const calculateNormal = (params) => {
  return apiClient.post('/normal-standard/', params)
}

export const calculateNormalStandard = (params) => {
  return apiClient.post('/normal-standard/', params)
}

export const calculateGibbs = (params) => {
  return apiClient.post('/gibbs/', params)
}

export const calculateExponencial = (params) => {
  return apiClient.post('/exponencial/', params)
}

export const calculateBivariateNormal = (params) => {
  return apiClient.post('/bivariate-normal/', params)
}
