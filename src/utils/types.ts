export interface VesselInformation {
  imo: number;
  lat: number;
  lng: number;
  destination: string;
}

export type TrackedVesselInformation = VesselInformation & {
  id: number;
  name: string;
}