import { SERVER_PORT } from './consts'
import { VesselInformation } from './types'

export async function postTrackRequest(vesselIds: VesselInformation['imo'][]): Promise<void> {
  try {
    const response = await fetch(`http://localhost:${SERVER_PORT}/api/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vesselIds)
    })

    if (response.status !== 200) {
      alert(`Failed to track vessels: ${response.status}`)
      return
    }
    console.info('Success making POST /track call at', new Date().toString(), 'imos', vesselIds)
  } catch (error) {
    console.error('Error tracking vessels:', error)
  }
}
