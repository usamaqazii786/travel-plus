import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useState } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useNotificationContext } from '../../../context/useNotificationContext'
import { DeleteTravelQuote, SendEmailTravel, SendEmailTravelTesting } from '../../../utils/Services/TravelquoteServices'
import Preloader from '../../../components/Preloader'

const DashboardTable = ({ Data, setdata, saved }) => {
  function formatText(text) {
    const words = text.replace(/_/g, ' ').split(' ')
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    return words.join(' ')
  }

  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const { showNotification } = useNotificationContext()
  const handlenavigate = (row) => {
    navigate(`/agentdashboard/edittravel/${row?.original.id}`, { state: row.original })
  }
  const handleSendEmail = (id) => {
    SendEmailTravel(setloading, id, showNotification)
  }
  const handleSendEmailTesting = (id) => {
    SendEmailTravelTesting(setloading, id, showNotification)
  }

  const columns = [
    {
      header: 'Name',
      cell: ({ row }) => (
        <p className="cursor-pointer" onClick={() => handlenavigate(row)}>
          {row?.original?.title}
        </p>
      ),
    },
    {
      header: 'Client Name',
      cell: ({ row }) => (
        <p className="cursor-pointer" onClick={() => handlenavigate(row)}>
          {row?.original?.client?.family_name}
        </p>
      ),
    },
    {
      header: 'Travel Type',
      cell: ({ row }) => (
        <p className="cursor-pointer" onClick={() => handlenavigate(row)}>
          {formatText(row?.original?.travel_type)}
        </p>
      ),
    },
    {
      header: 'Send Quote',
      cell: ({ row }) => (
        <div className="d-flex justify-content-evenly">
          {!saved && (
            <>
              <OverlayTrigger placement="top" overlay={<Tooltip id="saved-tooltip">Send Test Email</Tooltip>}>
                <Button color="variant" onClick={() => handleSendEmailTesting(row?.original.id)}>
                  <IconifyIcon icon="mdi:email" className="text-secondary fs-18" />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={<Tooltip id="saved-tooltip">Send Client Email</Tooltip>}>
                <Button color="variant" onClick={() => handleSendEmail(row?.original.id)}>
                  <IconifyIcon icon="mdi:email" className="text-secondary fs-18" />
                </Button>
              </OverlayTrigger>
            </>
          )}
          <span role="button" className="mt-2" onClick={() => handlenavigate(row)}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-22" />
          </span>
          <span role="button" className="mt-2" onClick={() => DeleteTravelQuote(setloading, row?.original?.id, showNotification, setdata)}>
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-22" />
          </span>
        </div>
      ),
    },
  ]

  const pageSizeList = [2, 5, 10, 20, 50]
  return (
    <>
      {loading && <Preloader />}
      <ReactTable
        columns={columns}
        data={Data}
        rowsPerPageList={pageSizeList}
        pageSize={10}
        tableClass="mb-0"
        theadClass="table-light"
        showPagination
      />
    </>
  )
}
export default DashboardTable
