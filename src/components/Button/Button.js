import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Control from '../Control'
import ImageView from '../ImageView'
import Label from '../Label'
import { first } from '../Shortcuts'
import { ImageViewContentModeCover } from '../ImageView/constants'

export default class Button extends Control {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string
  }

  _handleChildrenIsArray() {
    const { children, state } = this.props
    if (children.every(c => c.type == Button)) {
      let button = first(children.filter(b => b.props.state == state))
      return [
        button.props.image &&
          <ImageView
            image={button.props.image}
            key={0}
            contentMode={ImageViewContentModeCover}
            width={20}
            height={20} />,
        button.props.title &&
          <Label key={1}>{button.props.title}</Label>
      ]
    } else {
      return children
    }
  }

  _handleChildrenIsString() {
    const { children } = this.props
    return <Label>{children}</Label>
  }

  _handleChildrenIsUndefined() {
    const { image, title } = this.props
    return [
      image &&
        <ImageView
          image={image}
          key={0}
          contentMode={ImageViewContentModeCover}
          width={40}
          height={40} />,
      title &&
        <Label key={1}>{title}</Label>
    ]
  }

  render() {
    const { children, onClick, style, className } = this.props

    let contentView = null

    if (children instanceof Array)
      contentView = this._handleChildrenIsArray()

    if (typeof children == 'string')
      contentView = this._handleChildrenIsString()

    if (typeof children == 'undefined')
      contentView = this._handleChildrenIsUndefined()

    return (
      <Control
        {...this.props}
        className={classnames('Button', className)}
        style={style}
        onClick={onClick}>
        {contentView}
      </Control>
    )
  }
}
