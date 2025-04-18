import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFormInput from '@/components/form/TextFormInput'
import { Button, Card, Container, Form, Row, Col, Spinner } from 'react-bootstrap'
// import { validationSchema } from './AddPromotionSchema'
import { useNavigate } from 'react-router-dom'
import { useNotificationContext } from '@/context/useNotificationContext'

import { validationSchema } from './AddPromotionSchema'
import { AddPromotionService } from '../../../../utils/Services/PromotionServices'

export default function AddPromotion() {
  const { showNotification } = useNotificationContext()
  const [isloading, setloading] = useState(false)
  const navigate = useNavigate()
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const [imagePreview, setImagePreview] = useState(
    'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
  )

  const onSubmit = (data) => {
    AddPromotionService(data, navigate, showNotification, setloading)
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      setValue('image', file)
    }
  }

  return (
    <Container>
      <Card className="mb-3 p-4 " style={{ width: 'auto', margin: '0 auto', height: 'auto' }}>
        <h3>Create New Promotion</h3>

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
            <Col md={12}>
              <TextFormInput name="url" label="Promotion Link" control={control} />
            </Col>
            <Col lg={12} className="mb-3">
              <input id="imageInputs" type="file" name="image" onChange={handleImageChange} hidden />
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
