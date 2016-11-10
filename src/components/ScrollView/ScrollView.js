import React, { PropTypes } from 'react'
import classnames from 'classnames'
import ReactDOM from 'react-dom'
import { lazyInitialize } from 'core-decorators'
import View from '../View'
import { sizeMake, pointMake, edgeInsetsMake, pointZero } from '../Shortcuts'
import { PanGestureRecognizer } from '../GestureRecognizer'
import { GestureRecognizerStateEnded } from '../GestureRecognizer/constants'

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
      0,
      this.props.contentSize.height - this.props.height
    )
  }

  /**
   * @access private
   */
  _handlePan(g) {
    const { contentOffset, maxContentOffset, _contentDOMNode } = this

    // next translation
    let offset = pointMake(
      contentOffset.x - g.translation.x,
      contentOffset.y - g.translation.y
    )

    // make each translation relative to last translation
    g.setTranslation(pointZero())

    // over max content offset
    _contentDOMNode.classList.remove('is-animated')


    if (offset.y - maxContentOffset.y > 0) {
      _contentDOMNode.style.bottom = offset.y - maxContentOffset.y + 'px'
    }

    if (offset.y < 0) {
      _contentDOMNode.style.top = -offset.y + 'px'
    }

    // stop gesture
    if (g.gestureState & GestureRecognizerStateEnded) {
      // add bounce effect
      _contentDOMNode.classList.add('is-animated')

      if (offset.y - maxContentOffset.y > 0) {
        _contentDOMNode.style.bottom = 0

        // set offset to max content offset
        offset.y = maxContentOffset.y
      }

      if (offset.y < 0) {
        _contentDOMNode.style.top = 0

        // set offset to zero
        offset.y = 0
      }
    }

    this.setContentOffset(offset)
  }

  componentWillUpdate() {
    this._initMaxContentOffset()
  }

  handleScroll(e) {
    if (! this.props.isScrollEnabled) return
    this.contentOffset.y = e.nativeEvent.target.scrollTop
    this.props.delegate.scrollViewDidScroll(this)
  }

  setContentOffset(contentOffset) {
    ReactDOM.findDOMNode(this).scrollTop = contentOffset.y
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
