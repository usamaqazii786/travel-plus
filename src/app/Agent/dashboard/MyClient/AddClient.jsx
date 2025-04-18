import React, { useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import TextFormInput from '@/components/form/TextFormInput'
import { Button, Card, Container, Form, Row, Col, Spinner } from 'react-bootstrap'
import { validationSchema } from './AddClientSchema'
import { useNavigate } from 'react-router-dom'
import { useNotificationContext } from '../../../../context/useNotificationContext'
import { AddclientService } from '../../../../utils/Services/ClientServices'

export default function AddClient() {
  // React Hook Form setup with Yup validation
  const { showNotification } = useNotificationContext()
  const [isloading, setloading] = useState(false)
  const navigate = useNavigate()
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      clients: [{ member: '', age: '' }],
    },
  })

  // Handle dynamic fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'clients',
  })

  const onSubmit = (data) => {
    AddclientService(data, navigate, showNotification, setloading)
  }

  const handleDateChange = (index, value) => {
    setValue(`clients[${index}].age`, value)
  }
  const currentDate = new Date().toISOString().split('T')[0]
  const HandlePicker = (e) => {
    if (e.target.showPicker) {
      e.target.showPicker()
    }
  }
  return (
    <Container>
      <Card className="mb-3 p-4">
        <h3>Create New Client</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              {fields.map((item, index) => (
                <div key={item.id} className="mb-3">
                  <Row>
                    <Col md={6}>
                      <TextFormInput
                        name={`clients[${index}].member`}
                        placeholder="Enter First Name"
                        label={`${index === 0 ? 'First Name Last Name' : 'Member First Name Last Name'}`}
                        control={control}
                      />
                    </Col>
                    <Col md={6} className="mt-1">
                      <label htmlFor="hello">Date of Birth</label>
                      <Controller
                        name={`clients[${index}].age`}
                        control={control}
                        render={({ field, fieldState }) => (
                          <>
                            <input
                              {...field}
                              type="date"
                              max={currentDate}
                              onClick={(e) => HandlePicker(e)}
                              className="form-control"
                              onChange={(e) => handleDateChange(index, e.target.value)}
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
              <div className="d-flex justify-content-center mt-3 ">
                <Button variant="primary" onClick={() => append({ member: '', age: '' })} className="width-fulls mb-2">
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
