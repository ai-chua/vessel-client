import { VesselInformation } from '@/utils/types'

export interface CustomTableColumn {
  key: keyof VesselInformation | 'trackButton';
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
    key: 'trackButton',
    label: ''
  }
]