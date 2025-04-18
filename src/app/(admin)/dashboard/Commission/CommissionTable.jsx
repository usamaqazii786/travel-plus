/* eslint-disable react-hooks/exhaustive-deps */
import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useEffect, useState } from 'react'
// import { Button } from 'react-bootstrap'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { withSwal } from 'react-sweetalert2'
import { ApproveCommission, statusoption } from '../../../../utils/Services/CommissionServices'
import Preloader from '../../../../components/Preloader'
import { Button } from 'react-bootstrap'
const CommisionTable = withSwal((props) => {
  const { commssion, setcommssion, loading, swal, isSupplier, setloadingcommision, showNotification } = props
  const navigate = useNavigate()
  const [duplicateStatus, setDuplicateStatus] = useState({})
  const pageSizeList = [2, 5, 10, 20, 50]
  const [, setloading] = useState()
  const handlenavigate = (row) => {
    if (isSupplier) {
      navigate(`/dashboard/editcommisionSupplier/${row?.original.id}`, { state: row.original })
    } else {
      navigate(`/dashboard/editcommision/${row?.original.id}`, { state: row.original })
    }
  }
  const handleApproved = (id, status) => {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'Please note that this action will confirm their status as a paid user. Once confirmed, it cannot be undone',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, ${status?.value}!`,
        input: 'text',
        inputPlaceholder: 'Enter Internal Notes ',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to provide a notes!'
          }
        },
      })
      .then(function (result) {
        if (result.isConfirmed) {
          ApproveCommission(id, setloading, setcommssion, setloadingcommision, showNotification, status?.value, result.value)
        }
      })
  }

  const checkDuplicates = () => {
    const seen = new Set()
    const duplicateMap = {}

    commssion.forEach((row) => {
      const key = `${row?.supplier?.supplier_name}-${row?.reservation_number}`
      if (seen.has(key)) {
        duplicateMap[row?.reservation_number] = true
      } else {
        seen.add(key)
        duplicateMap[row?.reservation_number] = false
      }
    })

    setDuplicateStatus(duplicateMap)
  }

  useEffect(() => {
    checkDuplicates()
  }, [commssion])
  const HandleView = (InternalNotes) => {
    if (InternalNotes) {
      swal.fire({
        title: 'Internal Notes',
        text: InternalNotes,
        icon: 'info',
      })
    } else {
      swal.fire({
        title: 'Internal Notes',
        text: 'Not Found',
      })
    }
  }

  const columns = [
    {
      header: 'Duplicate',
      accessorKey: 'dublicate',
      cell: ({ row }) => {
        const isDup = duplicateStatus[row?.original?.reservation_number]
        return <div>{isDup && <IconifyIcon icon="mdi:alert-circle" className="text-danger fs-18" />}</div>
      },
    },
    {
      header: 'Date Submitted',
      accessorKey: 'today_date',
    },
    {
      header: 'Agent Name',
      cell: ({ row }) => `${row?.original?.subadmin?.[0]?.fname + ' ' + row?.original?.subadmin?.[0]?.lname}`,
    },

    {
      header: 'Agent Email',
      size: 250,
      cell: ({ row }) => `${row?.original?.subadmin?.[0]?.email}`,
    },
    {
      header: 'Supplier',
      cell: ({ row }) => `${row?.original?.supplier?.supplier_name}`,
    },
    {
      header: 'Reservation Number',
      accessorKey: 'reservation_number',
    },

    {
      header: 'Travel Date',
      accessorKey: 'departure_date',
    },
    {
      header: 'Gross Commission ',
      cell: ({ row }) => `$${row?.original?.gross_commision}`,
    },
    {
      header: 'Agent Commission ',
      cell: ({ row }) => `$${row?.original?.agent_commision}`,
    },
    {
      header: 'Notes',
      accessorKey: 'notes',
    },

    {
      header: 'Status',
      size: 150,

      cell: ({
        row: {
          original: { status, id },
        },
      }) => (
        <Select
          options={statusoption}
          classNamePrefix="react-select"
          defaultValue={{
            label: status,
            value: status,
          }}
          onChange={(selected) => handleApproved(id, selected)}
          placeholder="Change Status"
          menuPortalTarget={document.body}
          menuPosition="fixed"
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
        />
        // <Button variant={status == 'Paid' ? 'success': status == 'Hold' ?  'warning' : 'danger'} disabled={status == 'Paid'}  onClick={() => handleApproved(id,status)}>
        //   {status}
        // </Button>
      ),
    },
    {
      header: 'Internal Notes',
      accessorKey: 'internal_notes',
      size: 200,
      cell: ({ row }) => (
        <Button variant={'success'} onClick={() => HandleView(row?.original?.internal_notes)}>
          <IconifyIcon icon="fa6-solid:eye" className="me-1" /> Internal Notes
        </Button>
      ),
    },

    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="text-start">
          <span role="button" onClick={() => handlenavigate(row)}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span role="button">
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
          </span>
        </div>
      ),
    },
  ]
  return (
    <>
      {loading && <Preloader />}
      <ReactTable
        columns={columns}
        data={commssion}
        rowsPerPageList={pageSizeList}
        pageSize={100}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
      />
    </>
  )
})
export default CommisionTable
