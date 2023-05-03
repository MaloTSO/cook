import {NavLink} from 'react-router-dom'

import './Toolbar.scss'
import Panel from 'components/Panel/Panel'
import useAuth from 'hooks/useAuth'

const Toolbar = () => {

  const {userId, handleDisconnect} = useAuth()

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
      <NavLink
        to={userId ? '/home' : '/auth'}
        onClick={userId ? handleDisconnect : null}
        className='navlink'
      >
        {userId ? 'Déconnexion' : 'Connexion'}
      </NavLink>
    </Panel>
  )
}

export default Toolbar