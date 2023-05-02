import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import Router from 'components/Router/Router'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)