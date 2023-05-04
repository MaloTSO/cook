import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import useAuth from 'hooks/useAuth'
import TextField from 'components/TextField/TextField'
import Button from 'components/Button/Button'
import Spinner from 'components/Spinner/Spinner'
import Panel from 'components/Panel/Panel'
import './AuthPage.scss'
import postLogin from 'API/postLogin'
import useAxios from 'hooks/useAxios'

const AuthPage = () => {

  const {setUserId} = useAuth()

  const navigate = useNavigate()

  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('malo@gmail.com')
  const [password, setPassword] = useState('123456')
  const [isLogin, setIsLogin] = useState(true)
  const [displayedError, setDisplayedError] = useState()

  const {loading, data, error, call: loginCall} = useAxios(
    postLogin.method,
    `${postLogin.url}${(isLogin ? 'login' : 'register')}`,
    {pseudo, email, password}
  )

  useEffect(() => {if (data) {setUserId(data)}}, [data])

  useEffect(() => {
    if (error) {
      setDisplayedError((
        error?.pseudo ||
        error?.email ||
        error?.password
      ).toUpperCase())
    }
  }, [error])

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
        <span id='error-text'>{displayedError}</span>
        {
          loading
          ?
          <Spinner />
          :
          <>
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
              onClick={loginCall}
            />
            <Button label='Ne pas se connecter' onClick={() => navigate('/home')} />
          </>
        }
      </Panel>
    </div>
  )
}

export default AuthPage


