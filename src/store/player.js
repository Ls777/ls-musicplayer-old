import { Howl, Howler } from 'howler'
import { select, effect } from 'easy-peasy'

import audioPlayer from '../audioPlayer'

const audio = new audioPlayer()

export default {
  isPlaying: false,
  queue: [],

  currentTrack: {
    src: ['./m/06 - Sunshine Recorder.mp3']
  },
  nextTrack: {
    src: ['./m/07 - In the Annexe.mp3']
  },
  setQueue: (state, payload) => {
    state.queue = payload
  },

  playold: (state, payload) => {
    audio.setSound({
      src: ['./m/07 - In the Annexe.mp3']
    })

    audio.sound.play()

    return state
  },
  test: (state, payload) => {
    state.isPlaying = !state.isPlaying
  },

  play: effect(async (dispatch, payload, getState) => {
    if (getState().player.currentTrack && !getState().player.isPlaying) {
      audio.sound.play()
    }
  })
}
