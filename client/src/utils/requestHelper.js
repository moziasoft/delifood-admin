import axios from 'axios'
import { toast } from 'react-toastify'
import { errors } from '../locales/en'

axios.defaults.baseURL = 'https:google.com'
axios.defaults.headers.common.Accept = 'application/json'

export const callApi = async (
  endpoint,
  method = 'GET',
  body,
  headers = {
    'Content-Type': 'application/json',
  },
) => {
  const token = sessionStorage.getItem('jwt');
  if (!token) {
    return window.location.href='/login';
  }

  try {
    const result = await axios({
      method,
      url: `${endpoint}`,
      headers: {
        ...headers,
        Authorization: token
      },
      data: body,
    })

    return result.data
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        sessionStorage.setItem('jwt', '')
        return window.location.href='/login'
      }

      const errorMessage = error.response.data.error;
      if (errorMessage && errorMessage.name === 'ValidationError') {
        toast.error(errors['VALIDATION_ERROR']);
      } else {
        toast.error(errors[error.response.data.error])
      }
    }
    throw error;
  }
}

export const callApiWithFile = async (
  endpoint,
  method = 'POST',
  body,
  files,
  headers = {
    'Content-Type': 'multipart/form-data',
  },
) => {
  const token = sessionStorage.getItem('jwt');
  if (!token) {
    return window.location.href='/login';
  }

  try {
    const formData = new FormData();
    if (files) {
      for (const file of files) {
        formData.append(file.name, file, file.name)
      }
    }
    if (body) {
      for (let key in body) {
        formData.append(key, body[key])
      }
    }
    headers = {
      ...headers,
      Authorization: token,
    }
    const result = await axios.post(endpoint, formData, { headers });
    return result.data;
  } catch (error) {
    throw error;
  }
}
