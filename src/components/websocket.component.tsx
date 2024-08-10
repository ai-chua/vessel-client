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
  const { initialiseVesselData, upsertVesselData } = useContext(VesselsContext)
  
  useEffect(() => {
    const handleConnect = () => {
      connect()
      console.log('connected to server, socketId: ', socket.id)
    }

    const handleDisconnect = () => {
      console.log('disconnected from server')
    }

    const handleReceiveCurrentDataEvent = (message: CurrentVesselInformationPayload) => {
      initialiseVesselData(message.data)
    }

    const handleLatestVesselInformationEvent = (data: any) => {
      upsertVesselData(data)
    }

    // Attach listeners
    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on(WEBSOCKET_EVENTS.CURRENT, handleReceiveCurrentDataEvent)
    socket.on(WEBSOCKET_EVENTS.LATEST, handleLatestVesselInformationEvent)

    // Cleanup listeners on component unmount
    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off(WEBSOCKET_EVENTS.CURRENT, handleReceiveCurrentDataEvent)
      socket.off(WEBSOCKET_EVENTS.LATEST, handleLatestVesselInformationEvent)
    }
  }, [connect, initialiseVesselData, socket, upsertVesselData])

  return <>{children}</>
}