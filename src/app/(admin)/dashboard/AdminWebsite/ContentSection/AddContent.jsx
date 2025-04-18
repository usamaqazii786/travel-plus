import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Container, Form, Row, Col, Spinner } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNotificationContext } from '@/context/useNotificationContext'
import { AddContentService, EditContentService } from '@/utils/Services/ContentServices'
import { validationSchema } from './AddContentSchema'
import SelectFormInput from '@/components/form/SelectFormInput'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { pageoption } from '../../../../../utils/Services/BannerServices'
export default function AddContent() {
  const { showNotification } = useNotificationContext()
  const [isloading, setloading] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()
  const defaultValues = {
    page: state?.page || '',
    content: state?.content || '',
  }

  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })
  const value = watch('content')
  const onSubmit = (data) => {
    if (state?.id) {
      EditContentService(data, navigate, showNotification, setloading, state?.id)
    } else {
      AddContentService(data, navigate, showNotification, setloading)
    }
  }

  return (
    <Container>
      <Card className="mb-3 p-4" style={{ width: 'auto', margin: '0 auto', height: 'auto' }}>
        <h3>Create Content </h3>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
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

            <label>Enter Content</label>
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
