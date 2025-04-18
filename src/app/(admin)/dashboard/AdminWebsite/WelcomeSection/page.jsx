/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import WelcomeTable from './WelcomeTable'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllWelcome } from '@/utils/Services/WelcomeServices'

export default function Welcome() {
  const [Welcome, setWelcome] = useState([])
  const [, setloading] = useState(false)
  const { id, name } = useParams()

  useEffect(() => {
    getAllWelcome(setWelcome, setloading)
  }, [])
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Welcome </CardTitle>
          </Col>
          <Col xs="auto">
            <Button color="variant" onClick={() => navigate(`/dashboard/${name}/home/welcome-section/addWelcome`)}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" />
              Welcome
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Welcome && <WelcomeTable id={id} Welcome={Welcome} setWelcome={setWelcome} />}</Suspense>
      </CardBody>
    </Card>
  )
}
