import ComponentContainerCard from '@/components/ComponentContainerCard'
// import IconifyIcon from '@/components/wrappers/IconifyIcon'
import TextFormInput from '@/components/form/TextFormInput'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Spinner from '@/components/Spinner'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from './UserSchema'
import { agency, EditAgentService } from '../../../../utils/Services/AgentServices'
import SelectFormInput from '@/components/form/SelectFormInput'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useNotificationContext } from '../../../../context/useNotificationContext'
import { useState, useEffect } from 'react'
import { options } from '../../../../utils/Services/AgentServices'

const EditAgent = () => {
  const { state } = useLocation()
  const { id } = useParams()
  const { showNotification } = useNotificationContext()
  const [isloading, setloading] = useState(false)
  const navigate = useNavigate()

  const defaultValues = {
    fname: state?.fname || '',
    lname: state?.lname || '',
    email: state?.email || '',
    zip_code: state?.zip_code || '',
    phone: state?.phone || '',
    state: state?.state || '',
    city: state?.city || '',
    agency: state?.agency || '',
    location_status: state?.location_status || '',
    password: '',
    image: null,
  }

  const { control, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  useEffect(() => {
    if (state) {
      reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, reset])

  const onSubmit = (data) => {
    EditAgentService(data, navigate, showNotification, setloading, id)
  }

  return (
    <ComponentContainerCard title="Edit Agent">
      <Row className="d-flex justify-content-center align-items-center">
        <Col lg={9} xl={8}>
          <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
            <Col lg={12} className="mb-3">
              <TextFormInput name="fname" label="First Name" placeholder="Enter First Name" control={control} />
            </Col>

            <Col lg={12} className="mb-3">
              <TextFormInput name="lname" label="Last Name" type="text" placeholder="Enter Last Name" control={control} />
            </Col>

            <Col lg={12} className="mb-3">
              <TextFormInput name="email" label="Email Address" type="email" control={control} placeholder="Enter Email Address" />
            </Col>

            <Col lg={12} className="mb-3">
              <TextFormInput name="zip_code" label="Enter Zip Code" type="text" control={control} placeholder="Enter Zip Code" />
            </Col>

            <Col lg={12} className="mb-3">
              <TextFormInput name="state" label="Enter State" type="text" control={control} placeholder="Enter State" />
            </Col>

            <Col lg={12} className="mb-3">
              <TextFormInput name="city" label="Enter City" type="text" control={control} placeholder="Enter City" />
            </Col>
            <Col lg={12} className="mb-3">
              <TextFormInput name="phone" label="Enter Phone" type="number" control={control} defaultValue="Dodson" placeholder="Enter Phone" />
            </Col>

            <Col lg={12} className="mb-3">
              <TextFormInput name="password" label="Enter Password" type="password" control={control} placeholder="Enter Password" />
            </Col>
            <Col lg={12} className="mb-3">
              <SelectFormInput
                name="location_status"
                control={control}
                label="Select Residence"
                labelClassName="mt-2"
                containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
                options={options}
              />
            </Col>
            <Col lg={12} className="mb-3">
              <SelectFormInput
                name="agency"
                control={control}
                label="Select Agency"
                labelClassName="mt-2"
                containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
                options={agency}
              />
            </Col>

            <Col lg={12} className="mb-3">
              <input name="image" onChange={(e) => setValue('image', e.target.files[0])} label="Attach Profile Picture" type="file" />
            </Col>

            <div className="text-center">
              <Button variant="primary" className="d-flex justify-content-center" style={{ width: '100%' }} type="submit">
                <span className="mt-1">SUBMIT </span> {isloading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </ComponentContainerCard>
  )
}

export default EditAgent
