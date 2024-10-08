'use client'

import { useContext, useEffect } from 'react'

import { Socket } from 'socket.io-client'

import { SocketContext } from '@/utils/context/socket.context'
import { VesselsContext } from '@/utils/context/vessels.context'
import { useTracker } from '@/utils/hooks/use-tracker'
import { getSocket } from '@/utils/socket'
import { CurrentVesselInformationPayload, WEBSOCKET_EVENTS } from '@/utils/types'

interface WebsocketComponentProps {
  children: React.ReactNode
}

export default function WebsocketComponent({ children }: WebsocketComponentProps) {
  const socket: Socket = getSocket()
  const { connect, disconnect } = useContext(SocketContext)
  const { initialiseVesselData, upsertVesselData, vessels } = useContext(VesselsContext)
  const { updateLastReceivedTimestamp } = useTracker()
  
  useEffect(() => {
    const handleConnect = () => {
      connect()
      console.log('connected to server, socketId: ', socket.id)
    }

    const handleDisconnect = () => {
      disconnect()
      console.log('disconnected from server')
    }

    const handleCurrentVesselInformationEvent = (message: CurrentVesselInformationPayload) => {
      console.info('handleCurrentVesselInformationEvent received message', message)
      initialiseVesselData(message.data)
      updateLastReceivedTimestamp(Date.now())
    }

    const handleLatestVesselInformationEvent = (data: any) => {
      console.info('handleLatestVesselInformationEvent received message', data, 'at', new Date().toString())
      upsertVesselData(data)
      updateLastReceivedTimestamp(Date.now())
    }

    const handleConnectionError = (error: any) => {
      console.error({ message: 'Connection failed:', error: error.message })

      let errorMessage = `Failed to connect to server: ${error.message}`
      if (error.data && error.data.code) {
        errorMessage += ` (Code: ${error.data.code})`
      }
      if (error.data && error.data.message) {
        errorMessage += ` (Reason: ${error.data.message})`
      }

      disconnect()
    }

    // Attach listeners
    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('connect_error', handleConnectionError)
    socket.on('connect_timeout', handleConnectionError)
    socket.on(WEBSOCKET_EVENTS.CURRENT, handleCurrentVesselInformationEvent)
    socket.on(WEBSOCKET_EVENTS.LATEST, handleLatestVesselInformationEvent)

    // Cleanup listeners on component unmount
    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('connect_error', handleConnectionError)
      socket.off('connect_timeout', handleConnectionError)
      socket.off(WEBSOCKET_EVENTS.CURRENT, handleCurrentVesselInformationEvent)
      socket.off(WEBSOCKET_EVENTS.LATEST, handleLatestVesselInformationEvent)
    }
  }, [
    connect,
    disconnect,
    initialiseVesselData,
    socket,
    updateLastReceivedTimestamp,
    upsertVesselData
  ])

  return <>{children}</>
}