import { useContext, useCallback, useEffect, useRef } from 'react'

import { TrackerContext } from '../context/tracker.context'
import { postTrackRequest } from '../post-track'

export function useTracker() {
  const { trackedVessels } = useContext(TrackerContext)

  const isFirstCall = useRef<boolean>(true)

  const sendTrackRequest = useCallback(async () => {
    if (isFirstCall.current && trackedVessels.length === 0) {
      console.log('Is first call and trackedVessels empty, not making POST req')
      return
    }

    await postTrackRequest(trackedVessels)
    
    if (isFirstCall.current) {
      isFirstCall.current = false
    }
  }, [trackedVessels])

  useEffect(() => {
    console.log('trackedVessels changed, current', trackedVessels)
    sendTrackRequest()
  }, [sendTrackRequest, trackedVessels])

  return {}
}
