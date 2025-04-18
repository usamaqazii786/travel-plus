import React, { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import TutorialsTable from './TutorialsTable'
import { useNavigate } from 'react-router-dom'
import { getAllTutorialss } from '../../../../utils/Services/TutorialsServices'

export default function Tutorials() {
  const [Tutorials, setTutorials] = useState([])
  const [, setloading] = useState(false)

  useEffect(() => {
    getAllTutorialss(setTutorials, setloading)
  }, [])
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Tutorials</CardTitle>
          </Col>
          <Col xs="auto">
            <Button color="variant" onClick={() => navigate('/dashboard/addTutorials')}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" />
              Tutorials
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Tutorials && <TutorialsTable Tutorials={Tutorials} setTutorials={setTutorials} />}</Suspense>
      </CardBody>
    </Card>
  )
}
