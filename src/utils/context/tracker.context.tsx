'use client'

import { createContext, useCallback, useState } from 'react'

import { VesselInformation } from '../types'

export type TrackerContextProps = {
  trackedVessels: VesselInformation['imo'][],
  trackVessel: (imo: VesselInformation['imo']) => void,
  untrackVessel: (imo: VesselInformation['imo']) => void
}

export const TrackerContext = createContext<TrackerContextProps>({
  trackedVessels: [],
  trackVessel: (imo: VesselInformation['imo']) => null,
  untrackVessel: (imo: VesselInformation['imo']) => null
})

export const TrackerContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [trackedVessels, setTrackedVessels] = useState<VesselInformation['imo'][]>([])

  const trackVessel = useCallback((imo: VesselInformation['imo']) => {
    setTrackedVessels(prevTracked => {
      if (!prevTracked.includes(imo)) {
        return [...prevTracked, imo]
      }
      return prevTracked
    })

    console.log('Added', imo, 'to trackedVessels in context')
  }, [])

  const untrackVessel = useCallback((imo: VesselInformation['imo']) => {
    setTrackedVessels(prevTracked => prevTracked.filter(trackedImo => trackedImo !== imo))
    console.log('Removed', imo, 'from trackedVessels in context')
  }, [])

  return (
    <TrackerContext.Provider
      value={{
        trackVessel,
        trackedVessels,
        untrackVessel
      }}
    >
      {children}
    </TrackerContext.Provider>
  )
}