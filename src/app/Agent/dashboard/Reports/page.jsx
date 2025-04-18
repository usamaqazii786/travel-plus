import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
import { Suspense, useState } from 'react'
import ReportTable from './ReportTable'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Filter from './Filter'
export default function Report() {
  const sampleData = [
    {
      email: 'john.doe@example.com',
      state: 'California',
      zip_code: '90001',
      subadmin: {
        fname: 'John', // Agent's first name
        percentage: '15', // Commission percentage
      },
      business_name: 'Doe Enterprises', // Supplier
      tax_classification: 'LLC', // Supplier Type
      date: '2024-06-15', // Arrival Date
      created_at: '2024-06-10T12:34:56.000000Z', // Booking Date
    },
    {
      email: 'jane.smith@example.com',
      state: 'Texas',
      zip_code: '75001',
      subadmin: {
        fname: 'Jane', // Agent's first name
        percentage: '10', // Commission percentage
      },
      business_name: 'Smith Industries', // Supplier
      tax_classification: 'Corporation', // Supplier Type
      date: '2024-07-20', // Arrival Date
      created_at: '2024-07-18T09:10:22.000000Z', // Booking Date
    },
    {
      email: 'bob.jones@example.com',
      state: 'New York',
      zip_code: '10001',
      subadmin: {
        fname: 'Bob', // Agent's first name
        percentage: '20', // Commission percentage
      },
      business_name: 'Jones Ltd.', // Supplier
      tax_classification: 'Partnership', // Supplier Type
      date: '2024-08-05', // Arrival Date
      created_at: '2024-08-02T15:20:30.000000Z', // Booking Date
    },
    {
      email: 'alice.green@example.com',
      state: 'Florida',
      zip_code: '33101',
      subadmin: {
        fname: 'Alice', // Agent's first name
        percentage: '25', // Commission percentage
      },
      business_name: 'Green Solutions', // Supplier
      tax_classification: 'S-Corporation', // Supplier Type
      date: '2024-09-10', // Arrival Date
      created_at: '2024-09-05T14:50:18.000000Z', // Booking Date
    },
    {
      email: 'mike.white@example.com',
      state: 'Nevada',
      zip_code: '89501',
      subadmin: {
        fname: 'Mike', // Agent's first name
        percentage: '12', // Commission percentage
      },
      business_name: 'White Tech', // Supplier
      tax_classification: 'Sole Proprietor', // Supplier Type
      date: '2024-10-01', // Arrival Date
      created_at: '2024-09-28T11:30:45.000000Z', // Booking Date
    },
  ]
  const [open, setopen] = useState(false)
  const handlefilter = () => {
    setopen(true)
  }
  const handleClose = () => {
    setopen(false)
  }
  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col>
                <CardTitle as={'h4'}>Reports</CardTitle>
              </Col>
              <Col xs="auto">
                <Button color='variant' onClick={handlefilter}>
                  <IconifyIcon icon="fa6-solid:filter" className="me-1" /> Filter
                </Button>
                {/* <button className="btn btn-primary">
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Invite Agent
                  </button> */}
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="pt-0">
            <Suspense fallback={<Preloader />}>{sampleData && <ReportTable wnine={sampleData} />}</Suspense>
          </CardBody>
        </Card>
      </Col>
      <Filter handleClose={handleClose} open={open} />
    </Row>
  )
}
