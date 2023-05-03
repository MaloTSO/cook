import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {createContext, useState} from 'react'

import AuthPage from 'pages/AuthPage/AuthPage'
import HomePage from 'pages/HomePage/HomePage'
import MainPage from 'pages/MainPage/MainPage'
import ProfilPage from 'pages/ProfilPage/ProfilPage'
import PostPage from 'pages/PostPage/PostPage'
import CreatePostPage from 'pages/CreatePostPage/CreatePostPage'
import './Router.scss'

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
              <Route path='/post/:postId' element={<PostPage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/profil/:profilId' element={<ProfilPage />} />
              <Route path='/create' element={<CreatePostPage />} />
            </Route>
            <Route path='*' element={<Navigate replace to='/auth' />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default Router