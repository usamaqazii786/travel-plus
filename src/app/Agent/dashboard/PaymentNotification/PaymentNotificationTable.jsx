import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useNavigate } from 'react-router-dom'

const PaymentNotificationTable = ({ payment }) => {
  const navigate = useNavigate()

  // Define columns based on the provided payment
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Travel Itinery',
      cell: ({ row }) => <p>{row?.original?.itinerary?.travel_quote?.title}</p>,
    },
    {
      header: 'Date OF Reminder',
      accessorKey: 'reminder_date',
    },
    {
      header: 'Time Of Reminder',
      accessorKey: 'reminder_time',
    },
    {
      header: 'Notification',
      accessorKey: 'notification',
    },

    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="text-start">
          <span role="button" onClick={() => navigate(`/agentdashboard/editpayment/${row.original.id}`, { state: row.original })}>
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
      data={payment}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}

export default PaymentNotificationTable
