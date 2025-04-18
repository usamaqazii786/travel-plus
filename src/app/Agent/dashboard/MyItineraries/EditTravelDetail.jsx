/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable for-direction */
import { Nav, TabContainer, TabContent, Container } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { customFormSchema } from './ItineriesSchema'
import React, { useEffect, useState } from 'react'

import { useNotificationContext } from '../../../../context/useNotificationContext'
import { axiosInstance } from '../../../../utils/AxiosInstance'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import SendQuoteEmails from './SendQuoteEmails'

import PaymentCard from '../PaymentNotification/PaymentCard'
import { Convert, EditTravel } from '../../../../utils/Services/TravelquoteServices'
import { withSwal } from 'react-sweetalert2'
import TabPanes from '../../../../components/TabsForTravel/TabPane'
import { useTab } from '../../../../utils/Services/TabsServices'
import Tabs from '../../../../components/TabsForTravel/Tabs'

const EditTravelDetail = withSwal(() => {
  const [addloading, setaddloading] = useState(false)
  const [convertloading, setconvertloading] = useState(false)

  const [, setEventKey] = useState([])
  const [AllData, setAllData] = useState([])
  const [index, setIndex] = useState(0)
  const [member, setmember] = useState([])
  const navigate = useNavigate()
  const { state } = useLocation()

  const defaultValues = {
    quoteHeader: [
      {
        travel_type: state?.travel_type || '',
      },
      {
        title: state?.title || '',
      },
      {
        client_id: state?.client_id || '',
      },
      {
        travel_start_date: state?.travel_start_date || '',
      },
      {
        travel_end_date: state?.travel_end_date || '',
      },
      {
        number_of_adults: state?.number_of_adults || '',
      },
      {
        number_of_children: state?.number_of_children || '',
      },
      {
        total_cost: state?.total_cost || '',
      },
      {
        deposit_paid: state?.deposit_paid || '',
      },
      {
        agent_notes: state?.agent_notes || ' ',
      },
      {
        destination: state?.destination || ' ',
      },
      {
        trip_image: state?.trip_image || ' ',
      },
    ],
    traveler: state?.guest_detail?.map((item) => ({
      traveler: item?.traveler || '',
      traveler_type: item?.traveler_type || '',
      traveler_first_name: item?.traveler_first_name || '',
      traveler_middle_name: item?.traveler_middle_name || '',
      traveler_last_name: item?.traveler_last_name || '',
      traveler_gender: item?.traveler_gender || '',
      id: item?.id,
      traveler_age: item?.traveler_age || '',
      traveler_date_of_birth: item?.traveler_date_of_birth || '',
      traveler_loyalty_number: item?.traveler_loyalty_number || '',
      traveler_known_traveler_number: item?.traveler_known_traveler_number || '',
      traveler_room_number: item?.traveler_room_number || '',
      traveler_flight_number: item?.traveler_flight_number || '',
    })),
    ground: [
      {
        transportation_company: state?.transportation_company || '',
      },
      {
        transportation_type: state?.transportation_type || '',
      },
      {
        transportation_number_of_passengers: state?.transportation_number_of_passengers || '',
      },
      {
        transportation_departing_location: state?.transportation_departing_location || '',
      },
      {
        transportation_arriving_location: state?.transportation_arriving_location || '',
      },
      {
        transportation_departure_datetime: state?.transportation_departure_datetime || '',
      },
      {
        transportation_arrival_datetime: state?.transportation_arrival_datetime || '',
      },
      {
        transportation_total_cost: state?.transportation_total_cost || '',
      },
      {
        transportation_deposit_required: state?.transportation_deposit_required || '',
      },
    ],
    cruise: [
      {
        cruise_line: state?.cruise_line || '',
      },
      {
        cruise_ship: state?.cruise_ship || '',
      },
      {
        cruise_stateroom_type: state?.cruise_stateroom_type || '',
      },
      {
        cruise_stateroom_number: state?.cruise_stateroom_number || '',
      },
      {
        cruise_deck: state?.cruise_deck || '',
      },
      {
        cruise_number_of_days: state?.cruise_number_of_days || '',
      },
      {
        cruise_number_of_adults: state?.cruise_number_of_adults || '',
      },
      {
        cruise_number_of_kids: state?.cruise_number_of_kids || '',
      },
      {
        cruise_departing_port: state?.cruise_departing_port || '',
      },
      {
        cruise_port_stop: state?.cruise_port_stop || '',
      },
      {
        cruise_ending_port: state?.cruise_ending_port || '',
      },
      {
        cruise_dining: state?.cruise_dining || '',
      },
      {
        cruise_total_cost: state?.cruise_total_cost || '',
      },
      {
        cruise_deposit_required: state?.cruise_deposit_required || '',
      },
      {
        cruise_notes: state?.cruise_notes || '',
      },
    ],
    hotel: [
      {
        hotel_name: state?.hotel_name || '',
      },
      {
        hotel_room_type: state?.hotel_room_type || '',
      },
      {
        hotel_number_of_adults: state?.hotel_number_of_adults || '',
      },
      {
        hotel_number_of_kids: state?.hotel_number_of_kids || '',
      },
      {
        hotel_special_request: state?.hotel_special_request || '',
      },

      {
        hotel_total_cost: state?.hotel_total_cost || '',
      },
      {
        hotel_deposit_required: state?.hotel_deposit_required || '',
      },
    ],

    addon: state?.add_ons?.map((item) => ({
      add_ons_description: item?.add_ons_description || '',
      add_ons_start_date: item?.add_ons_start_date || '',
      add_ons_end_date: item?.add_ons_end_date || '',
      id: item?.id || '',
      add_ons_type: item?.add_ons_type || '',
      add_ons_number_of_adults: item?.add_ons_number_of_adults || '',
      add_ons_number_of_kids: item?.add_ons_number_of_kids || '',
      add_ons_total_cost: item?.add_ons_total_cost || '',
      add_ons_deposit_required: item?.add_ons_deposit_required || '',
    })),
    feedback: [
      {
        feedback: state?.feedback || '',
      },
    ],
    clientRecord: [
      {
        client_type: state?.client_type || '',
      },
      {
        client_first_name: state?.client_first_name || '',
      },
      {
        client_middle_name: state?.client_middle_name || '',
      },
      {
        client_last_name: state?.client_last_name || '',
      },
      {
        client_age: state?.client_age || '',
      },
      {
        client_email: state?.client_email || '',
      },
      {
        client_gender: state?.client_gender || '',
      },
      {
        client_date_of_birth: state?.client_date_of_birth || '',
      },
      {
        client_notes: state?.client_notes || '',
      },
    ],
    flight: state?.flight?.map((item) => ({
      flight_airline: item?.flight_airline || '',
      flight_flight_number: item?.flight_flight_number || '',
      flight_number_of_passengers: item?.flight_number_of_passengers || '',
      flight_departure_datetime: item?.flight_departure_datetime || '',
      flight_arrival_datetime: item?.flight_arrival_datetime || '',
      flight_departing_city: item?.flight_departing_city || '',
      flight_arrival_city: item?.flight_arrival_city || '',
      flight_total_cost: item?.flight_total_cost || '',
      id: item?.id || '',
      flight_deposit_required: item?.flight_deposit_required || '',
    })),

    ticket: state?.ticket?.map((item) => ({
      ticket_name: item?.ticket_name || '',
      ticket_type: item?.ticket_type || '',
      ticket_price: item?.ticket_price || '',
      id: item?.id || '',
      ticket_total_price: item?.ticket_total_price || '',
      ticket_quantity: item?.ticket_quantity || '',
    })),
  }

  const [client, setData] = useState([])
  const { control, handleSubmit, watch, setValue, reset } = useForm({
    resolver: yupResolver(customFormSchema),
    defaultValues,
  })

  const { showNotification } = useNotificationContext()
  const data = watch()
  // console.log(data)
  const { traveltype, tabs } = useTab(data?.quoteHeader?.[0]?.travel_type)
  const keyName = tabs.map((key) => {
    return key.eventKey
  })

  const { id } = useParams()
  useEffect(() => {
    if (state) {
      reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const onSubmit = async (data) => {
    EditTravel(data, setaddloading, showNotification, id, navigate, keyName)
  }
  const HandleCOnvert = async () => {
    Convert(setconvertloading, showNotification, id, navigate)
  }

  // const HandleDelete = () => {
  //   PaymentDelete(setdeletelading, id, showNotification, navigate)
  // }
  const fetchClients = () => {
    axiosInstance
      .get('/subadmin/client')
      .then((response) => {
        if (response?.data) {
          const datas = response?.data?.data.map((e) => ({
            value: e.id,
            label: e.family_name,
          }))
          const family = response?.data?.data
          const filter = family.filter((e) => e?.id === data?.quoteHeader?.[2]?.client_id)
          setValue(`clientRecord[${5}].client_email`, filter?.[0]?.email)

          const option =
            filter?.[0]?.family_member_age?.map((e) => ({
              value: e.id,
              label: e.member_name,
              birthday: e?.age,
            })) || []

          setmember(option)
          // setfamily(response.data.data)
          setData(datas)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    const DoB = member?.filter((e) => {
      return e?.value === data?.traveler?.[0]?.traveler
    })
    setValue(`traveler[${7}].traveler_date_of_birth`, DoB?.[0]?.birthday)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.traveler?.[0]?.traveler])

  useEffect(() => {
    const AllData = tabs?.filter((e) => e?.condition) || []
    setAllData(AllData)
    const hi = AllData.map((e) => e?.eventKey)
    setEventKey(hi)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.quoteHeader?.[0]?.travel_type])

  const HandleIndex = () => {
    const currentIndex = AllData.findIndex((e) => e?.id === Number(index))
    if (currentIndex >= 0) {
      for (let i = currentIndex + 1; i >= 0; i++) {
        if (AllData[i]) {
          setIndex(AllData[i]?.id)
          break
        }
      }
    } else {
      console.warn('No previous elements available.')
    }
  }

  const HandlePrev = () => {
    const currentIndex = AllData.findIndex((e) => e?.id === index)

    if (currentIndex > 0) {
      for (let i = currentIndex - 1; i >= 0; i--) {
        if (AllData[i]) {
          setIndex(AllData[i]?.id)
          break
        }
      }
    } else {
      console.warn('No previous elements available.')
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])
  const ispayment = state?.client_payment_info.length > 0
  const sameAsLead = () => {
    setValue(`clientRecord[${0}].client_type`, data?.traveler?.[1]?.traveler_type)
    setValue(`clientRecord[${1}].client_first_name`, data?.traveler?.[2]?.traveler_first_name)
    setValue(`clientRecord[${2}].client_middle_name`, data?.traveler?.[3]?.traveler_middle_name)
    setValue(`clientRecord[${3}].client_last_name`, data?.traveler?.[4]?.traveler_last_name)
    setValue(`clientRecord[${4}].client_age`, data?.traveler?.[6]?.traveler_age)
    setValue(`clientRecord[${6}].client_gender`, data?.traveler?.[5]?.traveler_gender)
    setValue(`clientRecord[${7}].client_date_of_birth`, data?.traveler?.[7]?.traveler_date_of_birth)
  }

  return (
    <Container>
      <h2>Edit Travel Detail</h2>
      <TabContainer defaultActiveKey={0} onSelect={(key) => setIndex(key)} activeKey={index}>
        <Nav className="nav-tabs mb-3" style={{ borderBottom: 'none' }} role="tablist">
          {tabs?.map((item) => (item?.condition ? <Tabs icon={item?.icon} eventKey={item?.id} label={item?.label} /> : null))}
        </Nav>

        <TabContent>
          {tabs?.map((e) =>
            e?.condition ? (
              <TabPanes
                control={control}
                client={client}
                setValue={setValue}
                UpdateForm={true}
                HandlePrev={HandlePrev}
                member={member}
                index={index}
                sameAsLead={sameAsLead}
                HandleIndex={HandleIndex}
                onSubmit={onSubmit}
                ispayment={ispayment}
                convertloading={convertloading}
                addloading={addloading}
                HandleCOnvert={HandleCOnvert}
                handleSubmit={handleSubmit}
                traveltype={traveltype}
                eventKey={e.eventKey}
                id={e.id}
                role="tabpanel"
              />
            ) : (
              ''
            ),
          )}
        </TabContent>
      </TabContainer>
      {state?.paymentInformation?.length !== 0 && <PaymentCard data={state?.client_payment_info} id={id} />}
    </Container>
  )
})
export default EditTravelDetail
