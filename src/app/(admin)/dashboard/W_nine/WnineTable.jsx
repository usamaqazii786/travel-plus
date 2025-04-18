import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../../../utils/BaseUrl/BaseUrl'
import { useNotificationContext } from '../../../../context/useNotificationContext'
import { DeleteWnine } from '../../../../utils/Services/AgentServices'

const WnineTable = ({ wnine, setdata, setloading }) => {
  const { showNotification } = useNotificationContext()

  const navigate = useNavigate()
  const columns = [
    // {
    //   header: 'ID',
    //   accessorKey: 'id',
    // },
    {
      header: 'Name',
      cell: ({ row }) => <p>{row?.original?.subadmin?.fname + ' ' + row?.original?.subadmin?.lname}</p>,
    },
    {
      header: 'Pdf Link',
      cell: ({ row }) => (
        <a className="text-dark" href={`${baseURL}/wForm_pdf/${row?.original?.id}`} target="_blank">{`${baseURL}/wForm_pdf/${row?.original?.id}`}</a>
      ),
    },
    {
      header: 'Date',
      accessorKey: 'date',
    },

    // {
    //   header: 'Status',
    //   cell: ({
    //     row: {
    //       original: { status },
    //     },
    //   }) => (
    //     <span className={clsx('badge rounded', status === 'Inactive' ? 'text-secondary bg-secondary-subtle' : 'text-success bg-success-subtle')}>
    //       {status}
    //     </span>
    //   ),
    // },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="text-start">
          <span role="button" onClick={() => navigate('/dashboard/w_nineform', { state: row?.original })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span role="button" onClick={() => DeleteWnine(setloading, row?.original?.id, showNotification, setdata)}>
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
      data={wnine}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}
export default WnineTable
