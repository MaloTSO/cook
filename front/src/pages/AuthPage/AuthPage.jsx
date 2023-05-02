import {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

import {AppContext} from 'components/Router/Router'
import TextField from 'components/TextField/TextField'
import Button from 'components/Button/Button'
import Panel from 'components/Panel/Panel'
import './AuthPage.scss'

const AuthPage = () => {

  const {userId, setUserId} = useContext(AppContext)

  const navigate = useNavigate()

  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('malo@gmail.com')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState()
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    console.log('userId:', userId)
    if (!userId) {
      if (localStorage.getItem('userId')) {
        setUserId(localStorage.getItem('userId'))
      }
    } else if (userId) {
      console.log('HERE')
      localStorage.setItem('userId', userId)
      handleNavigate()
    }
  }, [userId])

  const handleConfirm = () => {
    setError(undefined)

    axios.post(
      `api/user/${(isLogin ? 'login' : 'register')}`,
      {pseudo, email, password}
    )
      .then((res) => {setUserId(res?.data)})
      .catch((err) => {
        setError(
          err?.response?.data?.errors?.pseudo ||
          err?.response?.data?.errors?.email ||
          err?.response?.data?.errors?.password
        )
      })
  }

  const handleNavigate = () => {navigate('/home')}

  return (
    <div id='auth-page-container'>
      <Panel>
        {
          // affichage conditionnel
          !isLogin &&
          <TextField
            label='Pseudo'
            value={pseudo}
            setter={setPseudo}
          />
        }
        <TextField
          label='Email'
          value={email}
          setter={setEmail}
        />
        <TextField
          label='Mot de passe'
          value={password}
          setter={setPassword}
          // prop qui cache la contenu du field
          isSecure
        />
        <span id='error-text'>{error?.toUpperCase()}</span>
        <Button
          label={isLogin ? 'Pas de compte ?' : 'Déjà un compte ?'}
          // inverse la boolean 'isLogin'
          onClick={() => setIsLogin((old) => !old)}
        />
        <Button
          // désactivé si les champs sont vides
          disabled={
            (!isLogin && pseudo === '') ||
            email === '' ||
            password === ''
          }
          // change le label si le mec se login ou register
          label={isLogin ? 'Connexion' : 'Inscription'}
          onClick={handleConfirm}
        />
        <Button
          label='Ne pas se connecter'
          onClick={handleNavigate}
        />
      </Panel>
    </div>
  )
}

export default AuthPage


