'use client'

import { useContext } from 'react'

import VesselsTableComponent from '@/components/table'
import { TrackerContext } from '@/utils/context/tracker.context'
import { VesselsContext } from '@/utils/context/vessels.context'

export default function Home() {
  const { vessels } = useContext(VesselsContext)
  const { trackedVessels } = useContext(TrackerContext)

  return (
    <main>
      <VesselsTableComponent vessels={vessels.map((v) => {
            return {
              ...v,
              isTracked: trackedVessels.includes(v.imo)
            }
          }
        )}
      />
    </main>
  )
}
