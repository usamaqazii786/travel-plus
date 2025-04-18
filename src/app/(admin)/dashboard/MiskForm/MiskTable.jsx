import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

const MiskTable = ({ wnine,HandleDelete }) => {
  const navigate = useNavigate()
  const handledelete =(id)=>{
    HandleDelete(id)
  }
  const columns = [
    // {
    //   header: 'ID',
    //   accessorKey: 'id',
    // },

    {
      header: 'Name',

      cell: ({ row }) => <p>{row?.original?.wform?.subadmin?.fname + ' ' + row?.original?.wform?.subadmin?.lname}</p>,
    },
    {
      header: 'Pdf Link',
      cell: ({ row }) => (
        <a
          className="text-dark"
          href={`https://dgapi.dev-nuh.xyz/api/misc_generate_pdf/${row?.original?.id}`}
          target="_blank">{`https://dgapi.dev-nuh.xyz/api/wForm_pdf/${row?.original?.id}`}</a>
      ),
    },
    {
      header: 'Date',
      cell: ({ row }) => <p>{row?.original?.wform?.date}</p>,
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
          <span role="button" onClick={() => navigate('/dashboard/pdf_irsform', { state: row?.original })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span role="button" onClick={() => handledelete(row.original?.id)}>
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
export default MiskTable
