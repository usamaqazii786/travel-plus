import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Container, Form, Row, Col, Spinner } from 'react-bootstrap'
import { validationSchema } from './AddImageSchema'
import { AddImageService,EditImageService } from '../../../../../utils/Services/ImageServices'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNotificationContext } from '../../../../../context/useNotificationContext'

export default function AddImage() {
  const [isloading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { showNotification } = useNotificationContext()
  const [imagePreview1, setImagePreview1] = useState(null)
  const [imagePreview2, setImagePreview2] = useState(null)
  const { state } = useLocation()
  const { handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      image_1: state?.image_1 || null,
      image_2: state?.image_2 || null,
    },
  })
  

  const onSubmit = (data) => {
    console.log(data)
    if (state?.id) {
      EditImageService(data, navigate, showNotification, setLoading, state?.id)
    } else {
      AddImageService(data, navigate, showNotification, setLoading)
    }
  }

  const handleImageChange = (e, imageNumber) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (imageNumber === 1) {
          setImagePreview1(reader.result)
          setValue('image_1', file)
        } else {
          setImagePreview2(reader.result)
          setValue('image_2', file)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  useEffect(() => {
    setImagePreview1(
      state?.image_1
        ? state?.image_1
        : 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
    )
    setImagePreview2(
      state?.image_2
        ? state?.image_2
        : 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
    )
  }, [state, reset])
  return (
    <Container className="d-flex justify-content-center align-items-center " style={{ minHeight: '100vh' }}>
      <Card className="shadow-lg p-4" style={{ maxWidth: '500px', width: '100%', borderRadius: '15px', marginBottom: '150px' }}>
        <h3 className="text-center mb-4">Upload Images</h3>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Image Upload Section */}
          <Row className="text-center">
            {/* Image 1 */}
            <Col xs={6} className="mb-3">
              <div className="position-relative" style={{ cursor: 'pointer' }} onClick={() => document.getElementById('imageInput1').click()}>
                <img
                  src={
                    imagePreview1 ||
                    'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
                  }
                  height={120}
                  className="rounded border"
                  alt="Preview 1"
                />
                <p className="mt-2 text-muted" style={{ fontSize: '14px' }}>
                  Upload Image Left
                </p>
              </div>
              <input id="imageInput1" type="file" name="image_1" onChange={(e) => handleImageChange(e, 1)} hidden />
            </Col>

            {/* Image 2 */}
            <Col xs={6} className="mb-3">
              <div className="position-relative" style={{ cursor: 'pointer' }} onClick={() => document.getElementById('imageInput2').click()}>
                <img
                  src={
                    imagePreview2 ||
                    'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
                  }
                  height={120}
                  className="rounded border"
                  alt="Preview 2"
                />
                <p className="mt-2 text-muted" style={{ fontSize: '14px' }}>
                  Upload Image Right
                </p>
              </div>
              <input id="imageInput2" type="file" name="image_2" onChange={(e) => handleImageChange(e, 2)} hidden />
            </Col>
          </Row>

          {/* Submit Button */}
          <div className="text-center mt-3">
            <Button variant="primary" style={{ width: '100%', padding: '10px', fontSize: '16px' }} type="submit" disabled={isloading}>
              <span>Submit</span>
              {isloading && <Spinner className="ms-2" size="sm" />}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  )
}
