import {useEffect} from 'react'

import './HomePage.scss'
import Post from 'components/Post/Post'
import Spinner from 'components/Spinner/Spinner'
import useAxios from 'hooks/useAxios'
import getPosts from 'API/getPosts'

const HomePage = () => {

  const {loading, data: posts, call} = useAxios(
    getPosts.method,
    getPosts.url
  )

  useEffect(call, [])

  return (
    <div id='home-page-container'>
      {
        loading
        ?
        <Spinner size='large' />
        :
        posts?.reverse()?.map((post, i) => (
          <Post refreshCall={call} key={i} data={post} />
        ))
      }
    </div>
  )
}

export default HomePage