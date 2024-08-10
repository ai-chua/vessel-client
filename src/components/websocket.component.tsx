'use client'

import { useContext, useEffect } from 'react'

import { Socket } from 'socket.io-client'

import { SocketContext } from '@/utils/context/socket.context'
import { VesselsContext } from '@/utils/context/vessels.context'
import { getSocket } from '@/utils/socket'
import { CurrentVesselInformationPayload, WEBSOCKET_EVENTS } from '@/utils/types'

export default function WebsocketComponent({ children }: {
  children: React.ReactNode
}) {
  const socket: Socket = getSocket()
  const { connect } = useContext(SocketContext)
  const { initialiseVesselData } = useContext(VesselsContext)
  
  useEffect(() => {
    const handleConnect = () => {
      connect()
      console.log('connected to server, socketId: ', socket.id)
    }

    const handleDisconnect = () => {
      console.log('disconnected from server')
    }

    const handleReceiveCurrentData = (message: CurrentVesselInformationPayload) => {
      initialiseVesselData(message.data)
    }

    // Attach listeners
    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on(WEBSOCKET_EVENTS.CURRENT, handleReceiveCurrentData)

    // Cleanup listeners on component unmount
    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off(WEBSOCKET_EVENTS.CURRENT, handleReceiveCurrentData)
    }
  }, [connect, initialiseVesselData, socket])

  return <>{children}</>
}