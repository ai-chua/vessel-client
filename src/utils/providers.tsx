import * as React from 'react'

import { NextUIProvider } from '@nextui-org/react'

import { SocketContextProvider } from './context/socket.context'
import { TrackerContextProvider } from './context/tracker.context'
import { VesselsContextProvider } from './context/vessels.context'

export default function Providers({ children }:{children: React.ReactNode}) {

  return (
    <NextUIProvider>
      <SocketContextProvider>
        <VesselsContextProvider>
          <TrackerContextProvider>
          {children}
          </TrackerContextProvider>
        </VesselsContextProvider>
      </SocketContextProvider>
    </NextUIProvider>
  )
}