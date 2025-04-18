import ReactTable from '@/components/Table'
// import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import { useNavigate } from 'react-router-dom'
// import clsx from 'clsx'

const PaymentTable = ({ Data }) => {
  // const navigate = useNavigate()
  const columns = [
    {
      header: 'Amount',
      accessorKey: 'payment_amount',
    },
    {
      header: 'Date',
      accessorKey: 'date',
    },
    {
      header: 'Description',
      accessorKey: 'descriptition',
    },
    // {
    //   header: 'Action',
    //   cell: () => (
    //     <div className="text-start">
    //       <span role="button" onClick={() => navigate('/agentdashboard/update-an-itinerary/1')}>
    //         <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
    //       </span>
    //       <span role="button">
    //         <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
    //       </span>
    //     </div>
    //   ),
    // },
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
export default PaymentTable
