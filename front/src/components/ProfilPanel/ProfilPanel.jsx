import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import './ProfilPanel.scss'
import Button from 'components/Button/Button'
import Panel from 'components/Panel/Panel'
import Spinner from 'components/Spinner/Spinner'
import useAxios from 'hooks/useAxios'
import useAuth from 'hooks/useAuth'
import getUserByPosterId from 'API/getUserByPosterId'
import getPostsByUser from 'API/getPostsByUser'
import Post from 'components/Post/Post'

const ProfilPanel = () => {

  const {userId} = useAuth()

  const {profilId} = useParams()

  const isSelf = userId === profilId

  const [realData, setRealData] = useState()

  const {loading: userLoading, data: user, call: userCall} = useAxios(
    getUserByPosterId.method,
    getUserByPosterId.url + profilId
  )

  const {loading: postsLoading, data: posts, call: postsCall} = useAxios(
    getPostsByUser.method,
    getPostsByUser.url + profilId
  )

  useEffect(() => {if (posts) {setRealData(posts.reverse())}}, [posts])

  useEffect(() => {userCall()}, [])

  useEffect(() => {if (profilId) {postsCall()}}, [user])

  return (
    <>
      <Panel className='profil-panel-container'>
        {
          userLoading
          ?
          <Spinner size='medium' />
          :
          <>
            <span id='pseudo'>{user?.pseudo}</span>
            <Button disabled={!userId || isSelf} label='Suivre' />
          </>
        }
      </Panel>
      <div id='profil-page-posts'>
        {
          postsLoading
          ?
          <Spinner size='large' />
          :
          realData?.map((post, i) => (<Post key={i} data={post} />))
        }
      </div>
    </>
  )
}

export default ProfilPanel