export enum VesselTrackerStatus {
  QUEUED = 'queued',
  LIVE = 'live',
  UNTRACKED = 'untracked'
}
export interface UpdatedVesselInformation {
  imo: number;
  lat: number;
  lng: number;
  destination: string;
}

export type VesselInformation = UpdatedVesselInformation & {
  id: number;
  name: string;
}

export enum WEBSOCKET_EVENTS {
  LATEST = 'latestVesselInformation',
  CURRENT = 'currentVesselInformation'
}

export type CurrentVesselInformationPayload = {
  message: string,
  data: VesselInformation[]
}

export type VesselTableData = VesselInformation & {
  isTracked: boolean,
  queuedForTrack: boolean,
  queuedForUntrack: boolean
}