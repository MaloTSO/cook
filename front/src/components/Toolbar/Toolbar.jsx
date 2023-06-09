import {NavLink} from 'react-router-dom'

import './Toolbar.scss'
import Panel from 'components/Panel/Panel'
import useAuth from 'hooks/useAuth'
import logo from 'assets/images/logo.png'

const Toolbar = () => {

  const {userId, handleDisconnect} = useAuth()

  return (
    <Panel className='toolbar-container'>
      <img height='350' src={logo} />
      <NavLink
        to='/home'
        className={({isActive}) => 'navlink' + (isActive ? ' here' : '')}
      >
        Accueil
      </NavLink>
      {
        userId &&
        <>
          <NavLink
            to={`/profil/${userId}`}
            className={({isActive}) => 'navlink' + (isActive ? ' here' : '')}
          >
            Mon profil
          </NavLink>
          <NavLink
            to='/create'
            className={({isActive}) => 'navlink' + (isActive ? ' here' : '')}
          >
            Poster
          </NavLink>
          <NavLink
            to='/followed'
            className={({isActive}) => 'navlink' + (isActive ? ' here' : '')}
          >
            Pour moi
          </NavLink>
        </>
      }
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