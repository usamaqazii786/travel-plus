import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Container, Form, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap'
import TextFormInput from '@/components/form/TextFormInput'
import SelectFormInput from '@/components/form/SelectFormInput'

import { EditCommissionService } from '../../../../utils/Services/CommissionServices'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useNotificationContext } from '../../../../context/useNotificationContext'
import { withSwal } from 'react-sweetalert2'
import { getAllsuppliers } from '../../../../utils/Services/SupplierServices'
import { validationSchemaforadmin } from '../../../Agent/dashboard/Commission/AddCommsitionSchema'

const EditCommission = withSwal(() => {
  //   const { id } = props
  const { id } = useParams()
  const { state } = useLocation()
  // console.log(state)
  const [todayDate] = useState(new Date().toISOString().split('T')[0])
  const [bookingDate, setBookingDate] = useState(state?.booking_date || '')
  const [arrivalDate, setArrivalDate] = useState(state?.arrival_date || '')
  const [departureDate, setDepartureDate] = useState(state?.departure_date || '')

  const defaultValues = {
    agent_name: state?.agent_name || '',
    client_name: state?.client_name || '',
    agent_phone: state?.agent_phone || '',
    confirm_reservation_number: state?.confirm_reservation_number || '',
    reservation_number: state?.reservation_number || '',
    category_id: state?.supplier?.id || '',
    confirm_gross_commision: state?.confirm_gross_commision || '',
    gross_commision: state?.gross_commision || '',
    notes: state?.notes || '',
    agent_commission: '',
    agent_email: state?.agent_email || '',
  }

  const { control, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(validationSchemaforadmin),
    defaultValues,
  })
  const [supplier, setSupplier] = useState([])
  const { showNotification } = useNotificationContext()
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)

  const option = supplier.map((e) => {
    return { value: e?.id, label: e.supplier_name }
  })

  useEffect(() => {
    getAllsuppliers(setSupplier, setloading)
  }, [])

  const onSubmit = (data) => {
    EditCommissionService(data, navigate, showNotification, setloading, id, todayDate, bookingDate, arrivalDate, departureDate)
  }
  const Percentage = state?.subadmin?.[0]?.percentage
  const confirmgrossCommision = watch('confirm_gross_commision')
  const grossCommision = watch('gross_commision')

  const handleDateChange = (fieldName, setDateFunc) => (e) => {
    const newDate = e.target.value
    setDateFunc(newDate)
  }
  useEffect(() => {
    if (confirmgrossCommision) {
      const calculatedCommission = (Number(confirmgrossCommision) * Number(Percentage)) / 100
      setValue('confirm_agent_commission', calculatedCommission)
    }
    if (grossCommision) {
      const calculatedCommission = (Number(grossCommision) * Number(Percentage)) / 100
      setValue('agent_commission', calculatedCommission)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmgrossCommision, grossCommision])
  return (
    <Container>
      <h3>Add Commission</h3>
      <Card className="mb-3 row p-2">
        <Form>
          <label htmlFor="">Submission Date</label>
          <input className="form-control" disabled name="today_date" label="Submission Date" type="date" value={state?.today_date} />
          <TextFormInput name="agent_name" label="Agent Name" control={control} />
          <TextFormInput name="agent_email" label="Agent Email" type="email" control={control} />
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
            options={option}
          />
          <label htmlFor="">Booking Date</label>
          <input
            name="booking_date"
            className="form-control"
            disabled
            type="date"
            value={bookingDate || state?.booking_date}
            onChange={handleDateChange('booking_date', setBookingDate)}
          />
          <label htmlFor="">Arrival Date</label>
          <input
            name="arrival_date"
            className="form-control"
            disabled
            type="date"
            value={arrivalDate || state?.arrival_date}
            onChange={handleDateChange('arrival_date', setArrivalDate)}
          />
          <label htmlFor="">Departure Date</label>
          <input
            name="departure_date"
            className="form-control"
            disabled
            type="date"
            value={departureDate || state?.departure_date}
            onChange={handleDateChange('departure_date', setDepartureDate)}
          />
          <TextFormInput name="gross_commision" label="Gross Commission" type="number" control={control} />
          <TextFormInput name="confirm_gross_commision" label="Confirm Gross Commission" type="number" control={control} />
          <TextFormInput name="agent_commission" label="Agent Commission" type="number" control={control} />
          <TextFormInput name="confirm_agent_commission" label="Comfirm Agent Commission" type="number" control={control} />
          <div className="d-flex justify-content-between">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="submit-tooltip">Submit your commission request after travel is complete, within 45 days.</Tooltip>}>
              <Button variant="primary mt-3" type="submit" onClick={handleSubmit(onSubmit)}>
                Update { loading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
              </Button>
            </OverlayTrigger>
          </div>
        </Form>
      </Card>
    </Container>
  )
})
export default EditCommission
