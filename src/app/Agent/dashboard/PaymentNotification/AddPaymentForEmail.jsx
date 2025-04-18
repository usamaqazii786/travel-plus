/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import { paymentFields } from '../MyItineraries/AllFields'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import TextFormInputPayment from '@/components/form/TextFormInputPayment'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from './Schema'
import { useLocation } from 'react-router-dom'
import Select from 'react-select'
// import SelectFormInput from '@/components/form/SelectFormInput'
import { AddPaymentEmail } from '../../../../utils/Services/PaymentServices'
import Visa from '../../../../assets/images/master.jpg'
import Secure from '../../../../assets/images/download.jpg'
import { withSwal } from 'react-sweetalert2'
import { getSingleTravel } from '../../../../utils/Services/TravelquoteServices'
import { CountryAndState } from '../../../../utils/Services/Country'
import PaymentRightInformation from './PaymentRightInformation'

const PaymentForm = withSwal((props) => {
  const { swal } = props
  const [isChecked, setIsChecked] = useState(false)
  const [, setloadings] = useState(false)
  const [travel, setTravel] = useState([])
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      payment: [
        {
          card_number: '',
          cvc_code: '',
          expiry_date: '',
          address: '',
          second_address: '',
          city: '',
          state: '',
          country: '',
          zip_code: '',
          card_name: '',
          billing_address: '',
        },
      ],
    },
  })

  const [loading, setloading] = useState(false)
  const [erroragrement, setError] = useState('')
  const [states, setState] = useState([])
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const clientId = queryParams.get('client_id')
  const travelId = queryParams.get('travel_id')
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'payment',
  })

  const onSubmit = ({ payment }) => {
    if (!isChecked) {
      setError('You must agree to the Payment Procced')
      swal.fire('You must agree to the Payment Procced', '', 'error')
      return
    }
    AddPaymentEmail(payment, reset, swal, setloading, clientId, travelId)
  }
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked)
    setError('')
  }
  useEffect(() => {
    getSingleTravel(setTravel, setloadings, travelId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [, setSelectedCountry] = useState({})
  const [, setSelectedState] = useState({})

  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: 'black',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
  }
  const Alldatas = CountryAndState
  const handleCountryChange = (selectedOption, index) => {
    const clonedCountry = JSON.parse(JSON.stringify(selectedOption))
    setSelectedCountry(clonedCountry)
    setValue(`payment[${index}].country`, clonedCountry.value)

    const filterdata = Alldatas?.filter((e) => clonedCountry?.value == e?.name)
    const statedata = filterdata?.[0]?.states?.map((e) => ({ value: e.name, label: e.name }))
    setState(statedata)
  }
  const AllCountry = Alldatas?.map((e) => {
    return {
      value: e?.name,
      label: e?.name,
    }
  })
  const handleStateChange = (selectedOption, index) => {
    const clonedState = JSON.parse(JSON.stringify(selectedOption))
    setSelectedState(clonedState)
    setValue(`payment[${index}].state`, clonedState.value)
  }
  return (
    <div>
      <div className="text-center  p-2" style={{ backgroundColor: '#405189' }}>
        <img src="/logo-sm.webp" alt="Payment Methods" style={{ height: '100px' }} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#fff' }}>
        <Col md={8} xs={12} style={{ background: 'white' }}>
          <Form className="p-3" onSubmit={handleSubmit(onSubmit)}>
            <div className=" rounded p-3 mb-4 shadow">
              {fields?.map((_, index) => (
                <>
                  <Row>
                    {paymentFields?.[0].slice(0, 1)?.map((field, idx) => (
                      <Col md={4} className="mb-3" key={idx}>
                        <TextFormInputPayment
                          name={`payment[${index}].${field.name}`}
                          label={field?.label}
                          color={'black'}
                          type={field.type}
                          errors={errors?.payment?.[0]}
                          placeholder={field.placeholder}
                          control={control}
                        />
                      </Col>
                    ))}
                    <Col md={4} className="">
                      <label style={{ color: 'black' ,fontWeight:500 ,marginBottom:"8px "}}>Select Country</label>
                      <Select
                        options={AllCountry}
                        placeholder={'Select Country'}
                        onChange={(selectedOption) => handleCountryChange(selectedOption, index)}
                        styles={customStyles}
                      />
                    </Col>
                    <Col md={4} className="">
                      <label style={{ color: 'black' ,fontWeight:500 ,marginBottom:"8px "}}>Select State</label>
                      <Select
                        options={states}
                        placeholder={'Select State'}
                        onChange={(selectedOption) => handleStateChange(selectedOption, index)}
                        styles={customStyles}
                      />
                    </Col>

                    {paymentFields?.[0].slice(3, 4)?.map((field, idx) => (
                      <Col md={4} className="mb-3" key={idx}>
                        <TextFormInputPayment
                          name={`payment[${index}].${field.name}`}
                          label={field?.label}
                          type={field.type}
                          color={'black'}
                          errors={errors?.payment?.[0]}
                          placeholder={field.placeholder}
                          control={control}
                        />
                      </Col>
                    ))}
                  </Row>

                  <Row className=" p-3 rounded shadow">
                    <Col md={9}>
                      <Row>
                        {paymentFields?.[0].slice(4, 5)?.map((field, idx) => (
                          <Col md={5} className="mb-3" key={idx}>
                            <TextFormInputPayment
                              name={`payment[${index}].${field.name}`}
                              label={field?.label}
                              type={field.type}
                              color={'black'}
                              errors={errors?.payment?.[0]}
                              placeholder={field.placeholder}
                              control={control}
                            />
                          </Col>
                        ))}
                        <Col className="d-flex align-items-center">
                          <img src={Visa} alt="Visa Logo" className="mt-2" height={40} />
                        </Col>
                        {paymentFields?.[0].slice(5, 6)?.map((field, idx) => (
                          <Col md={5} className="mb-3" key={idx}>
                            <TextFormInputPayment
                              name={`payment[${index}].${field.name}`}
                              label={field?.label}
                              color={'black'}
                              type={field.type}
                              errors={errors?.payment?.[0]}
                              placeholder={field.placeholder}
                              control={control}
                            />
                          </Col>
                        ))}
                        {paymentFields?.[0].slice(6, 8)?.map((field, idx) => (
                          <Col md={field?.label === 'Expiry Date' ? 4 : 3} className="mb-3" key={idx}>
                            <TextFormInputPayment
                              name={`payment[${index}].${field.name}`}
                              label={field?.label}
                              type={field.type}
                              color={'black'}
                              errors={errors?.payment?.[0]}
                              placeholder={field.placeholder}
                              control={control}
                            />
                          </Col>
                        ))}
                      </Row>
                    </Col>
                    <Col md={3} className="d-flex justify-content-center align-items-center">
                      <img src={Secure} alt="Secure" height={100} />
                    </Col>
                  </Row>

                  {fields.length > 0 && (
                    <Button variant="outline-danger" onClick={() => remove(index)} className="mt-3">
                      <IconifyIcon icon="fa6-solid:trash" className="me-2" /> Remove
                    </Button>
                  )}

                  {index === 0 && <h6 className="mt-4 mb-3 text-black">Second Payment Method</h6>}
                </>
              ))}
              <div className="text-center mt-3 " style={{ display: 'flex', justifyContent: 'start' }}>
                <Button
                  variant="outline-primary"
                  onClick={() =>
                    append({
                      card_number: '',
                      cvc_code: '',
                      expiry_date: '',
                      state: '',
                      country: '',
                      zip_code: '',
                      card_name: '',
                      billing_address: '',
                    })
                  }>
                  Add a Second Payment Method
                </Button>
              </div>

              <Col sm={12} className="mt-3">
                <div className="form-check  form-switch-primary">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    style={{ borderColor: !isChecked && 'red' }}
                    id="customSwitchSuccess"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" style={{ cursor: 'pointer', color: 'black' }} htmlFor="customSwitchSuccess">
                    I agree to have my payment processed by my Travel Professional for payment of my quoted travel
                  </label>
                </div>
                {erroragrement && <div className="text-danger mt-2">{erroragrement}</div>}
              </Col>

              <div className="text-center mt-4">
                <Button variant="success" type="submit">
                  Submit Payment Information
                  {loading && <Spinner size="sm" className="ms-2" />}
                </Button>
              </div>
            </div>
          </Form>
        </Col>
        <PaymentRightInformation travel={travel} />
      </div>
    </div>
  )
})
export default PaymentForm 
