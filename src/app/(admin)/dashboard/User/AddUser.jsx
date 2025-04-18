import ComponentContainerCard from '@/components/ComponentContainerCard'
// import IconifyIcon from '@/components/wrappers/IconifyIcon'
import TextFormInput from '@/components/form/TextFormInput'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Spinner from '@/components/Spinner'
import SelectFormInput from '@/components/form/SelectFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from './UserSchema'
import { AddAgentService, agency } from '../../../../utils/Services/AgentServices'
import { useNavigate } from 'react-router-dom'
import { useNotificationContext } from '../../../../context/useNotificationContext'
import { useState } from 'react'
import { options } from '../../../../utils/Services/AgentServices'

const AddAgent = () => {
  const { showNotification } = useNotificationContext()
  const [isloading, setloading] = useState(false)
  const navigate = useNavigate()
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data) => {
    AddAgentService(data, navigate, showNotification, setloading)
  }

  return (
    <ComponentContainerCard title="Add Agent">
      <Row className="d-flex justify-content-center align-items-center">
        <Col lg={9} xl={8}>
          <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
            <Col lg={12} className="mb-3">
              <TextFormInput name="fname" label="First Name" placeholder="Enter First Name" control={control} />
            </Col>

            <Col lg={12} className="mb-3">
              <TextFormInput name="lname" label="Last Name" type="text" placeholder="Enter Last Name" control={control} defaultValue="Dodson" />
            </Col>

            <Col lg={12} className="mb-3">
              <TextFormInput
                name="email"
                label="Email Address"
                type="email"
                control={control}
                defaultValue="rosa.dodson@demo.com"
                placeholder="Enter Email Address"
              />
            </Col>

            <Col lg={12} className="mb-3">
              <TextFormInput
                name="zip_code"
                label="Enter Zip Code"
                type="text"
                control={control}
                defaultValue="+123456789"
                placeholder="Enter Zip Code"
              />
            </Col>

            <Col lg={12} className="mb-3">
              <TextFormInput name="state" label="Enter State" type="text" control={control} defaultValue="Dodson" placeholder="Enter State" />
            </Col>

            <Col lg={12} className="mb-3">
              <TextFormInput name="city" label="Enter City" type="text" control={control} defaultValue="Dodson" placeholder="Enter City" />
            </Col>
            <Col lg={12} className="mb-3">
              <TextFormInput name="phone" label="Enter Phone" type="number" control={control} defaultValue="Dodson" placeholder="Enter Phone" />
            </Col>

            <Col lg={12} className="mb-3">
              <TextFormInput
                name="password"
                label="Enter Password"
                type="password"
                control={control}
                defaultValue="Dodson"
                placeholder="Enter Password"
              />
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
              <input name="image" onChange={(e) => setValue('image', e.target.files[0])} label="Attech Profile Picture" type="file" />
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

export default AddAgent
