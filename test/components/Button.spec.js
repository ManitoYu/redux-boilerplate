import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'

import Button from '../../src/components/Button'

describe('Button', () => {
  it('should alert', () => {
    let button = shallow(<Button>click</Button>)
    button.simulate('click')
  })
})
