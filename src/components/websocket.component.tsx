'use client'

import { useContext, useEffect } from 'react'

import { Socket } from 'socket.io-client'

import { SocketContext } from '@/utils/context/socket.context'
import { getSocket } from '@/utils/socket'

export default function WebsocketComponent({ children }: {
  children: React.ReactNode
}) {
  const socket: Socket = getSocket()
  const { connect } = useContext(SocketContext)
  
  useEffect(() => {
    const handleConnect = () => {
      connect()
      console.log('connected to server, socketId: ', socket.id)
    }

    const handleDisconnect = () => {
      console.log('disconnected from server')
    }

    // Attach listeners
    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)

    // Cleanup listeners on component unmount
    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
    }
  }, [connect, socket])

  return <>{children}</>
}