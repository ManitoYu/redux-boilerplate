import jsdom from 'jsdom'

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
const win = doc.defaultView

global.document = doc
global.window = win

import '../src/components/Button/Button.spec.js'
import '../src/components/Card/Card.spec.js'
