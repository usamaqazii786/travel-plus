import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFormInput from '@/components/form/TextFormInput'
import { Button, Card, Container, Form, Row, Col, Spinner } from 'react-bootstrap'
// import { validationSchema } from './AddSupplierSchema'
import { useNavigate } from 'react-router-dom'
import { useNotificationContext } from '@/context/useNotificationContext'
import { AddsupplierService } from '@/utils/Services/SupplierServices'
import { validationSchema } from './AddSupplierSchema'

export default function AddSupplier() {
  const { showNotification } = useNotificationContext()
  const [isloading, setloading] = useState(false)
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data) => {
    AddsupplierService(data, navigate, showNotification, setloading)
  }

  return (
    <Container>
      <Card className="mb-3 p-4 " style={{ width: '400px', margin: '0 auto', height: '300px' }}>
        <h3>Create New Supplier</h3>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={12}>
              <TextFormInput name="supplier_name" label="Supplier Name" control={control} />
            </Col>
          </Row>

          <div className="text-center mt-2 ">
            <Button variant="primary" className="d-flex justify-content-center" style={{ width: '100%' }} type="submit">
              <span className="mt-1">SUBMIT </span> {isloading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  )
}
