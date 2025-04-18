import ReactTable from '@/components/Table'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useNavigate, useParams } from 'react-router-dom'
// import { useState } from 'react'
// import { useNotificationContext } from '@/context/useNotificationContext'
// import { ImageDelete } from '@/utils/Services/ImageServices'

const ImageTable = ({ Image }) => {
  const navigate = useNavigate()
  const { name } = useParams()
  // const [, setloading] = useState(false)
  // const { showNotification } = useNotificationContext()

  // Define columns based on the provided data
  // const onlyName = (url) => {
  //   return url.replace(/(^\w+:|^)\/\//, '').split('/')[0]
  // }
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
   
 
    // {
    //   header: 'Website Url',
    //   cell: ({ row }) => (
    //     <a href={`https://${row?.original?.subadmin?.fname}.${onlyName(row?.original?.website?.url)}`} target="_blank" className="text-dark">
    //       View {row.original.website.title}
    //     </a>
    //   ),
    // },
    {
      header: 'Left Image',
      cell: ({
        row: {
          original: { image_1 },
        },
      }) => (
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <img src={image_1} className="me-2 thumb-md align-self-center rounded" alt="..." />
          </div>
        </div>
      ),
    },
    {
      header: 'Right Image',
      cell: ({
        row: {
          original: { image_2 },
        },
      }) => (
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <img src={image_2} className="me-2 thumb-md align-self-center rounded" alt="..." />
          </div>
        </div>
      ),
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div className="text-start">
          <span role="button" onClick={() => navigate(`/dashboard/${name}/image-section/addImage`, { state: row.original })}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18" />
          </span>
          {/* <span role="button" onClick={() => ImageDelete(setloading, row?.original?.id, showNotification, setImage)}>
            <IconifyIcon icon="la:trash-alt" className="text-secondary fs-18" />
          </span> */}
        </div>
      ),
    },
  ]

  const pageSizeList = [2, 5, 10, 20, 50]

  return (
    <ReactTable
      columns={columns}
      data={Image}
      rowsPerPageList={pageSizeList}
      pageSize={10}
      tableClass="mb-0"
      theadClass="table-light"
      showPagination
    />
  )
}

export default ImageTable
