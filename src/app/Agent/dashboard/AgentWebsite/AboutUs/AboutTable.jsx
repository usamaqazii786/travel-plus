import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useNavigate, useParams } from 'react-router-dom'
// import { useState } from 'react'
// import { useNotificationContext } from '@/context/useNotificationContext'
// import { AboutDelete } from '@/utils/Services/AboutServices'

const AboutTable = ({ About, id }) => {
  const navigate = useNavigate()
  const { name } = useParams()
  const onlyName = (url) => {
    return url.replace(/(^\w+:|^)\/\//, '').split('/')[0]
  }
  // const [, setloading] = useState(false)
  // const { showNotification } = useNotificationContext()

  // Define columns based on the provided data
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
          <span role="button" onClick={() => navigate(`/agentdashboard/${name}/addAbout/${id}`, { state: row.original })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          {/* <span role="button" onClick={() => AboutDelete(setloading, row?.original?.id, showNotification, setAbout)}>
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
      data={About}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}

export default AboutTable
