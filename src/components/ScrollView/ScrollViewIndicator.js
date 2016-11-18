import React, { PropTypes } from 'react'
import View from '../View'
import {
  ScrollViewIndicatorDirectionVertical,
  ScrollViewIndicatorDirectionHorizontal
} from './constants'
import {
  PanGestureRecognizer
} from '../GestureRecognizer'
import { pointMake, pointZero } from '../Shortcuts'
import ReactDOM from 'react-dom'

export default class ScrollViewIndicator extends View {
  _indicatorLength = 0
  _indicatorDOMNode = null
  _maxOffset = null

  static propTypes = {
    direction: PropTypes.oneOf([
      ScrollViewIndicatorDirectionVertical,
      ScrollViewIndicatorDirectionHorizontal
    ]),
    percent: PropTypes.number,
    onScroll: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      percent: props.percent,
      offset: pointMake(0, 0)
    }
  }

  scrollVertical(g) {
    const { onScroll } = this.props
    const { offset, percent } = this.state
    const { _maxOffset, _indicatorLength } = this

    let nextOffsetY = offset.y + g.translation.y

    if (nextOffsetY > _maxOffset.y) nextOffsetY = _maxOffset.y
    if (nextOffsetY < 0) nextOffsetY = 0

    g.translation.y = -(g.translation.y / _indicatorLength) * (_indicatorLength / (percent / 100))
    onScroll(g)

    this.setState({ offset: pointMake(0, nextOffsetY) })
  }

  scrollHorizontal(g) {
    const { onScroll } = this.props
    const { offset, percent } = this.state
    const { _maxOffset, _indicatorLength } = this

    let nextOffsetX = offset.x + g.translation.x

    if (nextOffsetX > _maxOffset.x) nextOffsetX = _maxOffset.x
    if (nextOffsetX < 0) nextOffsetX = 0

    g.translation.x = -(g.translation.x / _indicatorLength) * (_indicatorLength / (percent / 100))
    onScroll(g)

    this.setState({ offset: pointMake(nextOffsetX, 0) })
  }

  componentDidMount() {
    const { direction, percent } = this.props

    this._indicatorDOMNode = ReactDOM.findDOMNode(this.refs.ScrollViewIndicator)

    if (direction == ScrollViewIndicatorDirectionVertical) {
      this._indicatorLength = this._indicatorDOMNode.clientHeight
      this._maxOffset = pointMake(0, (1 - percent / 100) * this._indicatorLength)
    }

    if (direction == ScrollViewIndicatorDirectionHorizontal) {
      this._indicatorLength = this._indicatorDOMNode.clientWidth
      this._maxOffset = pointMake((1 - percent / 100) * this._indicatorLength, 0)
    }
  }

  render() {
    const { direction } = this.props
    const { percent, offset } = this.state

    if (direction == ScrollViewIndicatorDirectionVertical) {
      return (
        <View
          className="ScrollViewIndicator ScrollViewIndicator--vertical"
          ref="ScrollViewIndicator">
          <View
            {...offset}
            className="ScrollViewIndicator-slider"
            style={{ height: `${percent}%` }}
            gestureRecognizers={[
              <PanGestureRecognizer action={this.scrollVertical.bind(this)} />
            ]} />
        </View>
      )
    }

    if (direction == ScrollViewIndicatorDirectionHorizontal) {
      return (
        <View
          ref="ScrollViewIndicator"
          className="ScrollViewIndicator ScrollViewIndicator--horizontal">
          <View
            {...offset}
            className="ScrollViewIndicator-slider"
            style={{ width: `${percent}%` }}
            gestureRecognizers={[
              <PanGestureRecognizer action={this.scrollHorizontal.bind(this)} />
            ]} />
        </View>
      )
    }
  }
}
