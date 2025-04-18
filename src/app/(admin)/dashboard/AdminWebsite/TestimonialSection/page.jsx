/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import TestimonialTable from './TestimonialTable'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllTestimonial } from '@/utils/Services/TestimonialServices'

export default function Testimonial() {
  const [Testimonial, setTestimonial] = useState([])
  const [, setloading] = useState(false)
  const { name } = useParams()

  useEffect(() => {
    getAllTestimonial(setTestimonial, setloading)
  }, [])
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Testimonial </CardTitle>
          </Col>
          <Col xs="auto">
            <Button color="variant" onClick={() => navigate(`/dashboard/${name}/Testimonial-section/addTestimonial`)}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" />
              Testimonial
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Testimonial && <TestimonialTable Testimonial={Testimonial} setTestimonial={setTestimonial} />}</Suspense>
      </CardBody>
    </Card>
  )
}
