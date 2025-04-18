import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
import { Suspense, useEffect, useState } from 'react'

import WEightTable from './WEightTable'
import { getAllpdfwEight } from '../../../../utils/Services/AgentServices'

export default function WEight() {
  const [wEight, setwEight] = useState([])
  const [, setloading] = useState(false)

  useEffect(() => {
    getAllpdfwEight(setwEight, setloading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col>
                <CardTitle as={'h4'}>W8</CardTitle>
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
            <Suspense fallback={<Preloader />}>{wEight && <WEightTable wEight={wEight} setdata={setwEight} setloading={setloading} />}</Suspense>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
