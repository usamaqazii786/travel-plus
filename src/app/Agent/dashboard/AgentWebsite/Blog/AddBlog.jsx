import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextFormInput from '@/components/form/TextFormInput'
import { Button, Card, Container, Form, Row, Col, Spinner } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useNotificationContext } from '@/context/useNotificationContext'
import SelectFormInput from '@/components/form/SelectFormInput'
import { AddBlogService } from '@/utils/Services/BlogServices'
import { validationSchema } from './AddBlogSchema'
import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'
import { getAllsuppliersOptionAssign } from '../../../../../utils/Services/SupplierServices'
export default function AddBlog() {
  const { showNotification } = useNotificationContext()
  const { id } = useParams()
  const [isloading, setloading] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()
  const defaultValues = {
    title: state?.title || '',
    description: state?.description || '',
    supplier: state?.supplier || '',
    image: state?.image || null,
  }
  const [Supplier, setSupplier] = useState([])
  const [, setsupplierloading] = useState(false)
  const [imagePreview, setImagePreview] = useState(
    state?.image ||
      'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
  )
  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })
  const value = watch('description')
  const onSubmit = (data) => {
    AddBlogService(data, navigate, showNotification, setloading, id)
  }

  useEffect(() => {
    getAllsuppliersOptionAssign(setSupplier, setsupplierloading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
        <h3>Create Blog </h3>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <div
              className="d-flex justify-content-center"
              style={{ cursor: 'pointer' }}
              onClick={() => document.getElementById('imageInputs').click()}>
              <img src={imagePreview} height={120} className="rounded-circle border" alt="Profile Avatar" />
            </div>
            <Col md={12} className="mt-3">
              <SelectFormInput
                name="supplier"
                control={control}
                label="Select a Supplier"
                labelClassName="mt-2"
                containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
                options={Supplier}
              />
            </Col>

            <Col md={12} className="mt-3">
              <TextFormInput name="title" label="Title" placeholder="Enter Title" control={control} />
            </Col>
            <Col md={12} className="mt-3">
              <ReactQuill theme="snow" value={value} onChange={(e) => setValue('description', e)} />
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
