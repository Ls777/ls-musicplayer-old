import { Howl, Howler } from 'howler'

export default class Player {
  constructor () {
    this.currentSound = null
    this.nextSound = null
  }

  get sound () {
    return this.currentSound
  }

  setSound (sound) {
    if (sound) {
      this.currentSound = new Howl(sound)
    }
  }
}
