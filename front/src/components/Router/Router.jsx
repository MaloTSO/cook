import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import axios from 'axios'
import {createContext, useState} from 'react'

import AuthPage from 'pages/AuthPage/AuthPage'
import HomePage from 'pages/HomePage/HomePage'
import MainPage from 'pages/MainPage/MainPage'
import ProfilPage from 'pages/ProfilPage/ProfilPage'
import PostPage from 'pages/PostPage/PostPage'
import './Router.scss'

axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export const AppContext = createContext(null)

const Router = () => {

  const [userId, setUserId] = useState()

  return (
    <div id='router-container'>
      <BrowserRouter>
        <AppContext.Provider value={{userId, setUserId}}>
          <Routes>
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/' element={<MainPage />}>
              <Route path='/' element={<Navigate replace to='/home' />} />
              <Route path='/:postId' element={<PostPage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/profil' element={<ProfilPage />} />
            </Route>
            <Route path='*' element={<Navigate replace to='/auth' />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default Router