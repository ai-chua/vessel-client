'use client'

import { useContext } from 'react'

import { Card, CardBody } from '@nextui-org/react'

import VesselsTableComponent from '@/components/table'
import { TrackerContext } from '@/utils/context/tracker.context'
import { VesselsContext } from '@/utils/context/vessels.context'

export default function Home() {
  const { vessels } = useContext(VesselsContext)
  const { trackedVessels, queuedForTracking, queuedForUntracking } = useContext(TrackerContext)

  return (
    <main>
      <Card className='my-4 p-2'>
        <CardBody className='text-sm'>
          <p>
            Use the buttons on the right of the table to add the vessels you want for live tracking. Upon clicking, the description on the button will display the current tracking status.
            <br /><br />
            To untrack, simply press on the `Live` button in green.
          </p>
        </CardBody>
      </Card>
      <VesselsTableComponent vessels={vessels.map((v) => {
            return {
              ...v,
              isTracked: trackedVessels.includes(v.imo),
              queuedForTrack: queuedForTracking.includes(v.imo),
              queuedForUntrack: queuedForUntracking.includes(v.imo)
            }
          }
        )}
      />
    </main>
  )
}
