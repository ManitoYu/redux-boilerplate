import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Control from '../Control'
import ImageView from '../ImageView'
import Label from '../Label'
import { first } from '../Shortcuts'
import { ImageViewContentModeCover } from '../ImageView/constants'

export default class Button extends Control {
  static defaultProps = {
    enabled: true
  }

  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
    enabled: PropTypes.bool
  }

  render() {
    const { children, onClick, style, className, enabled, state } = this.props

    let contentView = null

    if (children instanceof Array) {
      if (children.every(c => c.type == Button)) {
        let button = first(children.filter(b => b.props.state == state))
        contentView = [
          button.props.image &&
            <ImageView
              image={button.props.image}
              key={0}
              contentMode={ImageViewContentModeCover}
              width={20}
              height={20} />,
          button.props.title && <Label key={1}>{button.props.title}</Label>
        ]
      } else {
        contentView = children
      }
    }

    if (typeof children == 'string') {
      contentView = [
        <Label key={0}>{children}</Label>
      ]
    }

    if (typeof children == 'undefined') {
      contentView = [
        this.props.image &&
          <ImageView
            image={this.props.image}
            key={0}
            contentMode={ImageViewContentModeCover}
            width={40}
            height={40} />,
        this.props.title && <Label key={1}>{this.props.title}</Label>
      ]
    }

    return (
      <Control
        className={classnames('Button', className, { 'is-disabled': ! enabled })}
        style={style}
        onClick={onClick}>
        {contentView}
      </Control>
    )
  }
}
