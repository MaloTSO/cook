import {useEffect} from 'react'
import {useParams} from 'react-router-dom'

import './ProfilPanel.scss'
import Button from 'components/Button/Button'
import Panel from 'components/Panel/Panel'
import useAxios from 'hooks/useAxios'
import useAuth from 'hooks/useAuth'
import getUserByPosterId from 'API/getUserByPosterId'
import getPostsByUser from 'API/getPostsByUser'
// import Post from 'components/Post/Post'

const ProfilPanel = () => {

  const {userId} = useAuth()

  const {profilId} = useParams()

  const isSelf = userId === profilId

  const {data: user, call: userCall} = useAxios(
    getUserByPosterId.method,
    getUserByPosterId.url + profilId
  )

  const {data: posts, call: postsCall} = useAxios(
    getPostsByUser.method,
    getPostsByUser.url + profilId
  )

  useEffect(() => {
    if (profilId) {
      postsCall()
      userCall()
    }
  }, [user])

  return (
    <>
      <Panel className='profil-panel-container'>
        <span id='pseudo'>{user?.pseudo}</span>
        <Button disabled={isSelf} label='Suivre' />
      </Panel>
      {/* {posts?.reverse()?.map((post, i) => (
        <Post key={i} data={post} />
      ))} */}
    </>
  )
}

export default ProfilPanel