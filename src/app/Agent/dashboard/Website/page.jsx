import React from 'react'
import TaskItem from './TaskItem'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import PageMetaData from '@/components/PageMetaData'
// import ComponentContainerCard from '@/components/ComponentContainerCard'
import { Col, CardTitle, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Website() {
  const navigate = useNavigate()
  const image = 'http://localhost:5173/src/assets/images/extra/ill-2.png'
  const title = 'Travel +'
  return (
    <>
      <PageMetaData title="All Website" />

      {/* <ComponentContainerCard title="All Websites"> */}
      <Row className="align-items-center">
        <Col>
          <CardTitle as={'h4'}>All Websites</CardTitle>
        </Col>
        <Col xs="auto">
          <Button color="variant" onClick={() => navigate('/dashboard/addwebsite')}>
            <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Website
          </Button>
        </Col>
      </Row>

      <div className="kanban-board">
        <div className="pt-1 d-flex justify-content-between flex-wrap">
          <TaskItem image={image} title={title} />
          <TaskItem image={image} title={title} />
          <TaskItem image={image} title={title} />
          <TaskItem image={image} title={title} />
          <TaskItem image={image} title={title} />
          <TaskItem image={image} title={title} />
        </div>
      </div>
      {/* </ComponentContainerCard> */}
    </>
    // </PageMetaData
  )
}
