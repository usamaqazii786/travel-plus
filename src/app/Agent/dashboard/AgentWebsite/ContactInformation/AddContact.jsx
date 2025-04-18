import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFormInput from '@/components/form/TextFormInput'
import { Button, Card, Container, Form, Row, Col, Spinner } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useNotificationContext } from '@/context/useNotificationContext'
import { AddContactService } from '@/utils/Services/ContactServices'
import { validationSchema } from './AddContactSchema'

export default function AddContact() {
  const { showNotification } = useNotificationContext()
  const { id } = useParams()
  const { state } = useLocation()
 
  const [isloading, setloading] = useState(false)
  const navigate = useNavigate()
  const defaultValues = {
    email: state?.email || '',
    phone: state?.phone_no || '',
    location: state?.location || '',
  }
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const onSubmit = (data) => {
    AddContactService(data, navigate, showNotification, setloading, id)
  }

  return (
    <Container>
      <Card className="mb-3 p-4" style={{ width: '400px', margin: '0 auto', height: 'auto' }}>
        <h3>Create New Contact</h3>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={12} className="mt-3">
              <TextFormInput name="email" label="Email" placeholder="Enter Email" control={control} />
            </Col>
            <Col md={12} className="mt-3">
              <TextFormInput name="phone" label="Phone" type='number' placeholder="Enter phone" control={control} />
            </Col>
            <Col md={12} className="mt-3">
              <TextFormInput name="location" label="Location" placeholder="Enter Location" control={control} />
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button variant="primary" style={{ width: '100%' }} type="submit" disabled={isloading}>
              <span>SUBMIT</span>
              {isloading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  )
}
