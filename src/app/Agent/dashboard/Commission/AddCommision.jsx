import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Container, Form, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap'
import TextFormInput from '@/components/form/TextFormInput'
import SelectFormInput from '@/components/form/SelectFormInput'

import { AddCommissionSupplierService } from '../../../../utils/Services/CommissionServices'
import { useNavigate, useParams } from 'react-router-dom'
import { useNotificationContext } from '../../../../context/useNotificationContext'
import { withSwal } from 'react-sweetalert2'
import { getAllsupplieroption } from '../../../../utils/Services/SupplierServices'
import { getAllsingleitenary } from '../../../../utils/Services/Itenary'
import { validationSchema } from '../MyItineraries/AddCommsitionSchema'

const AddCommission = withSwal(() => {
  // const { swal } = props
  const { id } = useParams()
  // const { commission } = useLocation()
  // const checkDepartues = localStorage.getItem('checkDepartues')
  const [todayDate] = useState(new Date().toISOString().split('T')[0])
  const [bookingDate, setBookingDate] = useState('')
  const [arrivalDate, setArrivalDate] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))
  const [commission, setCommission] = useState([])
  const defaultValues = {
    agent_name: user?.fname + ' ' + user?.lname || '',
    client_name: '',
    agent_phone: user?.phone || '',
    reservation_number: '',
    category_id: '',
    gross_commision: '',
    agent_commision: '',
    agent_email: user?.email || '',
  }
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })
  const [supplier, setSupplier] = useState([])
  const { showNotification } = useNotificationContext()
  const navigate = useNavigate()
  const [, setloading] = useState(false)
  const [addloading, setaddloading] = useState(false)

  const Percentage = user?.percentage
  const grossCommision = watch('gross_commision')

  useEffect(() => {
    if (grossCommision) {
      const calculatedCommission = (grossCommision * Percentage) / 100
      setValue('agent_commision', calculatedCommission)
      setValue('confirm_agent_commision', calculatedCommission)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grossCommision])
  useEffect(() => {
    getAllsupplieroption(setSupplier, setloading)
    getAllsingleitenary(setCommission, setloading, id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (data) => {
    AddCommissionSupplierService(
      data,
      navigate,
      showNotification,
      setaddloading,
      todayDate,
      bookingDate,
      arrivalDate,
      departureDate,
    )
  }

  const handleDateChange = (fieldName, setDateFunc) => (e) => {
    const newDate = e.target.value
    setDateFunc(newDate)
    setValue(fieldName, newDate)
  }
  const today = new Date().toISOString().split('T')[0]

  return (
    <Container>
      <h3>Submit Commission</h3>
      <Card className="mb-3 row p-2">
        <Form>
          <label htmlFor="">Submission Date</label>
          <input className="form-control" name="today_date" label="Submission Date" type="date" value={todayDate} />
          <TextFormInput name="agent_name" disable={true} label="Agent Name" control={control} />
          <TextFormInput name="agent_email" disable={true} label="Agent Email" type="email" control={control} />
          <TextFormInput name="agent_phone" type="number" label="Agent Phone" control={control} />
          <TextFormInput name="reservation_number" label="Reservation Number" control={control} />
          <TextFormInput name="confirm_reservation_number" label="Confirm Reservation Number" control={control} />
          <TextFormInput name="client_name" label="Client Name" control={control} />
          <TextFormInput name="notes" label="Notes (optional)" control={control} />
          <SelectFormInput
            name="category_id"
            control={control}
            label="Supplier"
            labelClassName="mt-2"
            containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
            options={supplier}
          />
          {errors?.category_id?.message && <p style={{ color: '#f5949a' }}>{errors?.category_id?.message}</p>}

          <label htmlFor="">Booking Date</label>
          <input
            name="booking_date"
            className="form-control"
            type="date"
            min={today}
            value={bookingDate || commission?.booking_date}
            onChange={handleDateChange('booking_date', setBookingDate)}
          />
          {errors?.booking_date?.message && <p style={{ color: '#f5949a' }}>{errors?.booking_date?.message}</p>}

          <label htmlFor="">Arrival Date</label>
          <input
            name="arrival_date"
            className="form-control"
            type="date"
            min={today}
            value={arrivalDate || commission?.arrival_date}
            onChange={handleDateChange('arrival_date', setArrivalDate)}
          />
          {errors?.arrival_date?.message && <p style={{ color: '#f5949a' }}>{errors?.arrival_date?.message}</p>}

          <label htmlFor="">Departure Date</label>
          <input
            name="departure_date"
            className="form-control"
            type="date"
            min={today}
            value={departureDate || commission?.departure_date}
            onChange={handleDateChange('departure_date', setDepartureDate)}
          />
          {errors?.departure_date?.message && <p style={{ color: '#f5949a' }}>{errors?.departure_date?.message}</p>}

          <TextFormInput name="gross_commision" label="Gross Commission" type="number" control={control} />
          <TextFormInput name="confirm_gross_commision" label="Confirm Gross Commission" type="number" control={control} />
          <TextFormInput name="agent_commision" label="Agent Commission" type="number" control={control} />
          <TextFormInput name="confirm_agent_commision" label="Agent Commission" type="number" control={control} />
          <div className="d-flex justify-content-between">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="submit-tooltip">Submit your commission request after travel is complete, within 45 days.</Tooltip>}>
              <Button variant="primary mt-3" type="submit" onClick={handleSubmit(onSubmit)}>
                <span className="mt-1">SUBMIT </span> {addloading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
              </Button>
            </OverlayTrigger>
          </div>
        </Form>
      </Card>
    </Container>
  )
})
export default AddCommission
