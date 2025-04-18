import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useNotificationContext } from '@/context/useNotificationContext'
import { PromotionDelete } from '@/utils/Services/PromotionServices'
import { Button } from 'react-bootstrap'

const PromotionTable = ({ Promotion, setPromotion ,handleApproved}) => {
  const navigate = useNavigate()
  const [, setloading] = useState(false)
  const { showNotification } = useNotificationContext()

  // Define columns based on the provided data
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
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
      header: 'Url',
      accessorKey: 'url',
    },
    {
      header: 'Status',
      cell: ({
        row: {
          original: { status, id },
        },
      }) => (
        <Button variant={status == 'Featured' ? 'success' : 'danger'} onClick={() => handleApproved(status,id)}>
          {status }
        </Button>
      ),
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="text-start">
          <span role="button" onClick={() => navigate(`/dashboard/editPromotion/${row.original.id}`, { state: row.original })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span role="button" onClick={() => PromotionDelete(setloading, row?.original?.id, showNotification, setPromotion)}>
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
      data={Promotion}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}

export default PromotionTable
