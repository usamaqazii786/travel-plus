import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useNavigate } from 'react-router-dom'
// import clsx from 'clsx'

const TravelQuotesTable = ({ Data }) => {
  const navigate = useNavigate()
  const handlenavigate = (row) => {
    navigate(`/agentdashboard/edittravel/${row?.original.id}`, { state: row.original })
  }
  const columns = [
    {
      header: 'Name',
      accessorKey: 'title',
    },
    {
      header: 'Client Name',
      cell: ({ row }) => <p>{row?.original?.client?.family_name}</p>,
    },
    {
      header: 'Travel Type',
      accessorKey: 'travel_type',
    },
    // {
    //   header: 'Destination',
    //   accessorKey: 'destination',
    // },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="text-start">
          <span role="button" onClick={() => handlenavigate(row)}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span role="button">
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
          </span>
        </div>
      ),
    },
  ]

  const pageSizeList = [2, 5, 10, 20, 50]
  return (
    <ReactTable
      columns={columns}
      data={Data}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}
export default TravelQuotesTable
