import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useNavigate, useParams } from 'react-router-dom'

const ContactTable = ({ Contact, id }) => {
  const navigate = useNavigate()
  const { name } = useParams()
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
      header: 'Location',
      accessorKey: 'location',
    },
    {
      header: 'Phone Number',
      accessorKey: 'phone_no',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="text-start">
          <span role="button" onClick={() => navigate(`/agentdashboard/${name}/addContact/${id}`, { state: row.original })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
        </div>
      ),
    },
  ]

  const pageSizeList = [2, 5, 10, 20, 50]

  return (
    <ReactTable
      columns={columns}
      data={Contact}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}

export default ContactTable
