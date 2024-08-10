'use client'

import React, { createContext, useState } from 'react'

import { UpdatedVesselInformation, VesselInformation } from '../types'

export type VesselsData = Record<VesselInformation['imo'], VesselInformation>

export type VesselsContextProps = {
  vessels: VesselInformation[],
  upsertVesselData: (data: UpdatedVesselInformation) => void
  initialiseVesselData: (data: VesselInformation[]) => void
}

export const VesselsContext = createContext<VesselsContextProps>({
  vessels: [],
  upsertVesselData: (data: UpdatedVesselInformation) => null,
  initialiseVesselData: (data: VesselInformation[]) => null
})

export const VesselsContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [vesselsData, setVesselsData] = useState<VesselsData>({})

  function upsertVesselData(data: UpdatedVesselInformation) {
    console.info('Not implemented yet')
    // setVesselsData(prevData => ({
    //   ...prevData,
    //   [data.imo]: data
    // }))
  }

  function initialiseVesselData(data: VesselInformation[]) {
    console.log('called init')
    const allVessels: VesselsData = {}

    for (const vessel of data) {
      allVessels[vessel.imo] = vessel
    }

    setVesselsData(allVessels)
  }

  return (
    <VesselsContext.Provider
      value={{
        vessels: Object.values(vesselsData),
        upsertVesselData,
        initialiseVesselData
      }}
    >
      {children}
    </VesselsContext.Provider>
  )
}
