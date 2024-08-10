'use client'

import { createContext, useCallback, useContext, useState } from 'react'

import { VesselInformation } from '../types'

import { VesselsContext } from './vessels.context'

export type TrackerContextProps = {
  trackedVessels: VesselInformation['imo'][],
  trackVessel: (imo: VesselInformation['imo']) => void,
}

export const TrackerContext = createContext<TrackerContextProps>({
  trackedVessels: [],
  trackVessel: (imo: VesselInformation['imo']) => null
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
  }, [])

  return (
    <TrackerContext.Provider
      value={{
        trackVessel,
        trackedVessels
      }}
    >
      {children}
    </TrackerContext.Provider>
  )
}