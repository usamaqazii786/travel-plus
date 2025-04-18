import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { withSwal } from 'react-sweetalert2'

const WeightTable = withSwal((props) => {
  const { swal, wnine, UserPassword } = props
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
    {
      header: 'Name',
      cell: ({ row }) => (
        <p style={{ filter: visibleRow === row.original?.id ? 'none' : 'blur(4px)' }} className="text-dark">
          {row?.original?.subadmin?.fname + ' ' + row?.original?.subadmin?.lname}
        </p>
      ),
    },
    {
      header: 'Pdf Link',
      cell: ({ row }) => (
        <p
          className="text-dark cursor-pointer"
          style={{ filter: visibleRow === row.original?.id ? 'none' : 'blur(4px)' }}
          onClick={() => handleAlert(swal, `${row?.original?.pdf_path}`, row.original?.id)}>
          View Pdf
        </p>
      ),
    },
    {
      header: 'Date',
      cell: ({ row }) => <p style={{ filter: visibleRow === row.original?.id ? 'none' : 'blur(4px)' }}>{row?.original?.date}</p>,
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="text-start">
          <button role="button" className="btn btn-success" onClick={() => handleAlert(swal, `${row?.original?.pdf_path}`, row.original?.id)}>
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
export default WeightTable
