/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import ContentTable from './ContentTable'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllContent } from '@/utils/Services/ContentServices'

export default function Content() {
  const [Content, setContent] = useState([])
  const [, setloading] = useState(false)
  const { id, name } = useParams()

  useEffect(() => {
    getAllContent(setContent, setloading, id)
  }, [])
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Content </CardTitle>
          </Col>
          <Col xs="auto">
            <Button color="variant" onClick={() => navigate(`/dashboard/${name}/content-section/addContent`)}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" />
              Content
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Content && <ContentTable id={id} Content={Content} setContent={setContent} />}</Suspense>
      </CardBody>
    </Card>
  )
}
