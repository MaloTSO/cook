import {NavLink} from 'react-router-dom'
import {useEffect, useContext} from 'react'

import {AppContext} from 'components/Router/Router'
import './Toolbar.scss'
import Button from 'components/Button/Button'
import Panel from 'components/Panel/Panel'

const Toolbar = () => {

  const {userId, setUserId} = useContext(AppContext)

  useEffect(() => {if (!userId) {localStorage.removeItem('userId')}}, [userId])

  const handleDisconnect = () => {setUserId(undefined)}

  return (
    <Panel className='toolbar-container'>
      <NavLink
        to='/home'
        className={({isActive}) => 'navlink' + (isActive ? ' here' : '')}
      >
        Accueil
      </NavLink>
      <NavLink
        to='/profil'
        className={({isActive}) => 'navlink' + (isActive ? ' here' : '')}
      >
        Profil
      </NavLink>
      {
        userId
        ?
        <Button label='Déconnexion' onClick={handleDisconnect} />
        :
        <NavLink to='/auth' className='navlink'>Connexion</NavLink>
      }
    </Panel>
  )
}

export default Toolbar