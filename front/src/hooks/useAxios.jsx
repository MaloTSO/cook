import {useState} from 'react'
import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

const useAxios = (method, url, body) => {

  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [data, setData] = useState()

  const call = () => {
    setIsLoading(true)

    axios
      [method](url, method === 'delete' ? {data: body} : body)
      .then((res) => {setData(res?.data)})
      .catch((err) => {setError(err?.response?.data?.errors)})
      .finally(() => {setIsLoading(false)})
  }

  return {loading, error, data, call}
}

export default useAxios