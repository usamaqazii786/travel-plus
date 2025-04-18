import React, { useEffect, useState } from 'react'
import TaskItem from './TaskItem'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import PageMetaData from '@/components/PageMetaData'
// import ComponentContainerCard from '@/components/ComponentContainerCard'
import { Col, CardTitle, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DeleteWebsite, getAllWebsites } from '../../../../utils/Services/WebsiteServices'
import { useNotificationContext } from '../../../../context/useNotificationContext'




export default function Website() {

  const [websites, setwebsite] = useState([])
  const [, setloading] = useState(false)
  const { showNotification } = useNotificationContext()

  useEffect(() => {
    getAllWebsites(setwebsite, setloading)

  }, [])
  const HandleDelete = (id) => {
    DeleteWebsite(setloading, id, showNotification,setwebsite)
    // setWebsite(website.filter((e) => e._id!== id))
  }
  const navigate = useNavigate()
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
          {websites.map((e) => {
            return <TaskItem data={e} HandleDelete={HandleDelete} />
          })}
        </div>
      </div>
      {/* </ComponentContainerCard> */}
    </>
    // </PageMetaData
  )
}
