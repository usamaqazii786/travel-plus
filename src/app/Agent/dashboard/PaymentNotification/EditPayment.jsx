import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Button, Card, Container, Form, Row, Col, Spinner } from 'react-bootstrap'
import TextFormInput from '@/components/form/TextFormInput' // Assuming this is the path to your custom input component
import SelectFormInput from '@/components/form/SelectFormInput' // Assuming this is the path to your custom input component
import { useNotificationContext } from '../../../../context/useNotificationContext'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { EditpaymentService } from '../../../../utils/Services/PaymentServices'
import { GetllItenary } from '../../../../utils/Services/Itenary'

// Validation schema with Yup
const validationSchema = Yup.object({
  itinerary_id: Yup.string().required('Itinerary ID is required'),
  // reminder_date: Yup.date().required('Reminder Date is required'),
  reminder_time: Yup.string().required('Reminder Time is required'),
  notification: Yup.string().required('Notification is required'),
})

export default function EditPayment() {
  const { state } = useLocation() // Fetch the client data passed from the previous page
  const { id } = useParams()
  const [itenary, setitenary] = useState([])
  const { showNotification } = useNotificationContext()
  const [isloading, setloading] = useState(false)
  const [reminderDate, setReminderDate] = useState('')
  const navigate = useNavigate()
  const defaultValues = {
    itinerary_id: state?.itinerary_id || '',
    reminder_date: state?.reminder_date || '',
    reminder_time: state?.reminder_time || '',
    notification: state?.notification || '',
  }


  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })
  useEffect(() => {
    if (state) {
      setReminderDate(state.reminder_date)
      reset(defaultValues)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  // Handle form submission
  const onSubmit = (data) => {
    EditpaymentService(data, navigate, showNotification, setloading, reminderDate, id)
  }
  
  useEffect(() => {
    GetllItenary(setitenary, setloading)
  }, [])
  return (
    <Container>
      <Card className="mb-3 p-4">
        <h3>Edit Payment Notification</h3>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {/* Full Column for All Fields */}
            <Col md={12} className="mb-3">
              <SelectFormInput
                name="itinerary_id"
                control={control}
                label="Select Itinerary"
                labelClassName="mt-2"

                containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
                options={itenary}
              />
            </Col>

            <Col md={12} className="mb-3">
              {/* Reminder Date Field */}
              <label htmlFor="">Reminder Date</label>
              <input
                name="reminder_date"
                type="date"
                className="form-control"
                value={reminderDate}
                label="Reminder Date"
                onChange={(e) => setReminderDate(e.target.value)}
                required
              />
            </Col>

            <Col md={12} className="mb-3">
              {/* Reminder Time Field */}
              <TextFormInput name="reminder_time" label="Reminder Time" control={control} type="time" required />
            </Col>

            <Col md={12} className="mb-3">
              {/* Notification Field */}
              <TextFormInput name="notification" label="Notification" control={control} as="textarea" rows={4} required />
            </Col>
          </Row>

          <div className="text-center mt-2 ">
            <Button variant="primary" className=" d-flex justify-content-center " style={{ width: '100%' }} type="submit">
              <span className="mt-1">SUBMIT </span> {isloading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  )
}
