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
      header: 'Agent',
      accessorKey: 'subadmin.fname', // Assuming the agent's first name is stored here
    },
    {
      header: 'Commission',
      accessorKey: 'subadmin.percentage', // Assuming commission percentage is stored here
    },
    {
      header: 'Supplier',
      accessorKey: 'business_name', // Assuming supplier name is stored here
    },
    {
      header: 'Supplier Type',
      accessorKey: 'tax_classification', // Assuming supplier type is stored here
    },
    {
      header: 'Arrival Date',
      accessorKey: 'date', // Assuming arrival date is stored here
    },
    {
      header: 'Booking Date',
      accessorKey: 'created_at', // Assuming booking date is created_at field
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
