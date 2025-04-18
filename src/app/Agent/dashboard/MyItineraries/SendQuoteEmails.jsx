import React, { Suspense, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
import SendQuoteEmailTable from './SendQuoteEmailTable'

export default function SendQuoteEmails() {
  const [Data] = useState([
    { name: 'Cruise' },
    { name: 'Theme Park Package' },
    { name: 'Hotel Only' },
    { name: 'All-Inclusive' },
    { name: 'Travel Package' },
  ])
  return (
    <Card className="mb-3 row p-2">
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Send Quote Emails</CardTitle>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Data && <SendQuoteEmailTable Data={Data} />}</Suspense>
      </CardBody>
    </Card>
  )
}
