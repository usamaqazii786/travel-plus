import React, { useEffect, useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Col } from 'react-bootstrap'
import SelectFormInput from '@/components/form/SelectFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import {
  addOnsFields,
  clientRecord,
  cruiseFieldsquotelineFields,
  flightFields,
  groundFields,
  hotelFields,
  quoteFields,
  travelerFields,
} from './AllFields'
import { Icon } from '@iconify/react'
import { getAllclientoption } from '../../../../utils/Services/ClientServices'

const tabFieldMap = {
  Traveler: travelerFields,
  Cruise: cruiseFieldsquotelineFields,
  Hotel: hotelFields,
  Flight: flightFields,
  'Ground Transportation': groundFields,
  'Add-Ons': addOnsFields,
  quoteHeader: quoteFields,
  clientRecord: clientRecord,
}

const AllNewFileldCondition = (props) => {
  const { activeTab, control, matchedTabs, traveltype, setActiveTab, editPage, handleSubmit, HandleCOnvert, onSubmit, setValue } = props
  const activeFields = tabFieldMap[activeTab] || []
  const [client, setclient] = useState([])
  const [, setloading] = useState(false)

  useEffect(() => {
    getAllclientoption(setclient, setloading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(activeTab, matchedTabs, traveltype, 'activeTab');

  return (
    <>
      <Nav className="nav-tabs mb-3" style={{ borderBottom: 'none' }} role="tablist">
        <NavItem>
          <NavLink
            eventKey="quoteHeader"
            className={activeTab === 'quoteHeader' ? 'active' : ''}
            role="tab"
            onClick={() => setActiveTab('quoteHeader')}
            aria-selected={activeTab === 'quoteHeader'}>
            <Icon icon="akar-icons:header" width={20} className="me-2" />
            Quote Header Fields
          </NavLink>
        </NavItem>

        {matchedTabs && (
          <div>
            <Nav tabs>
              {matchedTabs?.map((tab) => (
                <NavItem key={tab}>
                  <NavLink
                    eventKey={tab}
                    className={activeTab === tab ? 'active' : ''}
                    onClick={() => setActiveTab(tab)}
                    role="tab"
                    aria-selected={activeTab === tab}>
                    <Icon icon="carbon:tabs" width={20} className="me-2" />
                    {tab}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </div>
        )}

        <NavItem>
          <NavLink
            eventKey="clientRecord"
            className={activeTab === 'clientRecord' ? 'active' : ''}
            role="tab"
            onClick={() => setActiveTab('clientRecord')}
            aria-selected={activeTab === 'clientRecord'}>
            <Icon icon="fluent:person-24-regular" width={20} className="me-2" />
            Client Record
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        {activeFields?.length > 0 && (
          <TabPane eventKey={activeTab} id={activeTab} role="tabpanel">
            {activeTab === 'quoteHeader' && (
              <>
                <SelectFormInput
                  key="travel_type"
                  name={'travel_type'}
                  control={control}
                  label={'Select Travel Type'}
                  labelClassName="mt-2"
                  containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
                  options={traveltype}
                />
                <SelectFormInput
                  name={'client_id'}
                  control={control}
                  label={'Select Client'}
                  labelClassName="mt-2"
                  containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
                  options={client}
                />
              </>
            )}
            {activeTab === 'Traveler' && (
              <>
                <SelectFormInput
                  name={'traveler'}
                  control={control}
                  label={'Select Traveler'}
                  labelClassName="mt-2"
                  containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
                  options={client}
                />
              </>
            )}
            {activeFields?.map((field, index) => (
              <>
                {field.type === 'select' ? (
                  <>
                    <SelectFormInput
                      name={field.name}
                      control={control}
                      label={'SELECT ' + field.name.replace(/_/g, ' ').toUpperCase()}
                      labelClassName="mt-2"
                      containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
                      options={field.options}
                    />
                  </>
                ) : field.type === 'file' ? (
                  <>
                    <label htmlFor="Profilephoto">Profile Photo</label>
                    <input
                      name="image"
                      className="form-control"
                      onChange={(e) => setValue('profile', e.target.files[0])}
                      label="Attech Profile Picture"
                      type="file"
                    />
                  </>
                ) : (
                  <>
                    <TextFormInput
                      key={index}
                      name={field.name}
                      type={field.type}
                      label={field.name.replace(/_/g, ' ').toUpperCase()}
                      containerClassName="mb-2"
                      placeholder={`Enter ${field.name.replace(/_/g, ' ')}`}
                      control={control}
                    />
                  </>
                )}
              </>
            ))}
            {activeTab === 'clientRecord' && (
              <Col className="d-flex justify-content-around ">
                <Button variant="primary" type="submit" className="mt-2" onClick={handleSubmit(onSubmit)}>
                  Submit form
                </Button>
                {editPage && (
                  <>
                    <Button variant="primary" onClick={handleSubmit(HandleCOnvert)} typ className="mt-2">
                      Show Payment Information
                    </Button>
                    <Button variant="primary" onClick={handleSubmit(HandleCOnvert)} typ className="mt-2">
                      Delete Payment Information
                    </Button>
                    <Button variant="primary" onClick={handleSubmit(HandleCOnvert)} typ className="mt-2">
                      Convert Travel Quote to Travel Itinerary
                    </Button>
                  </>
                )}
              </Col>
            )}
          </TabPane>
        )}
      </TabContent>
    </>
  )
}

export default AllNewFileldCondition
