import React, { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
// import DashboardTable from './DahboardTable'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import MyItinerariesTable from './MyItinerariesTable'
import ContactTable from './ContactTable'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllContact } from '@/utils/Services/ContactServices'

export default function Contact() {
  const [Contact, setContact] = useState([])
  const [, setloading] = useState(false)
  const { id ,name} = useParams()

  useEffect(() => {
    getAllContact(setContact, setloading, id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as={'h4'}>Contact Information</CardTitle>
          </Col>
          {Contact?.length === 0 && (
            <Col xs="auto">
              <Button color="variant" onClick={() => navigate(`/agentdashboard/${name}/addContact/${id}`)}>
                <IconifyIcon icon="fa6-solid:plus" className="me-1" />
                Contact Information
              </Button>
            </Col>
          )}
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        <Suspense fallback={<Preloader />}>
          {Contact?.length !== 0 && <ContactTable Contact={Contact} id={id || null} setContact={setContact} />}
        </Suspense>
      </CardBody>
    </Card>
  )
}
