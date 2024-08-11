import { useContext } from 'react'

import { Button, TableColumn as NextUITableColumn, Table, TableBody, TableCell, TableHeader, TableRow } from '@nextui-org/react'

import { CustomTableColumn, tableColumns } from './table-columns'

import { TrackerContext } from '@/utils/context/tracker.context'
import { VesselTableData } from '@/utils/types'

export default function VesselsTableComponent({ vessels }: {vessels: VesselTableData[]}) {
  const { trackVessel, untrackVessel } = useContext(TrackerContext)

  const renderCell = (vessel: VesselTableData, columnKey: CustomTableColumn['key']) => {
  switch (columnKey) {
    case 'status': {
      return (
        <div className='flex justify-center'>
          <Button
            color={vessel.isTracked ? (vessel.queuedForTrack ? 'warning' : 'success') : (vessel.queuedForUntrack ? 'success': 'default')}
            size="sm"
            onPress={() => {
              vessel.isTracked ? untrackVessel(vessel.imo) : trackVessel(vessel.imo)
            }}
          >
            {vessel.isTracked ? (vessel.queuedForTrack ? 'Queued' : 'Live') : (vessel.queuedForUntrack ? 'Queud Removal': 'Track')}
          </Button>
        </div>
      )
    }
    default:
      return vessel[columnKey]
    }
  }

  return (
    <>
    <Table aria-label="Table with live vessel data">
      <TableHeader columns={tableColumns}>
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