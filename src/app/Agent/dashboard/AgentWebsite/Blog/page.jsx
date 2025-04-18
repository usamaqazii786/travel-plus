/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import BlogTable from './BlogTable'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllBlog } from '@/utils/Services/BlogServices'

export default function Blog() {
  const [Blog, setBlog] = useState([])
  const [, setloading] = useState(false)
  const { id,name } = useParams()

  useEffect(() => {
    getAllBlog(setBlog, setloading, id)
  }, [])
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Blog </CardTitle>
          </Col>

          <Col xs="auto">
            <Button color="variant" onClick={() => navigate(`/agentdashboard/${name}/addBlog/${id}`)}>
              <IconifyIcon icon="fa6-solid:plus" className="me-1" />
              Blog
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Blog && <BlogTable id={id} Blog={Blog} setBlog={setBlog} />}</Suspense>
      </CardBody>
    </Card>
  )
}
