import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useLocation, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import { useNotificationContext } from '@/context/useNotificationContext'
// import { ExpertDelete } from '@/utils/Services/ExpertServices'

const ExpertTable = ({ Expert }) => {
  const navigate = useNavigate()
  var { pathname } = useLocation()
  pathname = pathname.split('/')[2]
  // const [, setloading] = useState(false)
  // const { showNotification } = useNotificationContext()

  // Define columns based on the provided data
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },

    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Content',
      accessorKey: 'content',
      cell: ({ row }) => <div className="text-dark" dangerouslySetInnerHTML={{ __html: row.original.content }} />,
    },
    {
      header: 'Image',
      cell: ({
        row: {
          original: { image },
        },
      }) => (
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <img src={image} className="me-2 thumb-md align-self-center rounded" alt="..." />
          </div>
        </div>
      ),
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="text-start">
          <span role="button" onClick={() => navigate(`/dashboard/${pathname}/services/travel-services/expert/addExpert`, { state: row.original })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          {/* <span role="button" onClick={() => ExpertDelete(setloading, row?.original?.id, showNotification, setExpert)}>
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
      data={Expert}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}

export default ExpertTable
