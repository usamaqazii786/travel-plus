import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
import { Suspense, useEffect, useState } from 'react'
import CommisionTable from './CommissionTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useNavigate } from 'react-router-dom'
import { getAllCommissions } from '../../../../utils/Services/CommissionServices'

export default function SubmittedCommission({ state }) {
  const [commssion, setCommission] = useState([])
  const navigate = useNavigate()
  const [, setloading] = useState(false)
  const filter = commssion.filter((e) => e?.is_draft === 0)

  useEffect(() => {
    if (state) {
      setCommission(state)
    } else {
      getAllCommissions(setCommission, setloading)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col>
                <CardTitle as={'h4'}>Submitted Commission</CardTitle>
              </Col>
              <Col xs="auto">
                <button className="btn btn-primary" onClick={() => navigate('/agentdashboard/addcommision')}>
                  <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Commission
                </button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="pt-0">
            <Suspense fallback={<Preloader />}>{commssion && <CommisionTable commssion={filter} />}</Suspense>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
