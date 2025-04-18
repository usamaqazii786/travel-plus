import React, { Suspense, useEffect, useState } from 'react'
import PaymentTable from './PaymentTable.jsx'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

import Preloader from '@/components/Preloader'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import CreatePaymentNotification from './CreatePaymentNotification.jsx'
import { getAllpaymentsInformation, getAllpaymentsItineries } from '../../../../utils/Services/PaymentServices.js'
import { useNavigate } from 'react-router-dom'
import PaymentCard from '../PaymentNotification/PaymentCard.jsx'

import { withSwal } from 'react-sweetalert2'

const Payment = withSwal((props) => {
  const { id } = props
  const navigate = useNavigate()

  const [, setLoading] = useState(false)

  const [Data, setData] = useState(null)
  const [paymentInformation, setpaymentInformation] = useState(null)

  const [open, setopen] = useState(false)

  useEffect(() => {
    getAllpaymentsItineries(setData, setLoading, id)
    getAllpaymentsInformation(setpaymentInformation, setLoading, id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const HandleOpen = () => {
    setopen(true)
  }
  const handleClose = () => {
    setopen(false)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Row className="align-items-center">
            <Col>{Data?.length === 0 && <CardTitle as={'h4'}>There is no payment information available for this travel itinerary.</CardTitle>}</Col>
            <Col xs="auto">
              <Button color="variant" onClick={() => HandleOpen()} className="ms-2">
                <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Create New Payment
              </Button>
              <Button color="variant" onClick={() => navigate('/agentdashboard/addpayment')} className="ms-2">
                <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Create Payment Notification
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody className="pt-0">
          <Suspense fallback={<Preloader />}>{Data && <PaymentTable Data={Data} />}</Suspense>
        </CardBody>
      </Card>
      <CreatePaymentNotification handleClose={handleClose} open={open} id={id} setData={setData} setloadingGet={setLoading} />
      {paymentInformation?.length !== 0 && <PaymentCard data={paymentInformation} id={id} />}
    </>
  )
})
export default Payment
