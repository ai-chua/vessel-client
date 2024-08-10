'use client'

import React, { createContext, useState } from 'react'

import { UpdatedVesselInformation } from '../types'

export type VesselsData = Record<string, UpdatedVesselInformation>

export type VesselsContextProps = {
  vessels: VesselsData,
  upsertVesselData: (data: UpdatedVesselInformation) => void
}

export const VesselsContext = createContext<VesselsContextProps>({
  vessels: {},
  upsertVesselData: (data: UpdatedVesselInformation) => null
})

export const VesselsContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [vesselsData, setVesselsData] = useState<VesselsData>({})

  function upsertVesselData(data: UpdatedVesselInformation) {
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
