import React from 'react'
import { useStore, useAction } from 'easy-peasy'

export default () => {
  const player = useStore(state => state.player)
  const play = useAction(dispatch => dispatch.player.play)
  return (
    <div>
      <h3>playlist</h3>
      <ul>
        <li>song 1</li>
        <li>song 2</li>
      </ul>
      <h3>player</h3>
      <div>{player.isPlaying ? 'yes' : 'no'}</div>
      <input id='slide' type='range' min='0' max='100' step='1' />
      <button>prev</button>
      <button onClick={play}>pause</button>
      <button>next</button>
    </div>
  )
}
