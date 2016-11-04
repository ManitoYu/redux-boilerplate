export default class Touch {
  view = null
  window = null
  timestamp = 0
  locations = []

  update(e) {
    this.timestamp = Date.now()
    this.locations.push({
      t: this.timestamp,
      x: e.pageX,
      y: e.pageY
    })
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
