import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useNavigate, useParams } from 'react-router-dom'
// import { useState } from 'react'
// import { useNotificationContext } from '@/context/useNotificationContext'
// import { WelcomeDelete } from '@/utils/Services/WelcomeServices'

const WelcomeTable = ({ Welcome }) => {
  const navigate = useNavigate()
  const { name } = useParams()

  // const [, setloading] = useState(false)
  // const { showNotification } = useNotificationContext()

  // Define columns based on the provided data
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
  
    
    {
      header: 'Welcome',
      accessorKey: 'content',
      cell: ({ row }) => <div className="text-dark" dangerouslySetInnerHTML={{ __html: row.original.content }} />,
    },
  
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="text-start">
          <span role="button" onClick={() => navigate(`/dashboard/${name}/home/welcome-section/addWelcome`, { state: row.original })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          {/* <span role="button" onClick={() => WelcomeDelete(setloading, row?.original?.id, showNotification, setWelcome)}>
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
          </span> */}
        </div>
      ),
    },
  ]

  const pageSizeList = [2, 5, 10, 20, 50]

  return (
    <ReactTable
      columns={columns}
      data={Welcome}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}

export default WelcomeTable
