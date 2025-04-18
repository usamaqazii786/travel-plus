import { CardBody, Card} from 'react-bootstrap'
// import { getKanbanTaskPriorityVariant, getKanbanTaskTagVariant } from '@/utils/variants-icons'
// import { useKanbanContext } from '@/context/useKanbanContext'
const TaskItem = ({ image, title }) => {
  return (
    <Card className="mb-3" style={{ display: 'flex', flexWrap: 'wrap' }}>
      <CardBody style={{ width: '400px' }}>
        <h5 className="my-2 font-14">{title}</h5>
        {/* {description && <p className="text-muted mb-3">{description}</p>} */}

        {image && (
          <p className="p-3 rounded-md">
            <img src={image} alt="illustration" className="img-fluid mx-auto" />
          </p>
        )}
      </CardBody>
    </Card>
  )
}
export default TaskItem
