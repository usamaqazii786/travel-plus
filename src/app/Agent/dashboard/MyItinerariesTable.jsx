import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useNavigate } from 'react-router-dom'
import { DeleteItineraries } from '../../../utils/Services/Itenary'
import { useState } from 'react'
import { useNotificationContext } from '../../../context/useNotificationContext'
// import clsx from 'clsx'

const MyItinerariesTable = ({ Data, setdatait, setloadingit }) => {
  const navigate = useNavigate()
  const [, setloading] = useState(false)
  const { showNotification } = useNotificationContext()
  const Handlenavigate = (id, data) => {
    navigate(`/agentdashboard/update-an-itinerary/${id}`, {
      state: data,
    })
  }
  function formatText(text) {
    const words = text.replace(/_/g, ' ').split(' ')
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    return words.join(' ')
  }
  const HandleNavigateCommision = (data) => {
    navigate(`/agentdashboard/commission`, { state: data?.intinerary?.commission })
  }
  const columns = [
    {
      header: 'Name',
      cell: ({ row }) => (
        <p className="cursor-pointer" onClick={() => Handlenavigate(row.original?.intinerary?.id,row?.original)}>
          {row?.original?.title}
        </p>
      ),
    },
    {
      header: 'Client Name',
      cell: ({ row }) => (
        <p className="cursor-pointer" onClick={() => Handlenavigate(row.original?.intinerary?.id,row?.original)}>
          {row?.original?.client?.family_name}
        </p>
      ),
    },
    {
      header: 'Travel Type',
      cell: ({ row }) => (
        <p className="cursor-pointer" onClick={() => Handlenavigate(row.original?.intinerary?.id,row?.original)}>
          {formatText(row?.original?.travel_type)}
        </p>
      ),
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="d-flex justify-content-evenly">
          <span role="button" onClick={() => Handlenavigate(row.original?.intinerary?.id, row.original)}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span role="button" onClick={() => DeleteItineraries(setloading, row.original?.intinerary?.id, showNotification, setdatait, setloadingit)}>
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
          </span>
          <span role="button" onClick={() => HandleNavigateCommision(row?.original)}>
            <IconifyIcon icon="fa:eye" className="text-secondary fs-15" />
          </span>
        </div>
      ),
    },
  ]

  const pageSizeList = [2, 5, 10, 20, 50]
  return (
    <ReactTable
      columns={columns}
      data={Data}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
      paginationClassName="text-start" // Align pagination to the left
    />
  )
}
export default MyItinerariesTable
