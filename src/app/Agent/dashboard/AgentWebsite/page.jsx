import React from 'react'
import TaskItem from './TaskItem'
import PageMetaData from '@/components/PageMetaData'
// import ComponentContainerCard from '@/components/ComponentContainerCard'
import { Col, CardTitle, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { baseURL_FORIMAGE } from '../../../../utils/BaseUrl/BaseUrl'
import { useSelector } from 'react-redux'

export default function AgentWebsite() {
  const { id } = useParams() || []
  const { website } = useSelector((state) => state?.website || [])
  const filter = website.filter((e) => e?.id == id)
  const user = JSON.parse(localStorage.getItem('user') || [])
  const onlyName = (url) => {
    return url.replace(/(^\w+:|^)\/\//, '').split('/')[0]
  }
  const Handleedirect = () => {
    window.open(`https://${user?.fname}.${onlyName(filter?.[0].url)}`, '_blank')
  }
  return (
    <>
      <PageMetaData title="All Website" />

      {/* <ComponentContainerCard title="All Websites"> */}
      <Row className="align-items-center">
        <Col>
          <CardTitle as={'h4'}>Website</CardTitle>
        </Col>
      </Row>

      <div className="kanban-board">
        <div className="pt-1 d-flex justify-content-between flex-wrap cursor-pointer" onClick={() => Handleedirect()}>
          <TaskItem
            image={
              baseURL_FORIMAGE + filter?.[0]?.image ||
              'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
            }
            title={filter?.[0]?.title}
          />
        </div>
      </div>
      {/* </ComponentContainerCard> */}
    </>
    // </PageMetaData
  )
}
