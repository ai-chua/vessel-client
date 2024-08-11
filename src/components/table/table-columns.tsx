import { VesselInformation } from '@/utils/types'

export interface CustomTableColumn {
  key: keyof VesselInformation | 'status';
  label: string;
}

export const tableColumns: CustomTableColumn[] = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'imo',
    label: 'IMO'
  },
  {
    key: 'lat',
    label: 'Latitude'
  },
  {
    key: 'lng',
    label: 'Longtitude'
  },
  {
    key: 'destination',
    label: 'Destination'
  },
  {
    key: 'status',
    label: 'Toggle Tracking'
  }
]