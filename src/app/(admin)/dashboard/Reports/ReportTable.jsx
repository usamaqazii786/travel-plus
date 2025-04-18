import ReactTable from '@/components/Table'
// import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import clsx from 'clsx'

const ReportTable = ({ wnine }) => {
  const columns = [
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'State',
      accessorKey: 'state',
    },
    {
      header: 'Zip Code',
      accessorKey: 'zip_code',
    },

    {
      header: 'Agent Commission',
      accessorKey: 'agent_commision', // Assuming commission percentage is stored here
    },
    {
      header: 'Supplier',
      accessorKey: 'supplier', // Assuming supplier name is stored here
    },
    {
      header: 'Supplier Type',
      accessorKey: 'supplier_type', // Assuming supplier type is stored here
    },
    {
      header: 'Arrival Date',
      accessorKey: 'arrival_date', // Assuming arrival date is stored here
    },
    {
      header: 'Booking Date',
      accessorKey: 'booking_date', // Assuming booking date is created_at field
    },
  ]

  const pageSizeList = [2, 5, 10, 20, 50]

  return (
    <ReactTable
      columns={columns}
      data={wnine}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}

export default ReportTable
