import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
import { Suspense, useEffect, useState } from 'react'
import CommisionTable from '../../../(admin)/dashboard/Commission/CommissionTable'
import { getAllCommissionsSupplier } from '../../../../utils/Services/CommissionServices'
export default function SupplierCommission() {
  const [commssion, setCommission] = useState([])

  const [, setloading] = useState(false)

  useEffect(() => {
    getAllCommissionsSupplier(setCommission, setloading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col>
                <CardTitle as={'h4'}>Supplier Commission</CardTitle>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="pt-0">
            <Suspense fallback={<Preloader />}>{commssion && <CommisionTable commssion={commssion} />}</Suspense>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
