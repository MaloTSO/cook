import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import addComment from 'API/addComment'
import './PostCreator.scss'
import Panel from 'components/Panel/Panel'
import Image from 'components/Image/Image'
import TextField from 'components/TextField/TextField'
import Spinner from 'components/Spinner/Spinner'
import Button from 'components/Button/Button'
import useAxios from 'hooks/useAxios'
import postPost from 'API/postPost'
import useAuth from 'hooks/useAuth'

const PostCreator = ({postId, refreshCall}) => {

  const navigate = useNavigate()

  const [content, setContent] = useState('')
  const [file, setFile] = useState()

  const {userId} = useAuth()

  const {loading, data, call} = useAxios(
    postPost.method,
    postPost.url,
    {posterId: userId, text: content, picture: file}
  )

  const {loading: commentLoading, data: commentData, call: addCommentCall} = useAxios(
    addComment.method,
    addComment.url + postId,
    {posterId: userId, text: content}
  )

  useEffect(() => {
    if (commentData) {
      refreshCall()
      setContent('')
    }
  }, [commentData])

  useEffect(() => {if (data) {navigate('/home')}}, [data])

  const handleFiles = (e) => {
    let file = e.target.files[0]
    let reader = new FileReader()

    reader.onloadend = () => {setFile(reader.result)}
    reader.readAsDataURL(file)
  }

  return (
    <Panel className={'post-creator-container' + (postId ? ' comment' : '')}>
      <TextField
        noStyle
        isMultiple
        label='Que veux-tu nous partager de bon ?'
        value={content}
        setter={setContent}
      />
      {
        loading
        ?
        <Spinner />
        :
        <>
          {!postId && <input onChange={handleFiles} type='file' />}
          {file && <Image src={file} />}
          <Button label='Envoyer' onClick={postId ? addCommentCall : call} />
        </>
      }
    </Panel>
  )
}

export default PostCreator