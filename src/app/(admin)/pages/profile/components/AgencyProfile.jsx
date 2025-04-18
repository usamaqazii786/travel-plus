/* eslint-disable react-hooks/exhaustive-deps */
import ComponentContainerCard from '@/components/ComponentContainerCard'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import TextFormInput from '@/components/form/TextFormInput'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { getAllAgency, UpdateAgencyService } from '../../../../../utils/Services/AgentServices'
import { validationSchema } from '../../../../Agent/dashboard/PaymentNotification/Schema'
import { useNotificationContext } from '../../../../../context/useNotificationContext'

export default function AgencyProfile({ user }) {
  const { showNotification } = useNotificationContext()
  const [isloading, setloading] = useState(false)
  const navigate = useNavigate()
  const [agency, setagency] = useState([])
  const [imagePreview, setImagePreview] = useState()

  const defaultValues = {
    name: agency?.name || '',
    email: agency?.email || '',
    phone_no: agency?.phone_no || '',
    term: agency?.term || '',
    logo: null,
  }
  const { control, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const [, setloadings] = useState(false)

  useEffect(() => {
    getAllAgency(setagency, setloadings)
    
  }, [])

  const onSubmit = (data) => {
    UpdateAgencyService(data, navigate, showNotification, setloading, user?.id)
  }
  useEffect(() => {
    if (agency) {
      reset(defaultValues)
      setImagePreview(agency?.logo ? 'https://dgapi.dev-nuh.xyz/uploads/logo/' + agency?.logo : '/public/assets/profile.png')
    }
  }, [agency])

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
    <ComponentContainerCard title="Agency Profile">
      <Row className="d-flex justify-content-center align-items-center">
        <Col lg={9} xl={8}>
          <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
            <Col lg={12} className="mb-3">
              <div
                className="d-flex justify-content-center"
                style={{ cursor: 'pointer' }}
                onClick={() => document.getElementById('imageInputs').click()}>
                <img src={imagePreview} height={120} className="rounded-circle" alt="Profile Avatar" />
              </div>
              <TextFormInput name="name" label="Name" placeholder="Enter Name" control={control} />
            </Col>
            <Col lg={12} className="mb-3">
              <TextFormInput name="email" label="Email Address" type="email" control={control} placeholder="Enter Email Address" />
            </Col>

            <Col lg={12} className="mb-3">
              <TextFormInput name="phone_no" label="Enter Phone Number" type="number" control={control} placeholder="Enter Phone Number" />
              <TextFormInput name="term" textarea={true} label="Enter Term and Condition" control={control} placeholder="Enter Term and Condition" />
            </Col>

            <Col lg={12} className="mb-3">
              <input id="imageInputs" type="file" name="logo" onChange={handleImageChange} hidden />
            </Col>

            <div className="text-center mt-2 ">
              <Button variant="primary" className=" d-flex justify-content-center " style={{ width: '100%' }} type="submit">
                <span className="mt-1">SUBMIT </span> {isloading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}
