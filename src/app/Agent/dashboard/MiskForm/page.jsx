import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
import { Suspense, useEffect, useState } from 'react'

// import WnineTable from './MiskTable'
import MiskTable from './MiskTable'
import { getAllpdfmiskAgent } from '../../../../utils/Services/AgentServices'

export default function Misk() {
  const [wnine, setwnine] = useState([])
  const [pdfurl, setpdfurl] = useState([])
  const [, setloading] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    getAllpdfmiskAgent(setwnine, setloading, setpdfurl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col>
                <CardTitle as={'h4'}>1099</CardTitle>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="pt-0">
            <Suspense fallback={<Preloader />}>{wnine && <MiskTable UserPassword={user.password} wnine={wnine} pdfurl={pdfurl} />}</Suspense>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
