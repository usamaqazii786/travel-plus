import ComponentContainerCard from '@/components/ComponentContainerCard'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import TextFormInput from '@/components/form/TextFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from './Schema'
import { AddWebsiteService } from '../../../../utils/Services/WebsiteServices'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotificationContext } from '../../../../context/useNotificationContext'

const AddWebsite = () => {
  const { showNotification } = useNotificationContext()
  const [isloading, setloading] = useState(false)
  const [imagePreview, setImagePreview] = useState(
    'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
  )
  const navigate = useNavigate()
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      url: '',
      email: '',
      phone: '',
      location: '',
      image: null,
    },
  })

  const onSubmit = (data) => {
    AddWebsiteService(data, navigate, showNotification, setloading)
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
    console.log(file)
  }

  return (
    <ComponentContainerCard title="Add Website">
      <Row className="d-flex justify-content-center align-items-center">
        <Col lg={8} xl={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="d-flex justify-content-center"
              style={{ cursor: 'pointer' }}
              onClick={() => document.getElementById('imageInputs').click()}>
              <img src={imagePreview} height={120} className="rounded-circle border" alt="Profile Avatar" />
            </div>
            <TextFormInput name="title" label="Title" control={control} placeholder="Enter Title" />

            <TextFormInput name="url" label="Website URL" control={control} placeholder="Website URL" />

            <TextFormInput name="email" label="Email Address" control={control} placeholder="Email" />

            <TextFormInput name="phone" label="Phone" control={control} placeholder="Phone" type="number" />

            <TextFormInput name="location" label="Location" control={control} placeholder="Location" />
            <Col lg={12} className="mb-3">
              <input id="imageInputs" type="file" name="image" onChange={handleImageChange} hidden />
            </Col>
            <div className="text-center mt-2">
              <Button variant="primary" className=" d-flex justify-content-center" style={{ width: '100%' }} type="submit">
                <span className="mt-1">SUBMIT </span> {isloading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

export default AddWebsite
