import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
import { Suspense, useEffect, useState } from 'react'

// import WnineTable from './MiskTable'
import MiskTable from './MiskTable'
import { getAllpdfmisk } from '../../../../utils/Services/AgentServices'
import { axiosInstance } from '../../../../utils/AxiosInstance'
import { useNotificationContext } from '../../../../context/useNotificationContext'

export default function Misk() {
  const [wnine, setwnine] = useState([])
  const { showNotification } = useNotificationContext()
  const [, setloading] = useState(false)

  useEffect(() => {
    getAllpdfmisk(setwnine, setloading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const HandleDelete = async (id) => {
    try {
      const response = await axiosInstance.get(`/admin/agent/misc/delete/${id}`)
      if (response?.data?.status === true) {
        setloading(false)
        showNotification({
          message: response.data.message,
          variant: 'success',
        })
        getAllpdfmisk(setwnine, setloading)
      }
    } catch (error) {
      setloading(false)
      console.log(error)
      showNotification({
        message: error.response.data.message,
        variant: 'error',
      })
    }
  }

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col>
                <CardTitle as={'h4'}>1099</CardTitle>
              </Col>
              {/* <Col xs="auto"> */}
              {/* <button className="btn bg-primary-subtle text-dark me-1" onClick={() => navigate('/dashboard/addagent')}>
                <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Agent
              </button> */}
              {/* <button className="btn btn-primary">
              <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Invite Agent
            </button> */}
              {/* </Col> */}
            </Row>
          </CardHeader>
          <CardBody className="pt-0">
            <Suspense fallback={<Preloader />}>{wnine && <MiskTable wnine={wnine} HandleDelete={HandleDelete} />}</Suspense>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
