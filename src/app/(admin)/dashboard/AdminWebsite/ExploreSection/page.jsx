/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import ExploreTable from './ExploreTable'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllExplore } from '@/utils/Services/ExploreServices'

export default function Explore() {
  const [Explore, setExplore] = useState([])
  const [, setloading] = useState(false)
  const { name } = useParams()

  useEffect(() => {
    getAllExplore(setExplore, setloading)
  }, [])
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Explore </CardTitle>
          </Col>
          <Col xs="auto">
            <Button color="variant" onClick={() => navigate(`/dashboard/${name}/explore-section/addExplore`)}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" />
              Explore
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Explore && <ExploreTable Explore={Explore} setExplore={setExplore} />}</Suspense>
      </CardBody>
    </Card>
  )
}
