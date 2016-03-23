import React from 'react'
import { createDevTools } from 'redux-devtools'
import ChartMonitor from 'redux-devtools-chart-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export default createDevTools(
  <DockMonitor toggleVisibilityKey="alt-1" changePositionKey="alt-2">
    <ChartMonitor theme='tomorrow' />
  </DockMonitor>
)
