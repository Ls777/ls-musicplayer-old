import { Howl } from 'howler'
import { select, effect } from 'easy-peasy'
const fs = window.require('fs')
const { promisify } = window.require('util')

const readdir2 = promisify(fs.readdir)

async function readDir (path) {
  let musicFiles
  try {
    const names = await readdir2(path)
    musicFiles = names.filter(item => item.substr(-4) === '.mp3').map(item => ({
      title: item,
      src: path + item
    }))
  } catch (e) {}
  return musicFiles
}

readDir()

fs.readdir('C:/m/Boards of Canada/[2002] Geogaddi', (err, items) => {
  for (var i = 0; i < items.length; i++) {
  }
})

const initQueueTest = [
  { src: 'C:/m//Boards of Canada/[2002] Geogaddi./04 - Gyroscope.mp3' },
  { src: './m/05 - Dandelion.mp3' },
  { src: './m/06 - Sunshine Recorder.mp3' },
  { src: './m/07 - In the Annexe.mp3' }
]

export default {
  isPlaying: false,
  queue: [],
  queuePos: 0,
  queueLoop: false,

  currentTrack: select(state => state.queue[state.queuePos] || null),
  nextTrack: select(state => state.queue[state.queuePos + 1] || null),
  setQueue: (state, payload) => {
    state.queue = payload
  },

  setPlaying: (state, payload) => {
    state.isPlaying = payload
  },

  setQueuePos: (state, payload) => {
    if (payload >= 0 && payload < state.queue.length) {
      state.queuePos = payload
    } else {
      state.queuePos = 0
    }
  },

  play: effect(async (dispatch, payload, getState, { howls }) => {
    if (!getState().player.currentTrack) {
      return
    }

    const src = getState().player.currentTrack.src
    let sound

    if (howls[src]) {
      sound = howls[src]
    } else {
      sound = howls[src] = new Howl({
        src,
        html: true
      })
    }
    sound.play()
    dispatch.player.setPlaying(true)
  }),

  pause: effect(async (dispatch, payload, getState, { howls }) => {
    const src = getState().player.currentTrack.src
    howls[src].pause()
    dispatch.player.setPlaying(false)
  }),

  skipTo: effect(async (dispatch, payload, getState, { howls }) => {
    if (!getState().player.currentTrack) {
      return
    }

    const src = getState().player.currentTrack.src
    if (howls[src]) {
      howls[src].stop()
    }
    dispatch.player.setQueuePos(payload)
    if (getState().player.isPlaying) dispatch.player.play()
  }),

  next: effect(async (dispatch, payload, getState) => {
    dispatch.player.skipTo(getState().player.queuePos + 1)
  }),

  prev: effect(async (dispatch, payload, getState) => {
    dispatch.player.skipTo(getState().player.queuePos - 1)
  }),

  fetchStoredQueue: effect(async (dispatch, payload, getState) => {
    let queue = await readDir('C:/m/Boards of Canada/[1996] Hi Scores/')
    dispatch.player.setQueue(queue)
  })
}
