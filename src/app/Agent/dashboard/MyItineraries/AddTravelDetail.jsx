/* eslint-disable for-direction */
/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import { Nav, TabContainer, TabContent } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { customFormSchema } from './ItineriesSchema'
import { useEffect, useRef, useState } from 'react'
import { useNotificationContext } from '../../../../context/useNotificationContext'
import { axiosInstance } from '../../../../utils/AxiosInstance'
import { useNavigate } from 'react-router-dom'
import { AddTravel } from '../../../../utils/Services/TravelquoteServices'
import { useTab } from '../../../../utils/Services/TabsServices'
import Tabs from '../../../../components/TabsForTravel/Tabs'
import TabPanes from '../../../../components/TabsForTravel/TabPane'
export default function AddTravelDetail() {
  const navigate = useNavigate()
  const [client, setData] = useState([])
  const [member, setmember] = useState([])
  const [, setEventKey] = useState([])
  const [AllData, setAllData] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setloading] = useState(false)
  const [loadingsave, setloadingsave] = useState(false)
  const Tabsref = useRef(null)
  const { control, handleSubmit, watch, setValue,formState:{errors} } = useForm({
    resolver: yupResolver(customFormSchema),
    defaultValues: {
      flight: [{}],
      addon: [{}],
      ticket: [{}],
      traveler: [{}],
    },
  })

  console.log(errors)

  const { showNotification } = useNotificationContext()
  const data = watch()
  console.log(data)
  // console.log(data)
  const { traveltype, tabs } = useTab(data?.quoteHeader?.[0]?.travel_type)
  const keyName = tabs.map((key) => {
    return key.eventKey
  })

  const onSubmit = async (data) => {
    // console.log(data)
    AddTravel(data, setloading, showNotification, navigate, keyName)
  }

  const onSaved = async (data) => {
    // console.log(data)
    const isSave = true
    AddTravel(data, setloadingsave, showNotification, navigate, keyName, isSave)
  }
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
          const filter = family.filter((e ) => e?.id === data?.quoteHeader?.[2]?.client_id)
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
    fetchClients(setData)
  }, [data?.quoteHeader?.[2]?.client_id])

  // useEffect(() => {
  //   const DoB = member?.filter((e) => {
  //     return e?.value === data?.traveler?.[0]?.traveler
  //   })

  //   setValue(`traveler[${7}].traveler_date_of_birth`, DoB?.[0]?.birthday)

  // }, [data?.traveler?.[0]?.traveler])

  useEffect(() => {
    const AllData = tabs?.filter((e) => e?.condition) || []
    setAllData(AllData)
    const hi = AllData.map((e) => e?.eventKey)
    setEventKey(hi)
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
      // Look for the previous available element in AllData
      for (let i = currentIndex - 1; i >= 0; i--) {
        if (AllData[i]) {
          setIndex(AllData[i]?.id) // Set the ID of the previous available element
          break
        }
      }
    } else {
      console.warn('No previous elements available.')
    }
  }
  // const sameAsLead = () => {
  //   setValue(`clientRecord[${0}].client_type`, data?.traveler?.[1]?.traveler_type)
  //   setValue(`clientRecord[${1}].client_first_name`, data?.traveler?.[2]?.traveler_first_name)
  //   setValue(`clientRecord[${2}].client_middle_name`, data?.traveler?.[3]?.traveler_middle_name)
  //   setValue(`clientRecord[${3}].client_last_name`, data?.traveler?.[4]?.traveler_last_name)
  //   setValue(`clientRecord[${4}].client_age`, data?.traveler?.[6]?.traveler_age)
  //   setValue(`clientRecord[${6}].client_gender`, data?.traveler?.[5]?.traveler_gender)
  //   setValue(`clientRecord[${7}].client_date_of_birth`, data?.traveler?.[7]?.traveler_date_of_birth)
  // }
  // console.log(data)
  // function SaveAsDrafth() {
  //   const isSave = true
  //   AddTravel(data, setloading, showNotification, navigate, keyName, isSave)
  // }
  // useEffect(() => {
  //   return () => {
  //     SaveAsDrafth()
  //   }
  // }, [])

  return (
    <Container>
      <h2>Add Travel Detail</h2>
      <TabContainer defaultActiveKey={0} onSelect={(key) => setIndex(key)} activeKey={index}>
        <Nav className="nav-tabs mb-3" style={{ borderBottom: 'none' }} role="tablist">
          {tabs?.map((item, index) => (item?.condition ? <Tabs icon={item?.icon} index={index} eventKey={item?.id} label={item?.label} /> : null))}
        </Nav>

        <TabContent>
          {tabs?.map((e) =>
            e?.condition ? (
              <TabPanes
                control={control}
                Tabsref={Tabsref}
                client={client}
                addloading={loading}
                loadingsave={loadingsave}
                setValue={setValue}
                onSubmit={onSubmit}
                HandlePrev={HandlePrev}
                member={member}
                AddForm={true}
                onSaved={onSaved}
                // sameAsLead={sameAsLead}
                index={index}
                HandleIndex={HandleIndex}
                handleSubmit={handleSubmit}
                traveltype={traveltype}
                eventKey={e.eventKey}
                //  keyName={Data}
                id={e.id}
                role="tabpanel"
              />
            ) : null,
          )}
        </TabContent>
      </TabContainer>
    </Container>
  )
}
