import React, { Suspense } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
import DashboardTable from './DahboardTable'

export default function SavedTravelQuote({ setdata, Data }) {
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Saved Travel Quotes</CardTitle>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Data && <DashboardTable Data={Data} setdata={setdata} saved={true} />}</Suspense>
      </CardBody>
    </Card>
  )
}
