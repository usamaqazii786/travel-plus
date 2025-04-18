import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFormInput from '@/components/form/TextFormInput'
import { Button, Card, Container, Form, Row, Col, Spinner } from 'react-bootstrap'
import { validationSchema } from './AddContactSchema'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useNotificationContext } from '@/context/useNotificationContext'
import { EditContactService } from '@/utils/Services/ContactServices'

export default function EditContact() {
  const { showNotification } = useNotificationContext()
  const [isloading, setloading] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()
  const { id } = useParams()

  const defaultValues = {
    supplier_name: state?.supplier_name || '',
  }
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const onSubmit = (data) => {
    EditContactService(data, navigate, showNotification, setloading, id)
  }

  return (
    <Container>
      <Card className="mb-3 p-4" style={{ width: '400px', margin: '0 auto', height: 'auto' }}>
        <h3>Update Contact</h3>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={12} className="mt-3">
              <TextFormInput name="email" label="Email" placeholder="Enter Email" control={control} />
            </Col>
            <Col md={12} className="mt-3">
              <TextFormInput name="phone" label="Phone" placeholder="Enter phone" control={control} />
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
