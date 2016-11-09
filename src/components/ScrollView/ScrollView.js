import React, { PropTypes } from 'react'
import classnames from 'classnames'
import View from '../View'
import { sizeMake, pointMake, edgeInsetsMake, pointZero } from '../Shortcuts'
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
    contentInset: PropTypes.object,
    delegate: PropTypes.object,
    bounces: PropTypes.bool
  }

  static defaultProps = {
    bounces: true,
    isScrollEnabled: true,
    contentSize: sizeMake(0, 0),
    contentInset: edgeInsetsMake(0, 0, 0, 0)
  }

  contentOffset = pointMake(0, 0)

  @lazyInitialize panGestureRecognizer = (
    <PanGestureRecognizer action={this.handlePan.bind(this)}/>
  )

  handlePan(g) {
    this.setContentOffset(pointMake(
      this.contentOffset.x + g.translation.x,
      this.contentOffset.y + g.translation.y
    ))
    g.setTranslation(pointZero())
  }

  handleScroll(e) {
    if (! this.props.isScrollEnabled) return
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
    const { children, className, contentSize, contentInset } = this.props

    const style = {}

    if (contentInset.top) style.paddingTop = contentInset.top
    if (contentInset.right) style.paddingRight = contentInset.right
    if (contentInset.bottom) style.paddingBottom = contentInset.bottom
    if (contentInset.left) style.paddingLeft = contentInset.left

    return (
      <View
        gestureRecognizers={[this.panGestureRecognizer]}
        className={classnames('ScrollView', className)}
        onScroll={this.handleScroll.bind(this)}
        clipsToBounds={! this.props.isScrollEnabled}
        style={style}
        {...this.props}>
        <View className="ScrollView-contentView" height={contentSize.height} ref="content">
        {children}
        </View>
      </View>
    )
  }
}
