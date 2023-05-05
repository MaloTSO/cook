import {useEffect, useState} from 'react'
import {useParams, useLocation} from 'react-router-dom'

import unfollow from 'API/unfollow'
import follow from 'API/follow'
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

  const location = useLocation()

  useEffect(() => {
    userCall()
    postsCall()
  }, [location])

  const isSelf = userId === profilId

  const [realData, setRealData] = useState()

  const {loading: userLoading, data: user, call: userCall} = useAxios(
    getUserByPosterId.method,
    getUserByPosterId.url + profilId
  )

  const {data: selfUser, call: selfUserCall} = useAxios(
    getUserByPosterId.method,
    getUserByPosterId.url + userId
  )

  const {data: unfollowRes, call: unfollowCall} = useAxios(
    unfollow.method,
    unfollow.url + userId,
    {idToUnFollow: profilId}
  )

  const {data: followRes, call: followCall} = useAxios(
    follow.method,
    follow.url + userId,
    {idToFollow: profilId}
  )

  const {loading: postsLoading, data: posts, call: postsCall} = useAxios(
    getPostsByUser.method,
    getPostsByUser.url + profilId
  )


  useEffect(() => {if (posts) {setRealData(posts.reverse())}}, [posts])

  useEffect(() => {
    if (userId) {selfUserCall()}
    userCall()
  }, [userId])

  useEffect(() => {
    selfUserCall()
    userCall()
  }, [unfollowRes, followRes])

  useEffect(() => {if (profilId) {postsCall()}}, [user])

  const isFollowed = user?.followers?.includes(selfUser?._id)

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
            <span>{`Abonnés: ${user?.followers?.length}`}</span>
            <span>{`Abonnements: ${user?.following?.length}`}</span>
            <Button
              disabled={!userId || isSelf}
              label={isFollowed ? 'Ne plus suivre' : 'Suivre'}
              onClick={isFollowed ? unfollowCall : followCall}
            />
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