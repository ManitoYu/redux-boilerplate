import GestureRecognizer from './GestureRecognizer'
import Touch from '../Touch'
import { first, size } from '../Shortcuts'

export default class TapGestureRecognizer extends GestureRecognizer {
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
  }

  ended(e) {
    first(this.touches).leave()
    this.numberOfTouches = 0
    // this.moved(e)
  }

  estimate() {
    return size(this.rads) == 0
  }
}
