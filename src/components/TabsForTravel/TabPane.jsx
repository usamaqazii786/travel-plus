import React from 'react'
import { Card, Col, Spinner, TabPane } from 'react-bootstrap'
import { useFieldArray } from 'react-hook-form'
import TextFormInput from '@/components/form/TextFormInput'
import './style.css'
import SelectFormInput from '@/components/form/SelectFormInput'
import {
  // clientRecord,
  addOnsFields,
  cruiseFields,
  flightFields,
  groundFields,
  hotelFields,
  quoteFields,
  feedbackFields,
  travelerFields,
  ticket,
} from '../../app/Agent/dashboard/MyItineraries/AllFields'

import { screenWidth } from '../../utils/Services/AgentServices'
import CustomButton from '../Button/CustomButton'

import IconifyIcon from '../wrappers/IconifyIcon'

export default function TabPanes(props) {
  const {
    control,
    client,
    loadingsave,
    member,
    addloading,
    isItinerary,
    // sameAsLead,
    // deleteloading,
    // paymentloading,
    convertloading,
    HandlePrev,
    // ispayment,
    setValue,
    onSubmit,
    onSaved,
    AddForm,
    // SendOtp,
    UpdateForm,
    // HandleDelete,
    HandleIndex,
    HandleCOnvert,
    handleSubmit,
    traveltype,
    id,
    eventKey,
  } = props

  const fieldConfigurations = {
    quoteHeader: quoteFields,
    traveler: travelerFields,
    cruise: cruiseFields,
    hotel: hotelFields,
    feedback: feedbackFields,
    flight: flightFields,
    ticket: ticket,
    ground: groundFields,
    addon: addOnsFields,
    // clientRecord: clientRecord,
  }
  // console.log(fieldConfigurations)

  const {
    fields: flightFieldsArray,
    append: appendFlight,
    remove: removeFlight,
  } = useFieldArray({
    control,
    name: 'flight',
  })

  const {
    fields: TravelerFieldsArray,
    append: appendTraveler,
    remove: removeTraveler,
  } = useFieldArray({
    control,
    name: 'traveler',
  })

  const {
    fields: addonsFieldsArray,
    append: appendAddon,
    remove: removeAddon,
  } = useFieldArray({
    control,
    name: 'addon',
  })
  const {
    fields: ticketFieldsArray,
    append: appendTicket,
    remove: removeTicket,
  } = useFieldArray({
    control,
    name: 'ticket',
  })
  const today = new Date().toISOString().split('T')[0]

  const renderField = (field, index, fieldType) => {
    const placeholderText = `Enter ${field?.label}`

    if (field.type === 'select' || field.type === 'selects' || field.type === 'selectss' || field.name === 'travel_type') {
      const options =
        field.type === 'selectss'
          ? member || []
          : field.name === 'client_id'
            ? client
            : field.name === 'travel_type'
              ? traveltype
              : field.options || []
      return (
        <SelectFormInput
          key={index}
          name={`${fieldType}[${index}].${field.name}`}
          control={control}
          min={today}
          label={field.label}
          labelClassName="mt-2"
          containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
          options={options}
        />
      )
    } else if (field.type === 'file') {
      return (
        <div className="mb-2" key={index}>
          <label htmlFor={`${fieldType}[${index}].${field.name}`} className="form-label">
            {field.label || 'Upload Image'}
          </label>
          <input
            type="file"
            className="form-control"
            id={`${fieldType}[${index}].${field.name}`}
            onChange={(e) => {
              const file = e.target.files[0]
              if (file) {
                setValue(`${fieldType}[${index}].${field.name}`, file)
              }
            }}
          />
        </div>
      )
    } else {
      return (
        <TextFormInput
          key={index}
          name={`${fieldType}[${index}].${field.name}`}
          label={field.label}
          type={field.type}
          textarea={field.textarea}
          containerClassName="mb-2"
          placeholder={placeholderText}
          control={control}
        />
      )
    }
  }
  const center = id === 1 || id === 4 || id === 5 || id === 7
  const buttonclass = screenWidth < 500 ? 'mx-1' : 'mx-2'
  const isMobileText = (text) => {
    return screenWidth < 500 ? <IconifyIcon icon="fa6-solid:plus" /> : text
  }
  return (
    <TabPane eventKey={id} id={id} role="tabpanel">
      <Card className="mb-3 row p-2">
        <form id="form-validation-2" onSubmit={handleSubmit(onSubmit)} className="form col-md-12">
          {fieldConfigurations[eventKey]?.map(
            (field, index) =>
              id !== 4 &&
              id !== 7 &&
              id !== 1 &&
              id !== 5 && (
                <div key={index} className="row">
                  {renderField(field, index, eventKey)}
                </div>
              ),
          )}

          {id === 1 && (
            <>
              {TravelerFieldsArray.map((item, index) => (
                <div key={item.id} className="row mb-3">
                  {fieldConfigurations.traveler?.map((field) => renderField(field, index, 'traveler'))}
                  <CustomButton
                    variant="danger"
                    className="w-auto ms-auto  button-align"
                    onClick={() => removeTraveler(index)}
                    label={'Remove Traveler'}
                  />
                </div>
              ))}
            </>
          )}
          {id === 4 && (
            <>
              {flightFieldsArray.map((item, index) => (
                <div key={item.id} className="row mb-3">
                  {fieldConfigurations.flight?.map((field) => renderField(field, index, 'flight'))}

                  <CustomButton
                    variant="danger"
                    className="w-auto ms-auto  button-align"
                    onClick={() => removeFlight(index)}
                    label={'Remove Flight'}
                  />
                </div>
              ))}
            </>
          )}
          {id === 5 && (
            <>
              {ticketFieldsArray.map((item, index) => (
                <div key={item.id} className="row mb-3">
                  {fieldConfigurations.ticket?.map((field) => renderField(field, index, 'ticket'))}

                  <CustomButton
                    variant="danger"
                    className="w-auto ms-auto  button-align"
                    onClick={() => removeTicket(index)}
                    label={' Remove Ticket'}
                  />
                </div>
              ))}
            </>
          )}

          {id === 7 && (
            <>
              {addonsFieldsArray.map((item, index) => (
                <div key={item.id} className="row mb-3">
                  {fieldConfigurations.addon?.map((field) => renderField(field, index, 'addon'))}
                  <CustomButton
                    variant="danger"
                    className={`w-auto ms-auto button-align`}
                    label={'Remove Add-on'}
                    onClick={() => removeAddon(index)}
                  />
                </div>
              ))}
            </>
          )}

          <>
            <Col className={`d-flex ${center ? 'justify-content-between' : 'justify-content-center'} flex-wrap`}>
              <>
                {id === 1 && (
                  <div className="d-flex justify-content-start">
                    <CustomButton
                      variant="success"
                      className="button-plus"
                      onClick={() => appendTraveler({})}
                      label={isMobileText('Add More Traveler')}
                    />
                  </div>
                )}
                {id === 4 && (
                  <div className="d-flex justify-content-start">
                    <CustomButton
                      variant="success"
                      className="button-plus"
                      onClick={() => appendFlight({})}
                      label={isMobileText('Add More Flights')}
                    />
                  </div>
                )}
                {id === 5 && (
                  <div className="d-flex justify-content-start">
                    <CustomButton
                      variant="success"
                      className="button-plus"
                      onClick={() => appendTicket({})}
                      label={isMobileText('Add More Tickets')}
                    />
                  </div>
                )}
                {id === 7 && (
                  <div className="d-flex justify-content-start">
                    <CustomButton
                      variant="success"
                      className="button-plus width-full"
                      onClick={() => appendAddon({})}
                      label={isMobileText('Add More Add-ons')}
                    />
                  </div>
                )}

                {id === 8 && (
                  <div className="d-flex justify-content-center flex-grow-1 mt-1 newclass ">
                    <CustomButton
                      variant="primary"
                      type="submit"
                      className={buttonclass}
                      onClick={handleSubmit(onSubmit)}
                      label={
                        <>
                          Complete {isItinerary ? 'Itinerary' : 'Quote'}
                          {addloading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
                        </>
                      }
                    />
                    {AddForm && (
                      <CustomButton
                        variant="primary"
                        type="submit"
                        className={buttonclass}
                        onClick={handleSubmit(onSaved)}
                        label={
                          <>
                            Save Quote
                            {loadingsave && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
                          </>
                        }
                      />
                    )}
                    {UpdateForm && (
                      <CustomButton
                        variant="primary"
                        className="mx-2"
                        onClick={handleSubmit(HandleCOnvert)}
                        label={
                          <>
                            Convert Travel Quote to Travel Itinerary
                            {convertloading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" />}
                          </>
                        }
                      />
                    )}
                  </div>
                )}
                {id !== 8 && (
                  <div className="d-flex justify-content-center flex-grow-1">
                    {eventKey !== 'quoteHeader' && (
                      <CustomButton variant="primary" className="mx-2 margin-12" onClick={HandlePrev} label={'Previous'} />
                    )}

                    <CustomButton variant="primary" className="mx-2 margin-12" onClick={HandleIndex} label={'Next'} />
                  </div>
                )}
              </>
            </Col>
          </>
        </form>
      </Card>
    </TabPane>
  )
}
