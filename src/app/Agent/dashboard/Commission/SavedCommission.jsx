import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
import { Suspense, useEffect, useState } from 'react'
import CommisionTable from './CommissionTable'
import { getAllCommissionsSave } from '../../../../utils/Services/CommissionServices'

export default function SavedCommission({issaved,state}) {
  const [commssion, setCommission] = useState([])
  const [, setloading] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const filter = commssion.filter((e) => e?.is_draft == 1)

  useEffect(() => {
        if (state) {
          setCommission(state)
        } else {
          getAllCommissionsSave(setCommission, setloading, user)
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
                <CardTitle as={'h4'}>Commision</CardTitle>
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
            <Suspense fallback={<Preloader />}>{commssion && <CommisionTable commssion={filter}  issaved={issaved}/>}</Suspense>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
