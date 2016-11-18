import React, { PropTypes } from 'react'
import classnames from 'classnames'
import ReactDOM from 'react-dom'
import { lazyInitialize } from 'core-decorators'
import View from '../View'
import { sizeMake, pointMake, edgeInsetsMake, pointZero } from '../Shortcuts'
import { PanGestureRecognizer } from '../GestureRecognizer'
import { GestureRecognizerStateEnded } from '../GestureRecognizer/constants'
import ScrollViewIndicator from './ScrollViewIndicator'
import {
  ScrollViewIndicatorDirectionVertical,
  ScrollViewIndicatorDirectionHorizontal
} from './constants'

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
    bounces: PropTypes.bool,
    alwaysBounceHorizontal: PropTypes.bool,
    alwaysBounceVertical: PropTypes.bool
  }

  static defaultProps = {
    bounces: true,
    isScrollEnabled: true,
    contentSize: sizeMake(0, 0),
    contentInset: edgeInsetsMake(0, 0, 0, 0),
    bounce: true,
    alwaysBounceHorizontal: true,
    alwaysBounceVertical: true
  }

  contentOffset = pointMake(0, 0)
  maxContentOffset = pointMake(0, 0)
  _contentDOMNode = null

  @lazyInitialize panGestureRecognizer = (
    <PanGestureRecognizer action={this._handlePan.bind(this)}/>
  )

  constructor(props) {
    super(props)

    this._initMaxContentOffset()
  }

  /**
   * @access private
   */
  _initMaxContentOffset() {
    this.maxContentOffset = pointMake(
      this.props.contentSize.width - this.props.width,
      this.props.contentSize.height - this.props.height
    )
    if (this.maxContentOffset.x < 0) this.maxContentOffset.x = 0
    if (this.maxContentOffset.y < 0) this.maxContentOffset.y = 0
  }

  /**
   * @access private
   */
  _handlePan(g) {
    const {
      isPagingEnabled,
      isScrollEnabled,
      height,
      delegate,
      contentSize,
      width,
      bounce,
      alwaysBounceVertical,
      alwaysBounceHorizontal
    } = this.props

    const { contentOffset, maxContentOffset, _contentDOMNode } = this

    if (! isScrollEnabled) return

    /**
     * next translation
     *
     * to top, offset.y will increase
     * to right, offset.x will increase
     * to bottom, offset.y will decrease
     * to left, offset.x will decrease
     */
    let offset = pointMake(
      contentOffset.x - g.translation.x,
      contentOffset.y - g.translation.y
    )

    // make each translation relative to last translation
    g.setTranslation(pointZero())

    // bounce effect
    if (! bounce || ! alwaysBounceHorizontal) {
      if (offset.x < 0) offset.x = 0
      if (offset.x > maxContentOffset.x) offset.x = maxContentOffset.x
    }

    if (! bounce || ! alwaysBounceVertical) {
      if (offset.y < 0) offset.y = 0
      if (offset.y > maxContentOffset.y) offset.y = maxContentOffset.y
    }

    // over max content offset
    _contentDOMNode.classList.remove('is-animated')

    // reset top and bottom
    _contentDOMNode.style.top = ''
    _contentDOMNode.style.bottom = ''
    _contentDOMNode.style.left = ''
    _contentDOMNode.style.right = ''

    // stop gesture
    if (g.gestureState & GestureRecognizerStateEnded) {
      // add bounce effect
      _contentDOMNode.classList.add('is-animated')

      if (contentSize.height > 0) {
        if (offset.y < 0) {
          _contentDOMNode.style.top = 0

          // set offset to zero
          offset.y = 0
        }

        if (offset.y - maxContentOffset.y > 0) {
          _contentDOMNode.style.bottom = 0

          // set offset to max content offset
          offset.y = maxContentOffset.y
        }

        if (isPagingEnabled) {
          offset.y = Math.round(offset.y / height) * height
        }
      }

      if (contentSize.width > 0) {
        if (offset.x < 0) {
          _contentDOMNode.style.left = 0

          // set offset to zero
          offset.x = 0
        }

        if (offset.x - maxContentOffset.x > 0) {
          _contentDOMNode.style.right = 0

          // set offset to max content offset
          offset.x = maxContentOffset.x
        }

        if (isPagingEnabled) {
          offset.x = Math.round(offset.x / width) * width
        }
      }
    }

    this.setContentOffset(offset)

    if (delegate && delegate.scrollViewDidScroll) {
      delegate.scrollViewDidScroll(this)
    }
  }

  componentWillUpdate() {
    this._initMaxContentOffset()
  }

  setContentOffset(contentOffset) {
    if (this.props.contentSize.width) {
      this._contentDOMNode.style.left = `${-contentOffset.x}px`
    }

    if (this.props.contentSize.height) {
      this._contentDOMNode.style.top = `${-contentOffset.y}px`
    }
    // ReactDOM.findDOMNode(this).scrollTop = contentOffset.y
    this.contentOffset = contentOffset
  }

  componentDidMount() {
    const { contentOffset } = this.props

    if (contentOffset) this.setContentOffset(contentOffset)

    this._contentDOMNode = ReactDOM.findDOMNode(this.refs.content)
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
        className={classnames('ScrollView', className)}
        gestureRecognizers={[this.panGestureRecognizer]}
        clipsToBounds={true}
        style={style}
        {...this.props}>
        <View className="ScrollView-contentView" height={contentSize.height} width={contentSize.width} ref="content">
        {children}
        </View>
        {/*}<ScrollViewIndicator
          onScroll={this._handlePan.bind(this)}
          direction={ScrollViewIndicatorDirectionVertical}
          percent={this.props.height / contentSize.height * 100} />
        <ScrollViewIndicator
          onScroll={this._handlePan.bind(this)}
          direction={ScrollViewIndicatorDirectionHorizontal}
          percent={this.props.width / contentSize.width * 100} />*/}
      </View>
    )
  }
}
