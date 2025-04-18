import React, { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import PromotionTable from './PromotionTable'
import { useNavigate } from 'react-router-dom'
import { Featured, getAllPromotions } from '../../../../utils/Services/PromotionServices'
import { useNotificationContext } from '../../../../context/useNotificationContext'

export default function Promotion() {
  const [Promotion, setPromotion] = useState([])
  const { showNotification } = useNotificationContext()
  const [, setloading] = useState(false)
  const handleApproved = (status,id) => {
    Featured(status,id, setloading, setPromotion, setloading, showNotification)
  }
  useEffect(() => {
    getAllPromotions(setPromotion, setloading)
  }, [])
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Promotions</CardTitle>
          </Col>
          <Col xs="auto">
            <Button color="variant" onClick={() => navigate('/dashboard/addPromotion')}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" />
              Promotions
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>
          {Promotion && <PromotionTable handleApproved={handleApproved} Promotion={Promotion} setPromotion={setPromotion} />}
        </Suspense>
      </CardBody>
    </Card>
  )
}
