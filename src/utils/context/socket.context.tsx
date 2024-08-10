'use client'

import React, { createContext, useState } from 'react'

export interface SocketContextProps {
  isConnected: boolean
  connect: () => void
  disconnect: () => void
}

export const SocketContext = createContext<SocketContextProps>({
  isConnected: false,
  connect: () => null,
  disconnect: () => null
})

export const SocketContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false)

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        connect: () => {
          setIsConnected(true)
        },
        disconnect: () => {
          setIsConnected(false)
        }
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}