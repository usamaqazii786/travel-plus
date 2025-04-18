/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import ExpertTable from './ExpertTable'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getAllExpert } from '@/utils/Services/ExpertServices'

export default function Expert() {
  const [Expert, setExpert] = useState([])
  const [, setloading] = useState(false)
  const { id } = useParams()
  var { pathname } = useLocation()
  pathname = pathname.split('/')[2]

  useEffect(() => {
    getAllExpert(setExpert, setloading)
  }, [])
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Expert </CardTitle>
          </Col>
          <Col xs="auto">
            <Button color="variant" onClick={() => navigate(`/dashboard/${pathname}/services/travel-services/expert/addExpert`)}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" />
              Expert
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Expert && <ExpertTable id={id} Expert={Expert} setExpert={setExpert} />}</Suspense>
      </CardBody>
    </Card>
  )
}
