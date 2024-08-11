import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { MIN_IN_MS, SECOND_IN_MS } from '../consts'
import { TrackerContext } from '../context/tracker.context'
import { postTrackRequest } from '../post-track'

// TODO: Change to 2 min
const TRACK_INTERVAL = MIN_IN_MS * 2
const TIMEOUT_DURATION = MIN_IN_MS

export function useTracker() {
  const { trackedVessels } = useContext(TrackerContext)

  const isFirstCall = useRef(true)

  const lastReceivedTimestamp = useRef<number | null>(null)
  const trackIntervalTimerId = useRef<NodeJS.Timeout | null>(null)

  const [is2MinsSinceLastTrackCall, setIs2MinsSinceLastTrackCall] = useState(false)
  const [isTrackedDataTimedout, setIsTrackedDataTimedout] = useState(false)

  const startTrackTimer = useCallback(() => {
    if (trackIntervalTimerId.current) {
      clearTimeout(trackIntervalTimerId.current)
    }

    trackIntervalTimerId.current = setTimeout(() => {
      setIs2MinsSinceLastTrackCall(true)
    }, TRACK_INTERVAL)
  }, [])

  const sendTrackRequest = useCallback(async () => {    
    if (isFirstCall.current) {
      isFirstCall.current = false
    setIs2MinsSinceLastTrackCall(false)
    setIsTrackedDataTimedout(false)
      startTrackTimer()
      // console.log('in sendTrackRequest but isFirst call, skipped POST req but started 2 min timer at', new Date().toString())
      return
    }

    console.log('sendTrackRequest !isFirstCall', trackedVessels)
    
    await postTrackRequest(trackedVessels)

    setIs2MinsSinceLastTrackCall(false)
    setIsTrackedDataTimedout(false)
    startTrackTimer()
  }, [startTrackTimer, trackedVessels])

  useEffect(() => {
    // hackish solution to initiate trigger sendTrackRequest()
    if (isFirstCall.current && trackedVessels.length > 0) {
      setIs2MinsSinceLastTrackCall(true)
      setIsTrackedDataTimedout(true)
    }
  }, [trackedVessels.length])

  useEffect(() => {
    // console.log('useEffect is2MinsSinceLastTrackCall', is2MinsSinceLastTrackCall, 'isTrackedDataTimedout',isTrackedDataTimedout)
    if (is2MinsSinceLastTrackCall && isTrackedDataTimedout) {
      sendTrackRequest()
    }
  }, [is2MinsSinceLastTrackCall, isTrackedDataTimedout, sendTrackRequest])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (lastReceivedTimestamp.current) {
        const timeElapsed = Date.now() - lastReceivedTimestamp.current
        if (timeElapsed > TIMEOUT_DURATION) {
          setIsTrackedDataTimedout(true)
        }
      }
    }, SECOND_IN_MS)

    return () => clearInterval(intervalId)
  }, [])

  return {
    isTrackedDataTimedout,
    updateLastReceivedTimestamp: (timestamp: number) => {
      lastReceivedTimestamp.current = timestamp
      setIsTrackedDataTimedout(false)
    }
  }
}

