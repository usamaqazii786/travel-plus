import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useNavigate, useParams } from 'react-router-dom'
// import { useState } from 'react'
// import { useNotificationContext } from '@/context/useNotificationContext'
// import { LogoDelete } from '@/utils/Services/LogoServices'

const LogoTable = ({ Logo, id }) => {
  const navigate = useNavigate()
  const { name } = useParams()
  // const [, setloading] = useState(false)
  // const { showNotification } = useNotificationContext()

  // Define columns based on the provided data
  const onlyName = (url) => {
    return url.replace(/(^\w+:|^)\/\//, '').split('/')[0]
  }
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Website Url',
      cell: ({ row }) => (
        <a href={`https://${row?.original?.subadmin?.fname}.${onlyName(row?.original?.website?.url)}`} target="_blank" className="text-dark">
          View {row.original.website.title}
        </a>
      ),
    },
    {
      header: 'Image',
      cell: ({
        row: {
          original: { logo },
        },
      }) => (
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <img src={logo} className="me-2 thumb-md align-self-center rounded" alt="..." />
          </div>
        </div>
      ),
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="text-start">
          <span role="button" onClick={() => navigate(`/agentdashboard/${name}/addLogo/${id}`, { state: row.original })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          {/* <span role="button" onClick={() => LogoDelete(setloading, row?.original?.id, showNotification, setLogo)}>
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
      data={Logo}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}

export default LogoTable
