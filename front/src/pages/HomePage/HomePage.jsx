import {useState, useEffect, useContext} from 'react'
import axios from 'axios'

import './HomePage.scss'
import Post from 'components/Post/Post'

const mock = [
  {
      "_id": "6451472be93ca7435d036a21",
      "posterId": "6451215281f622c99b8d403b",
      "text": "Let him cook",
      "date": "2023-05-02T17:21:26.133Z",
      "likers": [
          "64511c9701079c5bf7fcdad5"
      ],
      "comment": [],
      "createdAt": "2023-05-02T17:23:55.727Z",
      "updatedAt": "2023-05-02T17:36:43.231Z",
      "__v": 0
  },
  {
      "_id": "64514716e93ca7435d036a1f",
      "posterId": "64511c9701079c5bf7fcdad5",
      "text": "Jsuis dans le front je cook",
      "date": "2023-05-02T17:21:26.133Z",
      "likers": [
          "64511c9701079c5bf7fcdad5"
      ],
      "comment": [],
      "createdAt": "2023-05-02T17:23:34.906Z",
      "updatedAt": "2023-05-02T21:09:05.127Z",
      "__v": 0
  },
  {
      "_id": "64514705e93ca7435d036a1d",
      "posterId": "64511e6dc33fbcc5d7909454",
      "text": "OK dans le baaaaack",
      "date": "2023-05-02T17:21:26.133Z",
      "likers": [],
      "comment": [
          {
              "date": "2023-05-02T22:38:21.432Z",
              "posterId": "6451845dc3fcce3ff720bd71",
              "text": "test commentaire",
              "_id": "64518fe6cd3846a07a682147"
          },
          {
              "posterId": "6451845dc3fcce3ff720bd71",
              "text": "test commentaire",
              "date": "2023-05-02T22:35:37.483Z",
              "_id": "645190507cb5a3f0a4aa5882"
          },
          {
              "posterId": "64511e6dc33fbcc5d7909454",
              "text": "test commentaire 2 ",
              "date": "2023-05-02T22:35:37.483Z",
              "_id": "645190987cb5a3f0a4aa5891"
          },
          {
              "posterId": "64511e6dc33fbcc5d7909454",
              "text": "test commentaire 3 ",
              "date": "2023-05-02T22:38:39.397Z",
              "_id": "645190ef6e9b90aa8cbbc1b2"
          }
      ],
      "createdAt": "2023-05-02T17:23:17.416Z",
      "updatedAt": "2023-05-02T22:38:39.398Z",
      "__v": 0
  },
  {
      "_id": "645146fee93ca7435d036a1b",
      "posterId": "64511e6dc33fbcc5d7909454",
      "text": "Oe c'est axel",
      "date": "2023-05-02T17:21:26.133Z",
      "likers": [],
      "comment": [],
      "createdAt": "2023-05-02T17:23:10.533Z",
      "updatedAt": "2023-05-02T17:23:10.533Z",
      "__v": 0
  },
  {
      "_id": "645146f1e93ca7435d036a19",
      "posterId": "64511c9701079c5bf7fcdad5",
      "text": "Oe c'est malo",
      "date": "2023-05-02T17:21:26.133Z",
      "likers": [],
      "comment": [],
      "createdAt": "2023-05-02T17:22:57.544Z",
      "updatedAt": "2023-05-02T17:22:57.544Z",
      "__v": 0
  },
  {
      "_id": "645146d6e93ca7435d036a17",
      "posterId": "6451215281f622c99b8d403b",
      "text": "trop bien ce son",
      "date": "2023-05-02T17:21:26.133Z",
      "likers": [],
      "comment": [
          {
              "posterId": "64514c1291bc6386a9af0479",
              "text": "j'aime pas trop perso   ",
              "date": "2023-05-02T22:45:27.365Z",
              "_id": "645192876e9b90aa8cbbc1da"
          },
          {
              "posterId": "64511c9701079c5bf7fcdad5",
              "text": "Ouais incroyable ce son !!",
              "date": "2023-05-02T22:49:37.235Z",
              "_id": "645193816e9b90aa8cbbc200"
          }
      ],
      "createdAt": "2023-05-02T17:22:30.216Z",
      "updatedAt": "2023-05-02T22:49:37.236Z",
      "__v": 0
  }
]

const HomePage = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {getPosts()}, [])

  const getPosts = () => {
    axios.get('api/post/')
      .then((res) => setPosts(res?.data))
      .catch(() => console.log('error sur post'))
  }

  return (
    <div id='home-page-container'>
      {posts?.reverse()?.map((post, i) => (<Post key={i} data={post} />))}
    </div>
  )
}

export default HomePage