import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useNotificationContext } from '@/context/useNotificationContext'
import { TutorialsDelete } from '@/utils/Services/TutorialsServices'

const TutorialsTable = ({ Tutorials, setTutorials }) => {
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
      header: 'Tutorials Name',
      accessorKey: 'title',
    },
    {
      header: 'Tutorials Vedio',
      cell: ({ row }) => (
        <a href={row?.original?.video}  target="_blank"className="text-dark">
          {console.log(row.original)}
          {row?.original?.video}
        </a>
      ),
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="text-start">
          <span role="button" onClick={() => navigate(`/dashboard/editTutorials/${row.original.id}`, { state: [row.original] })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span role="button" onClick={() => TutorialsDelete(setloading, row?.original?.id, showNotification, setTutorials)}>
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
      data={Tutorials}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}

export default TutorialsTable
