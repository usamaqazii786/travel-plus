import React, { useMemo, useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import TextFormInput from '@/components/form/TextFormInput'
import { Button, Card, Container, Form, Row, Col, Spinner } from 'react-bootstrap'
import { validationSchema } from './AddClientSchema'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useNotificationContext } from '../../../../context/useNotificationContext'
import { EditclientService } from '../../../../utils/Services/ClientServices'

export default function EditClient() {
  const { state } = useLocation()
  const { id } = useParams()
  const defaultValues = useMemo(
    () => ({
      clients:
        state?.family_member_age?.map((e) => ({
          member: e?.member_name || '',
          age: e?.age || '',
        })) || [],
      familyname: state?.family_name || '',
      email: state?.email || '',
      address: state?.address || '',
      phone: state?.phone || '',
      agentNotes: state?.notes || '',
    }),
    [state],
  )
  const { showNotification } = useNotificationContext()
  const [isloading, setloading] = useState(false)
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    setValue, // Use setValue to programmatically update form field
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const onSubmit = (data) => {
    // console.log(data)
    EditclientService(data, navigate, showNotification, setloading, id)
  }
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'clients',
  })

  const handleDateChange = (index, value) => {
    setValue(`clients[${index}].age`, value) // update value for the specific client
  }
  const currentDate = new Date().toISOString().split('T')[0]
  return (
    <Container>
      <Card className="mb-3 p-4">
        <h3>Edit Client</h3>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {/* Left Column for Member and Date */}
            <Col md={6}>
              {/* Dynamic Fields for Member and Date */}
              {fields.map((item, index) => (
                <div key={item.id} className="mb-3">
                  <Row>
                    <Col md={6}>
                      {/* Member Field */}
                      <TextFormInput name={`clients[${index}].member`} label="Member"placeholder='Enter First Name' control={control} />
                    </Col>
                    <Col md={6} className="mt-1">
                      {/* Date Field */}
                      <label htmlFor="hello"> Date of Birth</label>

                      <Controller
                        name={`clients[${index}].age`}
                        control={control}
                        render={({ field, fieldState }) => (
                          <>
                            <input
                              {...field}
                              type="date"
                              max={currentDate}
                              className="form-control"
                              onChange={(e) => handleDateChange(index, e.target.value)} // Handle age change
                            />
                            {fieldState.error && <p className="text-danger">{fieldState.error?.message}</p>}
                          </>
                        )}
                      />
                    </Col>
                    <Col md={12} className="d-flex justify-content-center mt-2">
                      {/* Remove Button */}
                      <Button variant="danger" onClick={() => remove(index)} className="width-fulls">
                        <IconifyIcon icon="fa6-solid:trash" className="me-2" />
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}

              {/* Add New Button */}
              <div className="d-flex justify-content-center mt-3">
                <Button variant="primary" onClick={() => append({ member: '', age: '' })} className="width-fulls">
                  <IconifyIcon icon="fa6-solid:plus" className="me-1" />
                  Add New Member
                </Button>
              </div>
            </Col>

            <Col md={6}>
              <TextFormInput
                name="familyname"
                label="Lead Guests First Name Last Name"
                control={control}
                placeholder="Enter Lead Guest's First and Last Name"
              />

              <TextFormInput name="email" label="Email" type="email" control={control} placeholder="Enter your email" />

              <TextFormInput name="phone" label="Phone" type="number" control={control} placeholder="Enter your phone number" />

              <TextFormInput name="address" label="Address" control={control} placeholder="Enter your address" />

              <TextFormInput name="agentNotes" label="Agent Notes" control={control} placeholder="Enter any additional notes" />
            </Col>
          </Row>

          {/* Submit Button at the bottom-right */}
          <div className="text-center mt-2 ">
            <Button variant="primary" className="d-flex justify-content-center" style={{ width: '100%' }} type="submit">
              <span className="mt-1">SUBMIT </span> {isloading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  )
}
