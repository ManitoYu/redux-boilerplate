export default class Touch {
  constructor(options) {
    this.view = null
    this.window = null
    this.timestamp = options.timestamp

    this.locations = []

    this.location = {
      x: 0,
      y: 0
    }
  }

  update(nextProps) {
    this.timestamp = nextProps.timestamp
    this.location.x = nextProps.location.x
    this.location.y = nextProps.location.y
    this.locations.push(Object.assign({}, this.location))
  }

  locationInView(view) {

  }

  previousLocation(view) {

  }
}
