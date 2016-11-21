import GestureRecognizer from './GestureRecognizer'
import Touch from '../Touch'
import { pointMake } from '../Shortcuts'

export default class PanGestureRecognizer extends GestureRecognizer {
  action = null
  view = null
  translation = {
    x: 0,
    y: 0
  }
  velocity = {
    x: 0,
    y: 0
  }

  setTranslation(translation) {
    this.translation = translation
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

    if (this.translation.x == 0 && this.translation.y == 0) {
      this.setTranslation(pointMake(
        curLocation.x - prevLocation.x,
        curLocation.y - prevLocation.y
      ))
    } else {
      this.setTranslation(pointMake(
        e.pageX - touch.originalLocation().x,
        e.pageY - touch.originalLocation().y
      ))
    }

    this.velocity = pointMake(
      (curLocation.x - prevLocation.x) / (curLocation.t - prevLocation.t) * 1000,
      (curLocation.y - prevLocation.y) / (curLocation.t - prevLocation.t) * 1000
    )
  }

  ended(e) {
    // this.moved(e)
  }

  estimate() {
    return this.rads.reduce((a, v) => a += v / this.rads.length, 0) < .5
  }
}
