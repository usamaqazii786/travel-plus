import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useNotificationContext } from '@/context/useNotificationContext'
import { MessageDelete } from '@/utils/Services/MessageServices'

const MessageTable = ({ Message, setMessage,websiteId }) => {
  // const navigate = useNavigate()
  const [, setloading] = useState(false)
  const { showNotification } = useNotificationContext()

  // Define columns based on the provided data
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      accessorKey: 'first_name',
      header: 'First Name',
    },
    {
      accessorKey: 'last_name',
      header: 'Last Name',
    },
    {
      accessorKey: 'email',
      header: 'Email Address',
    },
    {
      accessorKey: 'phone_no',
      header: 'Phone Number',
    },
    {
      accessorKey: 'message',
      header: 'Message',
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="text-start">
          {/* <span role="button" onClick={() => navigate(`/dashboard/editMessage/${row.original.id}`, { state: row.original })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span> */}
          <span role="button" onClick={() => MessageDelete(setloading, row?.original?.id, showNotification, setMessage,websiteId)}>
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
      data={Message}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}

export default MessageTable
