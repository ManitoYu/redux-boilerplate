import React, { PropTypes } from 'react'
import classnames from 'classnames'
import View from '../View'
import { sizeMake, pointMake } from '../Shortcuts'
import { PanGestureRecognizer } from '../GestureRecognizer'
import ReactDOM from 'react-dom'
import { lazyInitialize } from 'core-decorators'

export default class ScrollView extends View {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isScrollEnabled: PropTypes.bool,
    isPagingEnabled: PropTypes.bool,
    contentSize: PropTypes.object,
    contentOffset: PropTypes.object,
    delegate: PropTypes.object
  }

  static defaultProps = {
    contentSize: sizeMake(0, 0),
    contentOffset: pointMake(0, 0)
  }

  contentOffset = pointMake(0, 0)
  @lazyInitialize panGestureRecognizer = (
    <PanGestureRecognizer action={this.handlePan.bind(this)}/>
  )

  handlePan(g) {
    this.setContentOffset({
      x: this.contentOffset.x + g.translation.x,
      y: this.contentOffset.y + g.translation.y
    })
  }

  handleScroll(e) {
    this.contentOffset.y = e.nativeEvent.target.scrollTop
    this.props.delegate.scrollViewDidScroll(this)
  }

  setContentOffset(contentOffset) {
    this.contentOffset = contentOffset

    if (this.contentOffset.y) {
      ReactDOM.findDOMNode(this).scrollTop = this.contentOffset.y
    }
  }

  componentDidMount() {
    const { contentOffset } = this.props
    if (contentOffset) this.setContentOffset(contentOffset)
  }

  render() {
    const { children, className, contentSize } = this.props

    return (
      <View
        gestureRecognizers={[this.panGestureRecognizer]}
        className={classnames('ScrollView', className)}
        onScroll={this.handleScroll.bind(this)}
        {...this.props}>
        <View className="ScrollView-contentView" height={contentSize.height}>
        {children}
        </View>
      </View>
    )
  }
}
