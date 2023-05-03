import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import './PostCreator.scss'
import Panel from 'components/Panel/Panel'
import TextField from 'components/TextField/TextField'
import Button from 'components/Button/Button'
import useAxios from 'hooks/useAxios'
import postPost from 'API/postPost'
import useAuth from 'hooks/useAuth'

const PostCreator = () => {

  const navigate = useNavigate()

  const [content, setContent] = useState('')

  const {userId} = useAuth()

  const {data, call} = useAxios(
    postPost.method,
    postPost.url,
    {posterId: userId, text: content}
  )

  useEffect(() => {if (data) {navigate('/home')}}, [data])

  return (
    <Panel className='post-creator-container'>
      <TextField
        noStyle
        isMultiple
        label='ça raconte quoi de beau ?'
        value={content}
        setter={setContent}
      />
      <Button label='Envoyer' onClick={call} />
    </Panel>
  )
}

export default PostCreator