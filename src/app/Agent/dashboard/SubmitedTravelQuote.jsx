import React, { Suspense } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
import IconifyIcon from '../../../components/wrappers/IconifyIcon'
import DashboardTable from './DahboardTable'
import { useNavigate } from 'react-router-dom'
import { screenWidth } from '../../../utils/Services/AgentServices'

export default function SubmitedTravelQuote({ setdata, Data }) {
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Submitted Travel Quotes</CardTitle>
          </Col>
          <Col xs="auto">
            <Button color="variant" onClick={() => navigate('/agentdashboard/addtravel')}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" />
              {screenWidth > 500 && 'Travel Quotes'}
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Data && <DashboardTable Data={Data} setdata={setdata} />}</Suspense>
      </CardBody>
    </Card>
  )
}
