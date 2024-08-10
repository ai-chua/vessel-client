'use client'

import { io, Socket } from 'socket.io-client'

import { SERVER_PORT } from './consts'

let socket: Socket | null = null

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(`http://localhost:${SERVER_PORT}`, { transports: ['websocket'] })
  }

  return socket
}