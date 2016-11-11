export default class Touch {
  view = null
  window = null
  timestamp = 0
  locations = []

  update(e) {
    this.timestamp = Date.now()

    switch (true) {
      // mouse
      case e.nativeEvent instanceof MouseEvent:
        this.locations.push({
          t: this.timestamp,
          x: e.pageX,
          y: e.pageY
        })
        break

      // touch
      case e.nativeEvent instanceof TouchEvent:
        this.locations.push({
          t: this.timestamp,
          x: e.nativeEvent.touches[0].pageX,
          y: e.nativeEvent.touches[0].pageY
        })
        break
    }
  }

  location() {
    return this.locations[this.locations.length - 1]
  }

  previousLocation() {
    return this.locations[this.locations.length - 2]
  }

  originalLocation() {
    return this.locations[0]
  }
}
