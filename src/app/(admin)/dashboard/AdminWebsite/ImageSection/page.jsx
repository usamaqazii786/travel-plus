import React, { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import ImageTable from './ImageTable'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllImage } from '@/utils/Services/ImageServices'

export default function Image() {
  const [Image, setImage] = useState([])
  const [, setloading] = useState(false)
  const { name } = useParams()

  useEffect(() => {
    getAllImage(setImage, setloading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Image </CardTitle>
          </Col>
          {/* {Image?.length === 0 && ( */}
            <Col xs="auto">
              <Button color="variant" onClick={() => navigate(`/dashboard/${name}/image-section/addImage`)}>
                <IconifyIcon icon="fa6-solid:plus" className="me-1" />
                Image
              </Button>
            </Col>
          {/* )} */}
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>{Image && <ImageTable Image={Image}  setImage={setImage} />}</Suspense>
      </CardBody>
    </Card>
  )
}
