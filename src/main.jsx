import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './App.jsx'
import './index.css'

import { data } from "./data.js"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root data={data} />
  </React.StrictMode>,
)

