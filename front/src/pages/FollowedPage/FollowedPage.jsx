import {useEffect, useState} from 'react'
import axios from 'axios'

import useAuth from 'hooks/useAuth'
import getUserByPosterId from 'API/getUserByPosterId'
import './FollowedPage.scss'
import Post from 'components/Post/Post'
import ProfilPanel from 'components/ProfilPanel/ProfilPanel'
import useAxios from 'hooks/useAxios'

const FollowedPage = () => {

  const {userId} = useAuth()

  const [data, setData] = useState([])

  const {loading: userLoading, data: user, call: userCall} = useAxios(
    getUserByPosterId.method,
    getUserByPosterId.url + userId
  )

  const following = user?.following

  useEffect(() => {if (userId) {userCall()}}, [userId])

  useEffect(() => {
    if (!following?.length) {return}

    following?.forEach((id) => {
      axios.get('api/post/ByUser/' + id)
        .then((res) => {
          res?.data?.forEach((post) => {
            setData((old) => [...old, post])
          })
        })
    })
  }, [following])

  return (
    <div id='followed-page-container'>
      {data?.map((post, i) => (
        <Post key={i} data={post} />
      ))}
    </div>
  )
}

export default FollowedPage