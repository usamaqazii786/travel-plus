import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useNavigate } from 'react-router-dom'
import { ClientDelete } from '../../../../utils/Services/ClientServices'
import { useState } from 'react'
import { useNotificationContext } from '../../../../context/useNotificationContext'

const ClientTable = ({ client, setclient }) => {
  const navigate = useNavigate()
  const [, setloading] = useState(false)
  const { showNotification } = useNotificationContext()

  // Define columns based on the provided data
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'family_name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Address',
      accessorKey: 'address',
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
    },
    // {
    //   header: 'Member Since',
    //   accessorKey: 'member_name',
    // },
    {
      header: 'Travel',
      cell: ({ row }) => <p>{row?.original?.travel_quote?.length}</p>,
    },

    {
      header: 'Itinerary',
      accessorKey: 'itinaries',
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="text-start">
          <span role="button" onClick={() => navigate(`/agentdashboard/editclient/${row.original.id}`, { state: row.original })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span role="button" onClick={() => ClientDelete(setloading, row?.original?.id, showNotification, setclient)}>
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
      data={client}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}

export default ClientTable
