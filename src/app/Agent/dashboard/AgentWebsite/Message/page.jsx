import React, { Suspense, useEffect, useState } from 'react'
import {
  //  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
// import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import MessageTable from './MessageTable'
// import { useNavigate, useParams } from 'react-router-dom'
import { getAllMessage } from '@/utils/Services/MessageServices'
import { useParams } from 'react-router-dom'

export default function Message() {
  const { id } = useParams()
  const [Message, setMessage] = useState([])
  const [, setloading] = useState(false)
  //   const { id } = useParams()

  useEffect(() => {
    getAllMessage(setMessage, setloading, id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //   const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Message Information</CardTitle>
          </Col>
          {/* <Col xs="auto">
            <Button color="variant" onClick={() => navigate(`/agentdashboard/website/addMessage/${id}`)}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" />
              Message Information
            </Button>
          </Col> */}
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Message && <MessageTable websiteId={id} Message={Message} setMessage={setMessage} />}</Suspense>
      </CardBody>
    </Card>
  )
}
