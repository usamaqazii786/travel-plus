import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Container, Form, Row, Col, Spinner } from 'react-bootstrap'
import TextFormInput from '@/components/form/TextFormInput'
import SelectFormInput from '@/components/form/SelectFormInput'
import { validationSchema } from './AddBannerSchema'
import { AddBannerService, EditBannerService, pageoption } from '../../../../../utils/Services/BannerServices'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNotificationContext } from '../../../../../context/useNotificationContext'

export default function AddBanner() {
  const [isloading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()
  const [imagePreview, setImagePreview] = useState('')

  const { showNotification } = useNotificationContext()
  const { handleSubmit, setValue, control, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      buttonText: state?.buttonText || '',
      text: state?.text || '',
      image: state?.image,
    },
  })

  const onSubmit = (data) => {
    if (state?.id) {
      EditBannerService(data, navigate, showNotification, setLoading, state?.id)
    } else {
      AddBannerService(data, navigate, showNotification, setLoading)
    }
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

  useEffect(() => {
    reset({
      buttonText: state?.buttonText || '',
      text: state?.text || '',
      page: state?.page || '',
      image: state?.image || '',
    })
    setImagePreview(
      state?.image
        ? state?.image
        : 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
    )
  }, [state, reset])

  return (
    <Container>
      <Card className="mb-3 p-4" style={{ width: '400px', margin: '0 auto', height: 'auto' }}>
        <h3>Create New Banner</h3>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={12} className="mt-3">
              <div
                className="d-flex justify-content-center"
                style={{ cursor: 'pointer' }}
                onClick={() => document.getElementById('imageInputs').click()}>
                <img src={imagePreview} height={120} className="rounded-circle" alt="Preview" />
              </div>
            </Col>
            <Col lg={12} className="mb-3">
              <input id="imageInputs" type="file" name="image" onChange={handleImageChange} hidden />
            </Col>
            <Col md={12}>
              <SelectFormInput
                key="page"
                name={'page'}
                control={control}
                label={'Select Page'}
                labelClassName="mt-2"
                containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
                options={pageoption}
              />
            </Col>
            <Col md={12}>
              <TextFormInput name="text" label="Text (optional)" placeholder="Enter Text" control={control} />
            </Col>
            <Col md={12} className="mt-3">
              <TextFormInput name="buttonText" label="Button Text (optional)" placeholder="Enter Button Text" control={control} />
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
