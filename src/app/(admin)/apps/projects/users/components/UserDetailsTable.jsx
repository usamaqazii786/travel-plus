import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ApproveAgent, ApprovedAgent, Deleteagents, HandlePercentage } from '../../../../../../utils/Services/AgentServices'
import { useState } from 'react'
import Select from 'react-select'
import Preloader from '../../../../../../components/Preloader'

const UserDetailsTable = ({ users, setAgent, setloadingAgent, HandleOpen, HandleOpenSuppplier, showNotification }) => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const handleApproved = (id) => {
    ApproveAgent(id, setloading, setAgent, setloadingAgent, showNotification)
  }
  const handleApprovedAgent = (id) => {
    ApprovedAgent(id, setloading, setAgent, setloadingAgent, showNotification)
  }
  const handleCommissionChange = (e, name, id) => {
    HandlePercentage(e?.value, name, id, showNotification, setloading, setAgent, setloadingAgent)
  }
  const AssignPermission = (id) => {
    HandleOpen(id)
  }
  const AssignSupplier = (id) => {
    HandleOpenSuppplier(id)
  }
  const commision = [
    { label: 70, value: 70 },
    { label: 75, value: 75 },
    { label: 80, value: 80 },
    { label: 85, value: 85 },
    { label: 90, value: 90 },
  ]
  const columns = [
    {
      header: 'Full name',
      size: 300,
      cell: ({
        row: {
          original: { email, image, fname, lname },
        },
      }) => (
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <img src={image} className="me-2 thumb-md align-self-center rounded" alt="..." />
            <div className="flex-grow-1 text-truncate">
              <h6 className="m-0">{fname + ' ' + lname}</h6>
              <span role="button" className="fs-12 text-primary">
                {email}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    // {
    //   header: 'ID',
    //   accessorKey: 'id',
    // },
    {
      header: 'Last Name',
      accessorKey: 'lname',
    },
    // {
    //   header: 'Role',
    //   cell: ({
    //     row: {
    //       original: { role },
    //     },
    //   }) => (
    //     <span role="button" className="text-body text-decoration-underline">
    //       {role}
    //     </span>
    //   ),
    // },
    {
      header: 'Create At',
      cell: ({
        row: {
          original: { created_at },
        },
      }) => new Date(created_at).toLocaleString(),
    },
    {
      header: 'Elite/Non-Elite',
      cell: ({
        row: {
          original: { is_elite, id },
        },
      }) => (
        <Button variant={is_elite == 1 ? 'success' : 'danger'} onClick={() => handleApproved(id)}>
          {is_elite == 1 ? 'Elite' : 'Normal'}
        </Button>
      ),
    },
    {
      header: 'Status',
      cell: ({
        row: {
          original: { status, id },
        },
      }) => (
        <Button variant={status == 1 ? 'success' : 'danger'} onClick={() => handleApprovedAgent(id)}>
          {status == 1 ? ' Approved' : 'DisApproved'}
        </Button>
      ),
    },
    {
      header: 'Permissions Website',
      // size: 50,
      cell: ({ row }) => {
        return (
          <div className="text-start">
            <span role="button" onClick={() => AssignPermission(row?.original?.id)}>
              <IconifyIcon icon="la:plus-circle" className="text-success fs-30" />
            </span>
          </div>
        )
      },
    },
    {
      header: 'Supplier Assign',
      // size: 50,
      cell: ({ row }) => {
        return (
          <div className="text-start">
            <span role="button" onClick={() => AssignSupplier(row?.original?.id)}>
              <IconifyIcon icon="la:plus-circle" className="text-success fs-30" />
            </span>
          </div>
        )
      },
    },
    {
      header: 'Commission For Agent',
      size: 200,
      cell: ({
        row: {
          original: { percentage, fname, id },
        },
      }) => {
        return (
          <Select
            options={commision}
            // value={selectedOption}
            classNamePrefix="react-select"
            defaultValue={commision.find((option) => option.value == percentage)}
            onChange={(selected) => handleCommissionChange(selected, fname, id)}
            placeholder="Select Commission"
            menuPortalTarget={document.body}
            menuPosition="fixed"
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
        )
      },
    },

    {
      header: 'Action',
      cell: ({ row: { original } }) => (
        <div className="text-start">
          <span role="button" onClick={() => navigate(`/dashboard/editagent/${original.id}`, { state: original })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          <span role="button" onClick={() => Deleteagents(setAgent, setloading, showNotification, original?.id)}>
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
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
        data={users}
        rowsPerPageList={pageSizeList}
        pageSize={10}
        tableClass="mb-0"
        theadClass="table-light"
        isexport={true}
        showPagination
      />
    </>
  )
}
export default UserDetailsTable
