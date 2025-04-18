import React, { Suspense, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import { useNavigate } from 'react-router-dom'
import PaymentNotificationTable from './PaymentNotificationTable'
import { getAllpayments } from '../../../../utils/Services/PaymentServices'
import { screenWidth } from '../../../../utils/Services/AgentServices'

export default function PaymentNotification() {
  const [payment, setpayment] = useState([])
  const [, setloading] = useState(false)

  useEffect(() => {
    getAllpayments(setpayment, setloading)
  }, [])
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle>Payment Notification</CardTitle>
          </Col>
          <Col xs="auto">
            <button className="btn btn-primary " onClick={() => navigate('/agentdashboard/addpayment')}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" />
              {screenWidth > 500 && 'Payment Notification'}
            </button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{payment && <PaymentNotificationTable payment={payment} />}</Suspense>
      </CardBody>
    </Card>
  )
}
