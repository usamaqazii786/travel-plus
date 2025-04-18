import ReactTable from '@/components/Table'
// import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Button } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'
// import clsx from 'clsx'

const SendQuoteEmailTable = ({ Data }) => {
//   const navigate = useNavigate()
//   const handlenavigate = (row) => {
//     navigate(`/agentdashboard/edittravel/${row?.original.id}`, { state: row.original })
//   }
  const columns = [
    {
      header: 'Template Name',
      accessorKey: 'name',
    },

    {
      header: 'Action',
      cell: () => (
        <div className="row mt-2">
        <div className="col-12 col-md-6 mb-2">
          <Button variant="primary" type="submit" className="w-100">
            Send Test Email
          </Button>
        </div>
        <div className="col-12 col-md-6 mb-2">
          <Button variant="primary" type="submit" className="w-100">
            Send Email
          </Button>
        </div>
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
export default SendQuoteEmailTable
