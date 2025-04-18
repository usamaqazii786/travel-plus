import React, { Suspense} from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import MyItinerariesTable from './MyItinerariesTable'


export default function TableRightDashboardAgent({loading,Data,setdatait,setloadingit}) {
 
  return (
    <>
      {loading ? (
        <div>
          <Preloader />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col>
                <CardTitle as={'h4'}>Travel Itineraries</CardTitle>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="pt-0">
            <Suspense fallback={<Preloader />}>{Data && <MyItinerariesTable Data={Data} setdatait={setdatait} setloadingit={setloadingit}/>}</Suspense>
          </CardBody>
        </Card>
      )}
    </>
  )
}
