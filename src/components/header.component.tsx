import { useContext } from 'react'

import { Chip } from '@nextui-org/react'

import { SocketContext } from '@/utils/context/socket.context'

export default function HeaderComponent() {
  const { isConnected } = useContext(SocketContext)

  return (
    <>
      <div>
        Vessels Dashboard
      </div>
      <div>
        Status: {
        isConnected ? (
          <Chip size="sm" color="success">Online</Chip>
          ) : (
          <Chip size="sm" color="default">Offline</Chip>
          )
        }
      </div>
    </>
  )
}