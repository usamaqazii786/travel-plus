import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Container, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import TextFormInput from '@/components/form/TextFormInput'
import SelectFormInput from '@/components/form/SelectFormInput'
import { validationSchema } from './AddCommsitionSchema'
import { EditCommissionService } from '../../../../utils/Services/CommissionServices'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useNotificationContext } from '../../../../context/useNotificationContext'
import { withSwal } from 'react-sweetalert2'
import { getAllsupplieroption } from '../../../../utils/Services/SupplierServices'

const EditCommissionSupplier = withSwal(() => {
  //   const { id } = props
  const { id } = useParams()
  const { state } = useLocation()

  const [todayDate] = useState(new Date().toISOString().split('T')[0])
  const [bookingDate, setBookingDate] = useState('')
  const [arrivalDate, setArrivalDate] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const defaultValues = {
    agent_name: state?.agent_name || '',
    client_name: state?.client_name || '',
    agent_phone: state?.agent_name || '',
    reservation_number: state?.reservation_number || '',
    category_id: state?.supplier?.id || '',
    gross_commission: state?.gross_commision || '',
    agent_commission: state?.agent_commision || '',
    agent_email: state?.agent_email || '',
  }

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const [supplier, setSupplier] = useState([])
  const { showNotification } = useNotificationContext()
  const navigate = useNavigate()
  const [, setloading] = useState(false)

  useEffect(() => {
    getAllsupplieroption(setSupplier, setloading)
  }, [])

  const onSubmit = (data) => {
    EditCommissionService(data, navigate, showNotification, setloading, id, todayDate, bookingDate, arrivalDate, departureDate)
  }

  // Handle date change
  const handleDateChange = (fieldName, setDateFunc) => (e) => {
    const newDate = e.target.value
    setDateFunc(newDate)
  }

  return (
    <Container>
      <h3>Add Commission</h3>
      <Card className="mb-3 row p-2">
        <Form>
          <label htmlFor="">Submission Date</label>
          <input className="form-control" name="today_date" label="Submission Date" type="date" value={todayDate} />
          <TextFormInput name="agent_name" label="Agent Name" control={control} />
          <TextFormInput name="agent_email" label="Agent Email" type="email" control={control} />
          <TextFormInput name="agent_phone" label="Agent Phone" control={control} />
          <TextFormInput name="reservation_number" label="Reservation Number" control={control} />
          <TextFormInput name="client_name" label="Client Name" control={control} />
          <SelectFormInput
            name="category_id"
            control={control}
            label="Supplier"
            labelClassName="mt-2"
            containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
            options={supplier}
          />
          <label htmlFor="">Booking Date</label>
          <input
            name="booking_date"
            className="form-control"
            type="date"
            value={bookingDate || state?.booking_date}
            onChange={handleDateChange('booking_date', setBookingDate)}
          />
          <label htmlFor="">Arrival Date</label>
          <input
            name="arrival_date"
            className="form-control"
            type="date"
            value={arrivalDate || state?.arrival_date}
            onChange={handleDateChange('arrival_date', setArrivalDate)}
          />
          <label htmlFor="">Departure Date</label>
          <input
            name="departure_date"
            className="form-control"
            type="date"
            value={departureDate || state?.departure_date}
            onChange={handleDateChange('departure_date', setDepartureDate)}
          />
          <TextFormInput name="gross_commission" label="Gross Commission" type="number" control={control} />
          <TextFormInput name="agent_commission" label="Agent Commission" type="number" control={control} />
          <div className="d-flex justify-content-between">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="submit-tooltip">Submit your commission request after travel is complete, within 45 days.</Tooltip>}>
              <Button variant="primary mt-3" type="submit" onClick={handleSubmit(onSubmit)}>
                Update
              </Button>
            </OverlayTrigger>
          </div>
        </Form>
      </Card>
    </Container>
  )
})
export default EditCommissionSupplier
