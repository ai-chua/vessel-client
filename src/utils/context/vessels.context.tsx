'use client'

import React, { createContext, useState } from 'react'

import { VesselInformation } from '../types'

export type VesselsData = Record<string, VesselInformation>

export type VesselsContextProps = {
  vessels: VesselsData,
  upsertVesselData: (data: VesselInformation) => void
}

export const VesselsContext = createContext<VesselsContextProps>({
  vessels: {},
  upsertVesselData: (data: VesselInformation) => null
})

export const VesselsContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [vesselsData, setVesselsData] = useState<VesselsData>({})

  function upsertVesselData(data: VesselInformation) {
    setVesselsData(prevData => ({
      ...prevData,
      [data.imo]: data
    }))
  }

  return (
    <VesselsContext.Provider
      value={{
        vessels: vesselsData,
        upsertVesselData: upsertVesselData 
      }}
    >
      {children}
    </VesselsContext.Provider>
  )
}
