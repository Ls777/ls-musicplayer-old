import React, { useEffect } from 'react'
import './App.css'
import FrontEnd from './FrontEnd'
import { useAction } from 'easy-peasy'

const App = () => {
  const initialize = useAction(dispatch => dispatch.player.fetchStoredQueue)
  useEffect(() => initialize(), [])
  return <FrontEnd />
}

export default App
