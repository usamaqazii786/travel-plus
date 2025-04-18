import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Container, Form, Row, Col, Spinner } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNotificationContext } from '@/context/useNotificationContext'
import { AddWelcomeService, EditWelcomeService } from '@/utils/Services/WelcomeServices'
import { validationSchema } from './AddWelcomeSchema'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
export default function AddWelcome() {
  const { showNotification } = useNotificationContext()
  const [isloading, setloading] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()
  const defaultValues = {
    content: state?.content || '',
  }

  const { handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })
  const value = watch('content')
  const onSubmit = (data) => {
    if (state?.id) {
      EditWelcomeService(data, navigate, showNotification, setloading, state?.id)
    } else {
      AddWelcomeService(data, navigate, showNotification, setloading)
    }
  }

  return (
    <Container>
      <Card className="mb-3 p-4" style={{ width: 'auto', margin: '0 auto', height: 'auto' }}>
        <h3>Create Welcome </h3>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <label>Enter Welcome </label>
            <Col md={12} className="mt-1">
              <ReactQuill theme="snow" value={value} onChange={(e) => setValue('content', e)} />
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
