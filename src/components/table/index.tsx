import { useCallback } from 'react'

import { Button, Table, TableBody, TableCell, TableColumn as NextUITableColumn, TableHeader, TableRow } from '@nextui-org/react'

import { CustomTableColumn, tableColumns } from './table-columns'

import { VesselInformation } from '@/utils/types'

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