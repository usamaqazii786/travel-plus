import React, { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import BannerTable from './BannerTable'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllBanner } from '@/utils/Services/BannerServices'

export default function Banner() {
  const [Banner, setBanner] = useState([])
  const [, setloading] = useState(false)
  const { name } = useParams()

  useEffect(() => {
    getAllBanner(setBanner, setloading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Hero </CardTitle>
          </Col>
          <Col xs="auto">
            <Button color="variant" onClick={() => navigate(`/dashboard/${name}/hero-section/addBanner`)}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" />
              Hero
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Banner && <BannerTable Banner={Banner} setBanner={setBanner} />}</Suspense>
      </CardBody>
    </Card>
  )
}
