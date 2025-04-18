import React, { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import SupplierTable from './SupplierTable'
import { useNavigate } from 'react-router-dom'
import { getAllsuppliers } from '@/utils/Services/SupplierServices'

export default function Supplier() {
  const [Supplier, setSupplier] = useState([])
  const [, setloading] = useState(false)

  useEffect(() => {
    getAllsuppliers(setSupplier, setloading)
  }, [])
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Suppliers</CardTitle>
          </Col>
          <Col xs="auto">
            <Button color="variant" onClick={() => navigate('/dashboard/addSupplier')}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" />
              Suppliers
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Supplier && <SupplierTable Supplier={Supplier} setSupplier={setSupplier} />}</Suspense>
      </CardBody>
    </Card>
  )
}
