import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Container, Form, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap'
import TextFormInput from '@/components/form/TextFormInput'
import SelectFormInput from '@/components/form/SelectFormInput'
import { validationSchema } from './AddCommsitionSchema'
import { AddCommissionService, SaveCommissionService } from '../../../../utils/Services/CommissionServices'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNotificationContext } from '../../../../context/useNotificationContext'
import { withSwal } from 'react-sweetalert2'
import { getAllsupplieroption } from '../../../../utils/Services/SupplierServices'

const AddCommission = withSwal((props) => {
  const { id, swal } = props
  const { state } = useLocation()
  const [todayDate] = useState(new Date().toISOString().split('T')[0])
  const [bookingDate, setBookingDate] = useState('')
  const users = JSON.parse(localStorage.getItem('user'))
  const [arrivalDate, setArrivalDate] = useState('')
  const [departureDate, setDepartureDate] = useState('')

  const defaultValues = {
    agent_name: users?.fname + ' ' + users?.lname || '',
    client_name: state?.client?.family_name || '',
    agent_phone: users?.phone || '',
    reservation_number: state?.reservation_number || '',
    category_id: state?.supplier?.id || '',
    gross_commission: state?.gross_commision || '',
    agent_commission: state?.agent_commision || '',
    agent_email: users?.email || '',
  }

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const user = JSON.parse(localStorage.getItem('user'))
  const checkDepartues = localStorage.getItem('checkDepartues')
  const [supplier, setSupplier] = useState([])
  const { showNotification } = useNotificationContext()
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)

  // const option = supplier.map((e) => {
  // return { value: e.category?.id, label: e.category?.name }
  // })

  useEffect(() => {
    getAllsupplieroption(setSupplier, setloading)
  }, [])
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
  const onSubmit = (data) => {
    AddCommissionService(data, navigate, showNotification, setloading, id, todayDate, bookingDate, arrivalDate, departureDate)
  }
  let faqLink = 'https://mstagents.com/commissions/#1671649283411-2ed93f02-0a3a'

  const HandleDrafth = (data) => {
    swal
      .fire({
        title: 'Do you want to be reminded to submit your commission?',
        showCancelButton: true,
        confirmButtonText: `Save`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // console.log(result)
          SaveCommissionService(
            data,
            navigate,
            showNotification,
            setloading,
            id,
            todayDate,
            bookingDate,
            arrivalDate,
            departureDate,
            result.isConfirmed,
          )
          swal.fire(`${state?.title} is complete! Log in and confirm your saved commission information is accurate, then submit it within 45 days`)
        } else if (result?.dismiss === 'cancel') {
          SaveCommissionService(data, navigate, showNotification, setloading, id, todayDate, bookingDate, arrivalDate, departureDate, result?.dismiss)
          swal.fire('Changes are not saved', 'info')
        }
      })
  }

  // Handle date change
  const handleDateChange = (fieldName, setDateFunc) => (e) => {
    const newDate = e.target.value
    setDateFunc(newDate)
    setValue(fieldName, newDate)
  }
  const today = new Date().toISOString().split('T')[0]

  return (
    <Container>
      <h3>Add Commission</h3>
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
            value={bookingDate}
            onChange={handleDateChange('booking_date', setBookingDate)}
          />
          {errors?.booking_date?.message && <p style={{ color: '#f5949a' }}>{errors?.booking_date?.message}</p>}
          <label htmlFor="">Arrival Date</label>
          <input
            name="arrival_date"
            className="form-control"
            type="date"
            min={today}
            value={arrivalDate}
            onChange={handleDateChange('arrival_date', setArrivalDate)}
          />
          {errors?.arrival_date?.message && <p style={{ color: '#f5949a' }}>{errors?.arrival_date?.message}</p>}

          <label htmlFor="">Departure Date</label>
          <input
            name="departure_date"
            className="form-control"
            type="date"
            min={today}
            value={departureDate}
            onChange={handleDateChange('departure_date', setDepartureDate)}
          />
          {errors?.departure_date?.message && <p style={{ color: '#f5949a' }}>{errors?.departure_date?.message}</p>}

          <TextFormInput name="gross_commision" label="Gross Commission" type="number" control={control} />
          <TextFormInput name="confirm_gross_commision" label="Confirm Gross Commission" type="number" control={control} />

          <TextFormInput name="agent_commision" disable={true} label="Agent Commission" type="number" control={control} />
          <TextFormInput name="confirm_agent_commision" disable={true} label="Agent Commission" type="number" control={control} />
          <div className="d-flex justify-content-between">
            <OverlayTrigger placement="top" overlay={<Tooltip id="saved-tooltip">Save your commission information in advance</Tooltip>}>
              <Button variant="primary mt-3" type="submit" onClick={handleSubmit(HandleDrafth)}>
                <span className="mt-1">Save </span> {loading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
              </Button>
            </OverlayTrigger>

            <a className=" mt-3 btn btn-primary" href={faqLink} target="_blank">
              FAQ
            </a>
            {checkDepartues === 'Departure is today!' && (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="submit-tooltip">Submit your commission request after travel is complete, within 45 days.</Tooltip>}>
                <Button variant="primary mt-3" type="submit" onClick={handleSubmit(onSubmit)}>
                  <span className="mt-1">SUBMIT </span> {loading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
                </Button>
              </OverlayTrigger>
            )}
          </div>
        </Form>
      </Card>
    </Container>
  )
})
export default AddCommission
