import React from 'react'
import { useStore, useAction } from 'easy-peasy'

export default () => {
  const { isPlaying, queue, queuePos } = useStore(state => state.player)
  const { play, pause, next, prev, skipTo } = useAction(
    dispatch => dispatch.player
  )
  return (
    <div>
      <h3>Queue</h3>
      <ul>
        {queue.map((item, idx) => (
          <li onDoubleClick={() => skipTo(idx)}>
            {item.src + (idx === queuePos ? ' -- now playing!' : '')}
          </li>
        ))}
      </ul>
      <h3>player</h3>
      <div>{isPlaying ? 'yes' : 'no'}</div>
      <input id='slide' type='range' min='0' max='100' step='1' />
      <button onClick={() => prev()}>prev</button>
      <button onClick={isPlaying ? () => pause() : () => play()}>
        {isPlaying ? 'pause' : 'play'}
      </button>
      <button onClick={() => next()}>next</button>
    </div>
  )
}
