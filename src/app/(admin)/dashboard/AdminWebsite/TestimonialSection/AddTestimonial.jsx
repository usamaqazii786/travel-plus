import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFormInput from '@/components/form/TextFormInput'
import { Button, Card, Container, Form, Row, Col, Spinner } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNotificationContext } from '@/context/useNotificationContext'
import { AddTestimonialService ,EditTestimonialService} from '@/utils/Services/TestimonialServices'
import { validationSchema } from './AddTestimonialSchema'
import SelectFormInput from '@/components/form/SelectFormInput'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { pageoptiontestimonial } from '../../../../../utils/Services/BannerServices'
export default function AddTestimonial() {
  const { showNotification } = useNotificationContext()
  const [isloading, setloading] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()
  const defaultValues = {
    title: state?.title || '',
    page: state?.page || '',
    content: state?.content || '',
    image: state?.image || null,
  }
  const [imagePreview, setImagePreview] = useState(
    state?.image ||
      'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
  )
  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })
  const value = watch('content')
  const onSubmit = (data) => {
    if (state?.id) {
      EditTestimonialService(data, navigate, showNotification, setloading, state?.id)
        } else {
          AddTestimonialService(data, navigate, showNotification, setloading)
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

  return (
    <Container>
      <Card className="mb-3 p-4" style={{ width: 'auto', margin: '0 auto', height: 'auto' }}>
        <h3>Create Testimonial </h3>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <div
              className="d-flex justify-content-center"
              style={{ cursor: 'pointer' }}
              onClick={() => document.getElementById('imageInputs').click()}>
              <img src={imagePreview} height={120} className="rounded-circle border" alt="Profile Avatar" />
            </div>
            <Col md={12}>
              <SelectFormInput
                key="page"
                name={'page'}
                control={control}
                label={'Select Page'}
                labelClassName="mt-2"
                containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
                options={pageoptiontestimonial}
              />
            </Col>
            <Col md={12} className="">
              <TextFormInput name="title" label="Title" placeholder="Enter Title" control={control} />
            </Col>
            <Col md={12} className="mt-3">
              <ReactQuill theme="snow" value={value} onChange={(e) => setValue('content', e)} />
            </Col>
            <Col lg={12} className="mb-3">
              <input id="imageInputs" type="file" name="image" onChange={handleImageChange} hidden />
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
