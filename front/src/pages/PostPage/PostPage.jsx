import {useEffect} from 'react'
import {useParams} from 'react-router-dom'

import useAxios from 'hooks/useAxios'
import useAuth from 'hooks/useAuth'
import './PostPage.scss'
import Post from 'components/Post/Post'
import Spinner from 'components/Spinner/Spinner'
import getPostById from 'API/getPostById'
import PostCreator from 'components/PostCreator/PostCreator'

const PostPage = () => {

  const {postId} = useParams()

  const {userId} = useAuth()

  const {loading, data: post, call} = useAxios(
    getPostById.method,
    `${getPostById.url}${postId}`
  )

  useEffect(call, [])

  return (
    <div id='post-page-container'>
      {
        (loading || !post)
        ?
        <Spinner size='large' />
        :
        <>
          <Post isMain data={post} />
          {userId && <PostCreator refreshCall={call} postId={postId} />}
          {post?.comment?.map((post, i) => (
            <Post
              key={i}
              postId={postId}
              refreshCall={call}
              isComment
              data={post}
            />
          ))}
        </>
      }
    </div>
  )
}

export default PostPage