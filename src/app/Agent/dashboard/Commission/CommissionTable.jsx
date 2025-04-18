/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

const CommisionTable = ({ commssion, issaved }) => {
  const pageSizeList = [2, 5, 10, 20, 50]
  const navigate = useNavigate()

  const [duplicateStatus, setDuplicateStatus] = useState({})

  // Navigate to edit page
  const handlenavigate = (row) => {
    navigate(`/agentdashboard/editcommision/${row?.original.id}`, { state: row.original?.[0]?.travel_quote })
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

  // Define table columns
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
      cell: ({ row }) => `${row?.original?.subadmin?.[0]?.fname} ${row?.original?.subadmin?.[0]?.lname}`,
    },
    {
      header: 'Agent Email',
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
      header: 'Status',
      cell: ({
        row: {
          original: { status },
        },
      }) => (
        <span
          className={clsx('badge rounded', {
            'text-warning bg-warning-subtle': status === 'Hold',
            'text-success bg-success-subtle': status === 'Paid',
            'text-danger bg-danger-subtle': status === 'Pending',
          })}>
          {status}
        </span>
      ),
    },
    {
      header: 'Notes',
      accessorKey: 'notes',
    },
    ...(issaved
      ? [
          {
            header: 'Action',
            cell: ({ row }) => (
              <div className="text-start">
                <span role="button" onClick={() => handlenavigate(row)}>
                  <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
                </span>
              </div>
            ),
          },
        ]
      : []),
  ]

  return (
    <ReactTable
      columns={columns}
      data={commssion}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}

export default CommisionTable
