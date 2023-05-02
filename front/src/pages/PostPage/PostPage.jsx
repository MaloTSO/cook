import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

import './PostPage.scss'
import Post from 'components/Post/Post'

const PostPage = () => {

  const {postId} = useParams()

  const [post, setPost] = useState()

  useEffect(() => {
    axios.get(`api/post/${postId}`)
      .then((res) => setPost(res?.data))
      .catch(() => console.log('error getting a post by id'))
  }, [])

  return (
    <div id='post-page-container'>
      {post && <Post isComment data={post} />}
      {post?.comment?.map((post, i) => (
        <Post key={i} isComment data={post} />
      ))}
    </div>
  )
}

export default PostPage