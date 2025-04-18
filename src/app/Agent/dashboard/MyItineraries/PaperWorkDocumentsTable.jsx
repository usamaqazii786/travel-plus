import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { DeletePaperWork } from '../../../../utils/Services/PaperworkServices'
import { Button } from 'react-bootstrap'
import {  baseURL_FORIMAGE } from '../../../../utils/BaseUrl/BaseUrl'
// import { useNavigate } from 'react-router-dom'
// import clsx from 'clsx'

const PaperWorkDocumentsTable = ({ Data, setloading, handleSendEmail, showNotification, setdata,id }) => {
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },

    {
      header: 'Documents Name',
      cell: ({ row }) => (
        <a href={baseURL_FORIMAGE + row?.original?.document_path} className="text-dark">
          {baseURL_FORIMAGE + row?.original?.document_path}
        </a>
      ),
    },

    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="d-flex justify-content-evenly">
          <Button color="variant" onClick={() => handleSendEmail(row?.original.id)}>
            <IconifyIcon icon="mdi:email" className="text-secondary fs-18" />
          </Button>
          <span role="button" onClick={() => DeletePaperWork(setloading, row?.original?.id, showNotification, setdata,id)}>
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
      data={Data}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}
export default PaperWorkDocumentsTable
