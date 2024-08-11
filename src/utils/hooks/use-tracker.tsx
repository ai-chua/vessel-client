import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { SECOND_IN_MS } from '../consts'
import { TrackerContext } from '../context/tracker.context'
import { postTrackRequest } from '../post-track'

// TODO: Change to 2 min
const TRACK_INTERVAL_15_SECONDS = SECOND_IN_MS * 60

/**
 * Handles timer logic and executes POST /track calls accordingly
 */
// export function useTracker() {
//   const { trackedVessels } = useContext(TrackerContext)

//   const isFirstCall = useRef<boolean>(true)

//   const [is2MinsSinceLastTrackCall, setIs2MinsSinceLastTrackCall] = useState(false)
//   const [isTrackedDataTimedout, setIsTrackedDataTimedout] = useState(false)
//   // timestamp of last LATEST event rec'd
//   const lastReceivedTimestamp = useRef<number | null>(null)

//   const [trackIntervalTimerId, setTrackIntervalTimerId] = useState<NodeJS.Timeout | null>(null)

//   const startTrackTimerRef = useRef<() => void>(() => {})

//   const sendTrackRequest = useCallback(async () => {
//     // if (isFirstCall.current && trackedVessels.length === 0) {
//     //   console.log('Is first call and trackedVessels empty, not making POST req')
//     //   return
//     // }

//     await postTrackRequest(trackedVessels)
    
//     if (isFirstCall.current) {
//       isFirstCall.current = false
//     }

//     setIs2MinsSinceLastTrackCall(false)
//     setIsTrackedDataTimedout(false)
//     startTrackTimerRef.current()
//   }, [trackedVessels])

//   const startTrackTimer = useCallback(() => {
//     if (trackIntervalTimerId) {
//       clearTimeout(trackIntervalTimerId)
//     }

//     const newTrackTimeoutId = setTimeout(() => {
//       // sendTrackRequest()
//       setIs2MinsSinceLastTrackCall(true)
//     }, TRACK_INTERVAL_15_SECONDS)

//     setTrackIntervalTimerId(newTrackTimeoutId)
//   }, [trackIntervalTimerId])

//   useEffect(() => {
//     if (isFirstCall.current) {
//       setIs2MinsSinceLastTrackCall(true)
//       setIsTrackedDataTimedout(true)
//     }
//   }, [])

//   useEffect(() => {
//     console.info('jkgbajsbldfuhjd is2MinsSinceLastTrackCall', is2MinsSinceLastTrackCall, 'isTrackedDataTimedout', isTrackedDataTimedout)

//     if (is2MinsSinceLastTrackCall && isTrackedDataTimedout) {
//       sendTrackRequest()
//       startTrackTimer()
//     }
//   }, [
//     is2MinsSinceLastTrackCall,
//     isTrackedDataTimedout,
//     sendTrackRequest,
//     startTrackTimer
//   ])

//   useEffect(() => {
//     startTrackTimerRef.current = startTrackTimer
//   }, [startTrackTimer])

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       console.info('Performing time out check...')
//       if (lastReceivedTimestamp.current) {

//         const timeElapsed = Date.now() - lastReceivedTimestamp.current
        
//         if (timeElapsed > SECOND_IN_MS * 10) {
//           setIsTrackedDataTimedout(true)
//         } 
        
//         // else {
//         //   setIsTrackedDataTimedout(false)
//         // }
//       }
//     }, SECOND_IN_MS)

//     return () => clearInterval(intervalId)
//   }, [])

//   return {
//     isTrackedDataTimedout,
//     updateLastReceivedTimestamp: (timestamp: number) => {
//       lastReceivedTimestamp.current = timestamp
//       setIsTrackedDataTimedout(false) // Reset timeout state on new data
//     }
//   }
// }

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
    }, TRACK_INTERVAL_15_SECONDS)
  }, [])

  const sendTrackRequest = useCallback(async () => {
    await postTrackRequest(trackedVessels)
    
    if (isFirstCall.current) {
      isFirstCall.current = false
    }

    setIs2MinsSinceLastTrackCall(false)
    setIsTrackedDataTimedout(false)
    startTrackTimer()
  }, [startTrackTimer, trackedVessels])

  useEffect(() => {
    if (isFirstCall.current) {
      setIs2MinsSinceLastTrackCall(true)
      setIsTrackedDataTimedout(true)
    }
  }, [])

  useEffect(() => {
    if (is2MinsSinceLastTrackCall && isTrackedDataTimedout) {
      sendTrackRequest()
    }
  }, [is2MinsSinceLastTrackCall, isTrackedDataTimedout, sendTrackRequest])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (lastReceivedTimestamp.current) {
        const timeElapsed = Date.now() - lastReceivedTimestamp.current
        if (timeElapsed > SECOND_IN_MS * 30) {
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

