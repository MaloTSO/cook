import {Outlet} from 'react-router-dom'

import './MainPage.scss'
import Toolbar from 'components/Toolbar/Toolbar'

const MainPage = () => {

  return (
    <div id='main-page-container'>
      <Toolbar />
      <Outlet />
    </div>
  )
}

export default MainPage