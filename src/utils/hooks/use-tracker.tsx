import { useContext, useCallback, useEffect, useRef, useState } from 'react'

import { MIN_IN_MS, SECOND_IN_MS } from '../consts'
import { TrackerContext } from '../context/tracker.context'
import { postTrackRequest } from '../post-track'

// TODO: Change to 2 min
const TRACK_INTERVAL_10_SECONDS = SECOND_IN_MS * 10

/**
 * Handles timer logic and executes POST /track calls accordingly
 */
export function useTracker() {
  const { trackedVessels } = useContext(TrackerContext)

  const isFirstCall = useRef<boolean>(true)

  const [trackIntervalTimerId, setTrackIntervalTimerId] = useState<NodeJS.Timeout | null>(null)

  const startTrackTimerRef = useRef<() => void>(() => {})

  const sendTrackRequest = useCallback(async () => {
    if (isFirstCall.current && trackedVessels.length === 0) {
      console.log('Is first call and trackedVessels empty, not making POST req')
      return
    }

    await postTrackRequest(trackedVessels)
    
    if (isFirstCall.current) {
      isFirstCall.current = false
    }

    startTrackTimerRef.current()
  }, [trackedVessels])

  const startTrackTimer = useCallback(() => {
    if (trackIntervalTimerId) {
      clearTimeout(trackIntervalTimerId)
    }

    const newTrackTimeoutId = setTimeout(() => {
      sendTrackRequest()
    }, TRACK_INTERVAL_10_SECONDS)

    setTrackIntervalTimerId(newTrackTimeoutId)
  }, [sendTrackRequest, trackIntervalTimerId])

  useEffect(() => {
    console.log('trackedVessels changed, current', trackedVessels)
    sendTrackRequest()
  }, [sendTrackRequest, trackedVessels])

  useEffect(() => {
    startTrackTimerRef.current = startTrackTimer
  }, [startTrackTimer])

  return {}
}
