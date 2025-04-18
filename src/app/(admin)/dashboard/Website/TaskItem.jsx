import { CardBody, Card, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useNavigate } from 'react-router-dom'
import { baseURL_FORIMAGE } from '../../../../utils/BaseUrl/BaseUrl'
// import { getKanbanTaskPriorityVariant, getKanbanTaskTagVariant } from '@/utils/variants-icons'
// import { useKanbanContext } from '@/context/useKanbanContext'
const TaskItem = ({ data, HandleDelete }) => {
  const navigate = useNavigate()
  return (
    <Card className="mb-3" style={{ display: 'flex', flexWrap: 'wrap' }}>
      <CardBody style={{ width: '400px' }}>
        <Dropdown className="d-inline-block float-end">
          <DropdownToggle as="span" role="button" className="arrow-none text-secondary">
            <IconifyIcon icon="fa6-solid:ellipsis" className="fs-18" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end" data-popper-placement="bottom-end">
            <DropdownItem as="span" role="button" onClick={() => navigate(`/dashboard/editwebsite/${data?.id}`, { state: data })}>
              <IconifyIcon icon="la:pen" className="fs-16 me-1 align-text-bottom" /> Edit
            </DropdownItem>
            <DropdownItem as="span" role="button" className="text-danger" onClick={() => HandleDelete(data?.id)}>
              <IconifyIcon icon="la:trash" className="fs-16 me-1 align-text-bottom" /> Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <h5 className="my-2 font-14">{data?.title}</h5>
        {/* {description && <p className="text-muted mb-3">{description}</p>} */}

        {data?.image && (
          <p className="p-3 rounded-md">
            <img src={baseURL_FORIMAGE + data?.image} alt="illustration" className="img-fluid mx-auto" />
          </p>
        )}
      </CardBody>
    </Card>
  )
}
export default TaskItem
