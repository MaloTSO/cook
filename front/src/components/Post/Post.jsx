import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import {AppContext} from 'components/Router/Router'
import './Post.scss'
import commentSvg from 'assets/icons/comment.svg'
import likeSvg from 'assets/icons/like.svg'
import Panel from 'components/Panel/Panel'
import Icon from 'components/Icon/Icon'

const Post = ({data, isComment}) => {

  const {userId} = useContext(AppContext)

  const navigate = useNavigate()

  const [user, setUser] = useState()
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    setIsLiked(data?.likers?.includes(userId))

    axios.get(`api/user/${data.posterId}`)
      .then((res) => {setUser(res?.data)})
      .catch(() => {console.log('error sur le get d\'un id')})
  }, [])

  const parseDate = (date) => {
    return date?.substring(0, date?.indexOf('T'))?.replaceAll('-', '/')?.split('/').reverse().join('/')
  }

  const handleLike = () => {
    axios.patch(
      `api/post/${(isLiked ? 'unlike' : 'like')}/${data?._id}`,
      {id: userId}
    )
      .catch((err) => console.log('error liking/unliking a post:', err))
  }

  const handleClickComment = () => {navigate('/' + data?._id, {replace: true})}

  return (
    <Panel noShadows className='post-container'>
      <div id='post-top'>
        <span id='post-author'>{user?.pseudo}</span>
        <span>{parseDate(data?.date)}</span>
      </div>
      <span id='post-message'>{data?.text}</span>
      <div id='post-bottom'>
        <div className={'bottom-part' + (isLiked ? ' liked' : '')}>
          <Icon disabled={!userId} src={likeSvg} onClick={handleLike} />
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
    </Panel>
  )
}

export default Post