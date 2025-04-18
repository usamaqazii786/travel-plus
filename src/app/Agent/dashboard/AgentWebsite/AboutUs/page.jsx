/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import AboutTable from './AboutTable'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllAbout } from '@/utils/Services/AboutServices'

export default function About() {
  const [About, setAbout] = useState([])
  const [, setloading] = useState(false)
  const { id ,name} = useParams()

  useEffect(() => {
    getAllAbout(setAbout, setloading, id)
  }, [])
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>About Us</CardTitle>
          </Col>
          {About?.length === 0 && (
            <Col xs="auto">
              <Button color="variant" onClick={() => navigate(`/agentdashboard/${name}/addAbout/${id}`)}>
                <IconifyIcon icon="fa6-solid:plus" className="me-1" />
                About Us
              </Button>
            </Col>
          )}
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{About && <AboutTable id={id} About={About} setAbout={setAbout} />}</Suspense>
      </CardBody>
    </Card>
  )
}
