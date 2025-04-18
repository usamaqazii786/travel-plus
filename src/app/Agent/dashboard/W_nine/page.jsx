import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
import { Suspense, useEffect, useState } from 'react'

import WnineTable from './WnineTable'
import { getAllpdfwnineAgent } from '../../../../utils/Services/AgentServices'

export default function Wnine() {
  const [wnine, setwnine] = useState([])
  const [pdfurl, setpdfurl] = useState([])
  const [, setloading] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    getAllpdfwnineAgent(setwnine, setloading, setpdfurl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col>
                <CardTitle as={'h4'}>W9</CardTitle>
              </Col>
              {/* <Col xs="auto"> */}
              {/* <button className="btn bg-primary-subtle text-dark me-1" onClick={() => navigate('/dashboard/addagent')}>
                <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Agent
              </button> */}
              {/* <button className="btn btn-primary">
              <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Invite Agent
            </button> */}
              {/* </Col> */}
            </Row>
          </CardHeader>
          <CardBody className="pt-0">
            <Suspense fallback={<Preloader />}>{wnine && <WnineTable UserPassword={user.password} wnine={wnine} pdfurl={pdfurl} />}</Suspense>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
