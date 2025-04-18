import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useState } from 'react'
import { withSwal } from 'react-sweetalert2'
// import clsx from 'clsx'

const MiskTable = withSwal((props) => {
  const { swal, pdfurl, wnine, UserPassword } = props

  const [visibleRow, setVisibleRow] = useState(null)

  const handleAlert = (swal, url, rowId) => {
    swal
      .fire({
        title: 'Enter Your Password',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: (password) => {
          if (password === UserPassword) {
            setVisibleRow(rowId)
            window.open(url, '_blank')
          } else {
            swal.fire({
              title: 'Wrong Password',
              text: 'The password you entered is incorrect.',
              icon: 'error',
            })
            return false
          }
        },
        allowOutsideClick: () => !swal.isLoading(),
      })
      .catch((error) => {
        console.error('Error in Password process:', error)
        swal.fire({
          title: 'Error',
          text: 'There was an issue with the Password verification process.',
          icon: 'error',
        })
      })
  }

  const columns = [
    // {
    //   header: 'ID',
    //   accessorKey: 'id',
    // },

    {
      header: 'Name',

      cell: ({ row }) => (
        <p style={{ filter: visibleRow === row.original?.id ? 'none' : 'blur(4px)' }}>
          {row?.original?.wform?.subadmin?.fname + ' ' + row?.original?.wform?.subadmin?.lname}
        </p>
      ),
    },
    {
      header: 'Pdf Link',
      cell: ({ row }) => (
        <p
          className="text-dark cursor-pointer"
          style={{ filter: visibleRow === row.original?.id ? 'none' : 'blur(4px)' }}
          onClick={() => handleAlert(swal, `${pdfurl}${row.original?.id}`, row.original?.id)}>
          View {row?.original.wform?.entity_name}
        </p>
      ),
    },
    {
      header: 'Date',
      cell: ({ row }) => <p style={{ filter: visibleRow === row.original?.id ? 'none' : 'blur(4px)' }}>{row?.original?.wform?.date}</p>,
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
          <button role="button" className="btn btn-success" onClick={() => handleAlert(swal, `${pdfurl}${row.original?.id}`, row.original?.id)}>
            <IconifyIcon icon="la:eye" className="text-white fs-18" />
          </button>
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
})

export default MiskTable
