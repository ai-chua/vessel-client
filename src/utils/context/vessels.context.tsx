'use client'

import React, { createContext, useCallback, useState } from 'react'

import { UpdatedVesselInformation, VesselInformation } from '../types'

export type VesselsData = Record<VesselInformation['imo'], VesselInformation>

export type VesselsContextProps = {
  initialiseVesselData: (data: VesselInformation[]) => void
  upsertVesselData: (data: UpdatedVesselInformation) => void
  vessels: VesselInformation[],
}

export const VesselsContext = createContext<VesselsContextProps>({
  initialiseVesselData: (data: VesselInformation[]) => null,
  upsertVesselData: (data: UpdatedVesselInformation) => null,
  vessels: []
})

export const VesselsContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [vesselsData, setVesselsData] = useState<VesselsData>({})

  const upsertVesselData = useCallback((data: UpdatedVesselInformation) => {
    setVesselsData(prevData => ({
      ...prevData,
      [data.imo]: { ...prevData[data.imo], ...data }
    }))
  }, [])

  const initialiseVesselData = useCallback((data: VesselInformation[]) => {
    const allVessels: VesselsData = {}

    for (const vessel of data) {
      allVessels[vessel.imo] = vessel
    }

    setVesselsData(allVessels)
  }, [])

  return (
    <VesselsContext.Provider
      value={{
        initialiseVesselData,
        upsertVesselData,
        vessels: Object.values(vesselsData)
      }}
    >
      {children}
    </VesselsContext.Provider>
  )
}
