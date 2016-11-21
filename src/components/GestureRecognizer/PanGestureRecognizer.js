import GestureRecognizer from './GestureRecognizer'
import Touch from '../Touch'
import { pointMake, first, size } from '../Shortcuts'

export default class PanGestureRecognizer extends GestureRecognizer {
  translation = pointMake(0, 0)
  velocity = pointMake(0, 0)

  setTranslation(translation) {
    this.translation = translation
  }

  began(e) {
    let touch = new Touch()
    touch.gestureRecognizers.push(this)
    this.touches = [touch]
    this.numberOfTouches = 1
    this.moved(e)
  }

  moved(e) {
    let touch = first(this.touches)
    touch.update(e)

    if (size(touch.locations) <= 1) return

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
    this.touches[0].leave()
    this.numberOfTouches = 0
    // this.moved(e)
  }

  estimate() {
    return this.rads.reduce((a, v) => a += v / size(this.rads), 0) < .5
  }
}
