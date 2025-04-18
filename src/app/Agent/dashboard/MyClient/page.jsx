import React, { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import ClientTable from './ClientTable'
import { useNavigate } from 'react-router-dom'
import { getAllclients } from '../../../../utils/Services/ClientServices'

export default function Client() {
  const [client, setclient] = useState([])
  const [, setloading] = useState(false)

  useEffect(() => {
    getAllclients(setclient, setloading)
  }, [])
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>My Clients</CardTitle>
          </Col>
          <Col xs="auto">
            <Button color='variant' onClick={() => navigate('/agentdashboard/addclient')}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" />
              Clients
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{client && <ClientTable client={client} setclient={setclient} />}</Suspense>
      </CardBody>
    </Card>
  )
}
