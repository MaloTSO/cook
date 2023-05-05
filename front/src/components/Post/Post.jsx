import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'

import './Post.scss'
import deletePost from 'API/deletePost'
import deleteComment from 'API/deleteComment'
import useAxios from 'hooks/useAxios'
import commentSvg from 'assets/icons/comment.svg'
import likeSvg from 'assets/icons/like.svg'
import fullLikeSvg from 'assets/icons/fullLike.svg'
import deleteSvg from 'assets/icons/delete.svg'
import Panel from 'components/Panel/Panel'
import Icon from 'components/Icon/Icon'
import Separator from 'components/Separator/Separator'
import Spinner from 'components/Spinner/Spinner'
import Image from 'components/Image/Image'
import useAuth from 'hooks/useAuth'
import getUserByPosterId from 'API/getUserByPosterId'
import patchLikeUnlike from 'API/patchLikeUnlike'

const Post = ({data, isComment, postId, isMain, refreshCall}) => {

  const {userId} = useAuth()

  const navigate = useNavigate()

  const isLiked = data?.likers?.includes(userId)

  const isSelf = userId === data?.posterId

  const [localLiked, setLocalLiked] = useState(isLiked)

  const {loading, data: user, call: getUserCall} = useAxios(
    getUserByPosterId.method,
    getUserByPosterId.url + data.posterId
  )

  const {call: likeUnlikeCall} = useAxios(
    patchLikeUnlike.method,
    `${patchLikeUnlike.url}${(isLiked ? 'unlike' : 'like')}/${data?._id}`,
    {id: userId}
  )

  const {data: deleteComRes, call: deleteComCall} = useAxios(
    deleteComment.method,
    deleteComment.url + postId,
    {ComID: data?._id}
  )

  const {data: deletePostRes, call: deletePostCall} = useAxios(
    deletePost.method,
    deletePost.url + data?._id
  )

  useEffect(getUserCall, [])

  useEffect(() => {if (deleteComRes) {refreshCall()}}, [deleteComRes])

  useEffect(() => {if (deletePostRes) {refreshCall()}}, [deletePostRes])

  const handleHeartCliked = () => {
    setLocalLiked((old) => !old)
    likeUnlikeCall()
  }

  const parseDate = (date) => {
    return date.split('T')[0].split('-').reverse().join('-').replaceAll('-', '/')
  }

  const handleClickComment = () => {navigate('/post/' + data?._id, {replace: true})}

  const handleGoToProfile = () => {navigate('/profil/' + data?.posterId)}

  return (
    <Panel noShadows className='post-container'>
      {
        loading
        ?
        <Spinner />
        :
        <>
          <div id='post-top'>
            <span
              id='post-author'
              onClick={handleGoToProfile}
            >
              {user?.pseudo}
            </span>
            <span id='post-message'>{data?.text}</span>
            {
              data?.picture &&
              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <Image src={data?.picture} />
              </div>
            }
          </div>
          <Separator />
          <div id='post-bottom'>
            <span id='post-date'>{parseDate(data?.date)}</span>
            {
              !isComment &&
              <div id='post-parts'>
                <div className='bottom-part'>
                  <Icon
                    disabled={!userId}
                    src={localLiked ? fullLikeSvg : likeSvg}
                    onClick={handleHeartCliked}
                  />
                  <span>{
                    data?.likers?.length +
                    ((!isLiked && localLiked) ? 1 : 0) +
                    ((isLiked && !localLiked) ? -1 : 0)
                  }</span>
                </div>
                {
                  !isMain &&
                  <div className='bottom-part'>
                    <Icon src={commentSvg} onClick={handleClickComment} />
                    <span>{data?.comment?.length}</span>
                  </div>
                }
                {
                  isSelf &&
                  <Icon src={deleteSvg} onClick={deletePostCall} />
                }
              </div>
            }
            {
              isComment && isSelf &&
              <Icon src={deleteSvg} onClick={deleteComCall} />
            }
          </div>
        </>
      }
    </Panel>
  )
}

export default Post