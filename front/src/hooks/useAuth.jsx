import {useContext, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

import {AppContext} from 'components/Router/Router'

const useAuth = () => {

  const navigate = useNavigate()

  const location = useLocation()

  const {userId, setUserId} = useContext(AppContext)

  useEffect(() => {
    if (!userId) {setUserId(localStorage.getItem('userId'))}

    if (userId) {
      localStorage.setItem('userId', userId)
      if (location.pathname === '/auth') {navigate('/home')}
    }
  }, [userId])

  const handleDisconnect = () => {
    localStorage.removeItem('userId')
    setUserId(undefined)
  }

  return {userId, setUserId, handleDisconnect}
}

export default useAuth