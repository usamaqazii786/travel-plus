import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
import { Suspense, useEffect, useState } from 'react'
import ReportTable from './ReportTable'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Filter from './Filter'
import { ReportService } from '../../../../utils/Services/ReportServices'
export default function Report() {
  const [sampleData, setdata] = useState([])
  const [, setloading] = useState(false)

  useEffect(() => {
    ReportService(setdata, setloading)
  }, [])
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
      <Filter handleClose={handleClose} open={open}  setdata={setdata}/>
    </Row>
  )
}
