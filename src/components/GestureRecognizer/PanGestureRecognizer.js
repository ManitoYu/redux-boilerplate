import GestureRecognizer from './GestureRecognizer'
import Touch from '../Touch'

export default class PanGestureRecognizer extends GestureRecognizer {
  constructor(action) {
    super()

    this.action = action
    this.view = null
    this.translation = {
      x: 0,
      y: 0
    }
    this.velocity = {
      x: 0,
      y: 0
    }
  }

  began(e) {
    this.numberOfTouches = [new Touch()]
    this.moved(e)
  }

  moved(e) {
    let touch = this.numberOfTouches[0]
    touch.update(e)

    if (touch.locations.length <= 1) return

    let prevLocation = touch.previousLocation()
    let curLocation = touch.location()

    this.translation = {
      x: e.pageX - touch.originalLocation().x,
      y: e.pageY - touch.originalLocation().y
    }

    this.velocity = {
      x: (curLocation.x - prevLocation.x) / (curLocation.t - prevLocation.t),
      y: (curLocation.y - prevLocation.y) / (curLocation.t - prevLocation.t)
    }
  }

  ended(e) {
    this.moved(e)
  }

  estimate() {
    return this.rads.reduce((a, v) => a += v / this.rads.length, 0) < .5
  }
}
