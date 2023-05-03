import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'

import './Post.scss'
import commentSvg from 'assets/icons/comment.svg'
import likeSvg from 'assets/icons/like.svg'
import fullLikeSvg from 'assets/icons/fullLike.svg'
import Panel from 'components/Panel/Panel'
import Icon from 'components/Icon/Icon'
import Separator from 'components/Separator/Separator'
import useAuth from 'hooks/useAuth'
import useAxios from 'hooks/useAxios'
import getUserByPosterId from 'API/getUserByPosterId'
import patchLikeUnlike from 'API/patchLikeUnlike'

const Post = ({data, isComment}) => {

  const {userId} = useAuth()

  const navigate = useNavigate()

  const isLiked = data?.likers?.includes(userId)

  const {loading: getUserLoading, data: user, call: getUserCall} = useAxios(
    getUserByPosterId.method,
    getUserByPosterId.url + data.posterId
  )

  const {call: likeUnlikeCall} = useAxios(
    patchLikeUnlike.method,
    `${patchLikeUnlike.url}${(isLiked ? 'unlike' : 'like')}/${data?._id}`,
    {id: userId}
  )

  useEffect(() => {getUserCall()}, [])

  const parseDate = (date) => {
    let day = date.split('T')[0].split('-').reverse().join('-').replaceAll('-', '/')
    let time = date.split('T')[1].substring(0, 5)

    return `${time} - ${day}`
  }

  const handleClickComment = () => {navigate('/' + data?._id, {replace: true})}

  return (
    <Panel noShadows className='post-container'>
      <div id='post-top'>
        <span id='post-author'>{user?.pseudo}</span>
        <span id='post-message'>{data?.text}</span>
      </div>
      <Separator />
      <div id='post-bottom'>
        <span id='post-date'>{parseDate(data?.date)}</span>
        <div id='post-parts'>
          <div className='bottom-part'>
            <Icon
              disabled={!userId}
              src={isLiked ? fullLikeSvg : likeSvg}
              onClick={likeUnlikeCall}
            />
            <span>{data?.likers?.length}</span>
          </div>
          {
            !isComment &&
            <div className='bottom-part'>
              <Icon src={commentSvg} onClick={handleClickComment} />
              <span>{data?.comment?.length}</span>
            </div>
          }
        </div>
      </div>
    </Panel>
  )
}

export default Post