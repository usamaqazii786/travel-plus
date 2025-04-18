import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Button, Card, Container, Form, Row, Col, Spinner } from 'react-bootstrap'
import TextFormInput from '@/components/form/TextFormInput' // Assuming this is the path to your custom input component
import SelectFormInput from '@/components/form/SelectFormInput' // Assuming this is the path to your custom input component
import { useNotificationContext } from '../../../../context/useNotificationContext'
import { useNavigate } from 'react-router-dom'
import { AddpaymentService } from '../../../../utils/Services/PaymentServices'
import { GetllItenary } from '../../../../utils/Services/Itenary'

// Validation schema with Yup
const validationSchema = Yup.object({
  itinerary_id: Yup.string().required('Itinerary ID is required'),
  // reminder_date: Yup.date().required('Reminder Date is required'),
  reminder_time: Yup.string().required('Reminder Time is required'),
  notification: Yup.string().required('Notification is required'),
})

export default function AddPayment() {
  const { showNotification } = useNotificationContext()
  const [itenary, setitenary] = useState([])
  const [isloading, setloading] = useState(false)
  const [reminderDate, setReminderDate] = useState('')
  const navigate = useNavigate()

  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const onSubmit = (data) => {
    const localDateTime = new Date(`${reminderDate}T${data.reminder_time}`)
    const utcHours = localDateTime.getUTCHours().toString().padStart(2, '0')
    const utcMinutes = localDateTime.getUTCMinutes().toString().padStart(2, '0')

    const ustTime = `${utcHours}:${utcMinutes}`

    const finalData = {
      ...data,
      reminder_time: ustTime,
    }

    AddpaymentService(finalData, navigate, showNotification, setloading, reminderDate)
  }
  const data = watch('reminder_time')
  console.log(data, 'data')
  useEffect(() => {
    GetllItenary(setitenary, setloading)
  }, [])
  return (
    <Container>
      <Card className="mb-3 p-4">
        <h3>Add Payment Notification</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
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
              <label htmlFor="">Reminder Date</label>
              <input
                name="reminder_date"
                type="date"
                className="form-control"
                label="Reminder Date"
                onChange={(e) => setReminderDate(e.target.value)}
                required
              />
            </Col>

            <Col md={12} className="mb-3">
              <TextFormInput name="reminder_time" label="Reminder Time" control={control} type="time" required />
            </Col>
            <Col md={12} className="mb-3">
              <TextFormInput name="notification" label="Notification" control={control} as="textarea" rows={4} required />
            </Col>
          </Row>
          <div className="text-center mt-2">
            <Button variant="primary" className=" d-flex justify-content-center" style={{ width: '100%' }} type="submit">
              <span className="mt-1">SUBMIT </span> {isloading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  )
}
