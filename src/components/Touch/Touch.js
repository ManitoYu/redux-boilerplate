export default class Touch {
  constructor(options) {
    this.view = null
    this.window = null
    this.timestamp = options.timestamp

    this.locations = []
  }

  update(nextProps) {
    this.timestamp = nextProps.timestamp
    this.locations.push(nextProps.location)
  }

  locationInView(view) {
    return this.location[this.locations.length - 1]
  }

  previousLocation(view) {
    return this.locations[this.locations.length - 2]
  }
}
