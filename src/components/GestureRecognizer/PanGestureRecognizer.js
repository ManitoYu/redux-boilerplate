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
    this.numberOfTouches.push(new Touch())
    this.moved(e)
  }

  moved(e) {
    let touch = this.numberOfTouches[0]
    touch.update(e)

    this.translation = {
      x: e.pageX - touch.originalLocation().x,
      y: e.pageY - touch.originalLocation().y
    }

    if (touch.locations.length > 1) {
      let prevLocation = touch.previousLocation()
      let curLocation = touch.location()

      this.velocity = {
        x: (curLocation.x - prevLocation.x) / (curLocation.t - prevLocation.t),
        y: (curLocation.y - prevLocation.y) / (curLocation.t - prevLocation.t)
      }
    }

    if (this.evaluate()) this.action(this)
  }

  ended(e) {
    this.moved(e)
    this.action(this)
    this.numberOfTouches.pop()
  }
}
