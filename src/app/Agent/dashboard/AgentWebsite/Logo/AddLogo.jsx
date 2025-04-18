import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Container, Form, Row, Col, Spinner } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useNotificationContext } from '@/context/useNotificationContext'
import { AddLogoService } from '@/utils/Services/LogoServices'
import { validationSchema } from './AddLogoSchema'

export default function AddLogo() {
  const { showNotification } = useNotificationContext()
  const { id } = useParams()
  const { state } = useLocation()

  const [isloading, setloading] = useState(false)
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState(
    state?.logo ||
      'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
  )
  const defaultValues = {
    logo: state?.logo || null,
  }
  const { handleSubmit, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const onSubmit = (data) => {
    AddLogoService(data, navigate, showNotification, setloading, id)
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      setValue('logo', file)
    }
  }

  return (
    <Container>
      <Card className="mb-3 p-4" style={{ width: '400px', margin: '0 auto', height: 'auto' }}>
        <h3>Create New Logo</h3>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={12} className="mt-3">
              <div
                className="d-flex justify-content-center"
                style={{ cursor: 'pointer' }}
                onClick={() => document.getElementById('imageInputs').click()}>
                <img src={imagePreview} height={120} className="rounded-circle" alt="Profile Avatar" />
              </div>
            </Col>
            <Col lg={12} className="mb-3">
              <input id="imageInputs" type="file" name="logo" onChange={handleImageChange} hidden />
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
