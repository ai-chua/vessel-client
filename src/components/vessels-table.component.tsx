import { useCallback } from 'react'

import { Button, Table, TableBody, TableCell, TableColumn as NextUITableColumn, TableHeader, TableRow } from '@nextui-org/react'

import { VesselInformation } from '@/utils/types'
interface CustomTableColumn {
  key: keyof VesselInformation | 'trackButton';
  label: string;
}

const columns: CustomTableColumn[] = [
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

export default function VesselsTableComponent({ vessels }: {vessels: VesselInformation[]}) {
  const renderCell = useCallback((vessel: VesselInformation, columnKey: CustomTableColumn['key']) => {
    switch (columnKey) {
      case 'trackButton': {
        return (
          <Button size="sm">
            Track
          </Button> 
        )
      }
      default:
        return vessel[columnKey]
    }
  }, [])

  return (
    <>
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <NextUITableColumn key={column.key}>{column.label}</NextUITableColumn>}
      </TableHeader>
      <TableBody emptyContent='Nothing to display.' items={vessels}>
        {(item) => (
          <TableRow key={item.imo}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as CustomTableColumn['key'])}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </>
  )
}