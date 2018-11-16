import { createStore } from 'easy-peasy'
import player from './player'

// Sound objects can't be held in the redux store, so injected
const howls = {}

export default createStore({ temp: 'doh', player }, { injections: { howls } })
