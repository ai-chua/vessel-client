'use client'

import { createContext, useCallback, useState } from 'react'

import { VesselInformation } from '../types'

export type TrackerContextProps = {
  trackedVessels: VesselInformation['imo'][],
  queuedForTracking: VesselInformation['imo'][],
  queuedForUntracking: VesselInformation['imo'][],
  trackVessel: (imo: VesselInformation['imo']) => void,
  untrackVessel: (imo: VesselInformation['imo']) => void,
  flushQueue: () => void
}

export const TrackerContext = createContext<TrackerContextProps>({
  trackedVessels: [],
  queuedForTracking: [],
  queuedForUntracking: [],
  trackVessel: (imo: VesselInformation['imo']) => null,
  untrackVessel: (imo: VesselInformation['imo']) => null,
  flushQueue: () => null
})

export const TrackerContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [trackedVessels, setTrackedVessels] = useState<VesselInformation['imo'][]>([])
  const [queuedForTrackingVessels, setQueuedForTrackingVessels] = useState<VesselInformation['imo'][]>([])

  const [queuedForUntrackingVessels, setQueuedForUntrackingVessels] = useState<VesselInformation['imo'][]>([])

  const trackVessel = useCallback((imo: VesselInformation['imo']) => {
    setTrackedVessels(prevTracked => {
      if (!prevTracked.includes(imo)) {
        return [...prevTracked, imo]
      }
      return prevTracked
    })

    setQueuedForTrackingVessels(prevTracked => {
      return [...prevTracked, imo]
    })

    console.log('Added', imo, 'to trackedVessels in context at', new Date().toString())
  }, [])

  const untrackVessel = useCallback((imo: VesselInformation['imo']) => {
    setTrackedVessels(prevTracked => prevTracked.filter(trackedImo => trackedImo !== imo))

    setQueuedForUntrackingVessels(prevTracked => {
      return [...prevTracked, imo]
    })

    console.log('Removed', imo, 'from trackedVessels in context')
  }, [])

  const flushQueue = () => {
    setQueuedForTrackingVessels([])
    setQueuedForUntrackingVessels([])
  }

  return (
    <TrackerContext.Provider
      value={{
        trackVessel,
        trackedVessels,
        untrackVessel,
        queuedForTracking: queuedForTrackingVessels,
        queuedForUntracking: queuedForUntrackingVessels,
        flushQueue
      }}
    >
      {children}
    </TrackerContext.Provider>
  )
}