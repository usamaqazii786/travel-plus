import React, { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import LogoTable from './LogoTable'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllLogo } from '@/utils/Services/LogoServices'

export default function Logo() {
  const [Logo, setLogo] = useState([])
  const [, setloading] = useState(false)
  const { id ,name} = useParams()

  useEffect(() => {
    getAllLogo(setLogo, setloading, id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Logo </CardTitle>
          </Col>
          {Logo?.length === 0 && (
            <Col xs="auto">
              <Button color="variant" onClick={() => navigate(`/agentdashboard/${name}/addLogo/${id}`)}>
                <IconifyIcon icon="fa6-solid:plus" className="me-1" />
                Logo
              </Button>
            </Col>
          )}
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Logo && <LogoTable Logo={Logo} id={id} setLogo={setLogo} />}</Suspense>
      </CardBody>
    </Card>
  )
}
