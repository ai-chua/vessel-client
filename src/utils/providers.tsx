'use client'

import * as React from 'react'

import { NextUIProvider } from '@nextui-org/react'

import { SocketContextProvider } from './context/socket.context'
import { TrackerContextProvider } from './context/tracker.context'
import { VesselsContextProvider } from './context/vessels.context'

import WebsocketComponent from '@/components/websocket.component'

export default function Providers({ children }:{children: React.ReactNode}) {

  return (
    <NextUIProvider>
      <SocketContextProvider>
        <VesselsContextProvider>
          <TrackerContextProvider>
            <WebsocketComponent>
              {children}
            </WebsocketComponent>
          </TrackerContextProvider>
        </VesselsContextProvider>
      </SocketContextProvider>
    </NextUIProvider>
  )
}