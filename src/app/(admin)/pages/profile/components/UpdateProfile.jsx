import { useState } from 'react'
import { Button, Col, Form, Row, Spinner, TabContainer, TabContent, TabPane, Nav } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import TextFormInput from '@/components/form/TextFormInput'
import { UpdateAgentService } from '../../../../../utils/Services/AgentServices'
import { yupResolver } from '@hookform/resolvers/yup'
import ComponentContainerCard from '@/components/ComponentContainerCard'

import { validationSchema } from '../../../../Agent/dashboard/PaymentNotification/Schema'
import { useNotificationContext } from '../../../../../context/useNotificationContext'
import { useTab } from '../../../../../utils/Services/TabsServices'
import Tabs from '../../../../../components/TabsForTravel/Tabs'
import AgencyProfile from './AgencyProfile'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = ({ user }) => {
  const { showNotification } = useNotificationContext()
  const [isloading, setloading] = useState(false)
  const [imagePreview, setImagePreview] = useState(user?.image || '/public/assets/profile.png')
  const navigate = useNavigate()

  const defaultValues = {
    fname: user?.fname || '',
    lname: user?.lname || '',
    email: user?.email || '',
    zip_code: user?.zip_code || '',
    state: user?.state || '',
    city: user?.city || '',
    phone: user?.phone || '',
    password: '',
    image: null,
  }

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const onSubmit = (data) => {
    UpdateAgentService(data, navigate, showNotification, setloading, user?.id)
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

  const { tabsForProfile } = useTab()

  return (
    <>
      <TabContainer defaultActiveKey={'profile'}>
        <Nav className="nav-tabs mb-3" style={{ borderBottom: 'none' }} role="tablist">
          {tabsForProfile?.map((tabs, index) => (
            <Tabs icon={tabs.icon} index={index} label={tabs.label} eventKey={tabs.eventKey} key={tabs.eventKey} />
          ))}
        </Nav>
        <TabContent>
          <TabPane eventKey={'profile'}>
            <ComponentContainerCard title="Update Profile">
              <Row className="d-flex justify-content-center align-items-center">
                <Col lg={9} xl={8}>
                  <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
                    <Col lg={12} className="mb-3">
                      <div
                        className="d-flex justify-content-center"
                        style={{ cursor: 'pointer' }}
                        onClick={() => document.getElementById('imageInput').click()}>
                        <img src={imagePreview} height={120} className="rounded-circle" alt="Profile Avatar" />
                      </div>
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
                      <TextFormInput name="phone" label="Enter Phone" type="number" control={control} placeholder="Enter Phone" />
                    </Col>
                    <Col lg={12} className="mb-3">
                      <TextFormInput name="password" label="Enter Password" type="password" control={control} placeholder="Enter Password" />
                    </Col>

                    <Col lg={12} className="mb-3">
                      <input id="imageInput" type="file" name="image" onChange={handleImageChange} hidden />
                    </Col>

                    <div className="text-center mt-2">
                      <Button variant="primary" className="d-flex justify-content-center" style={{ width: '100%' }} type="submit">
                        <span className="mt-1">SUBMIT</span>
                        {isloading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </ComponentContainerCard>
          </TabPane>
          <TabPane eventKey={'profileAgency'}>
            <AgencyProfile user={user} />
          </TabPane>
        </TabContent>
      </TabContainer>
    </>
  )
}

export default UpdateProfile
