import React, { Suspense, useEffect, useState } from 'react'
import {
  //  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from 'react-bootstrap'
import Preloader from '@/components/Preloader'

// import DashboardTable from './DahboardTable'
// import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import SupplierTable from './SupplierTable'
// import { useNavigate, useParams } from 'react-router-dom'
import { getAllsuppliersForAgent } from '../../../../../utils/Services/SupplierServices'

export default function Supplier() {
  const [Supplier, setSupplier] = useState([])
  const [, setloading] = useState(false)
  //   const { id } = useParams()

  useEffect(() => {
    getAllsuppliersForAgent(setSupplier, setloading)
  }, [])
  //   const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Supplier </CardTitle>
          </Col>
          {/* <Col xs="auto">
            <Button color="variant" onClick={() => navigate(`/agentdashboard/website/addSupplier/${id}`)}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" />
              Supplier Information
            </Button>
          </Col> */}
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Supplier && <SupplierTable Supplier={Supplier} setSupplier={setSupplier} />}</Suspense>
      </CardBody>
    </Card>
  )
}
