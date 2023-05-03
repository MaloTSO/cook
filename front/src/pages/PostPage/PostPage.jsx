import {useEffect} from 'react'
import {useParams} from 'react-router-dom'

import './PostPage.scss'
import Post from 'components/Post/Post'
import getPostById from 'API/getPostById'
import useAxios from 'hooks/useAxios'

const PostPage = () => {

  const {postId} = useParams()

  const {loading, data: post, call} = useAxios(
    getPostById.method,
    `${getPostById.url}${postId}`
  )

  useEffect(() => {call()}, [])

  return (
    <div id='post-page-container'>
      {post && <Post isMain data={post} />}
      {post?.comment?.map((post, i) => (<Post key={i} isComment data={post} />))}
    </div>
  )
}

export default PostPage