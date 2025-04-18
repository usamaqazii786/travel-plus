import { Button, Col, Form, Row } from 'react-bootstrap'
import './MyItineraries/Css/Dashboard.css'
import PageMetaData from '@/components/PageMetaData'
import TableRightDashboardAgent from './TableRightDashboardAgent'
import TravelQuotes from './TravelQuotes/page'
import Flatpickr from 'react-flatpickr'
import SelectFormInput from '@/components/form/SelectFormInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { withSwal } from 'react-sweetalert2'
import { getAllclientoption } from '../../../utils/Services/ClientServices'
// import { getAllsupplieroption } from '../../../utils/Services/SupplierServices'

// import { useNotificationContext } from '../../../context/useNotificationContext'
import Preloader from '../../../components/Preloader'
import { getAllTravel } from '../../../utils/Services/TravelquoteServices'

import { getAllWebsite } from '../../../utils/Services/WebsiteServices'
import { getAllIt } from '../../../utils/Services/Itenary'
import { useDispatch } from 'react-redux'
// import { getAllWebsite } from '../../../utils/Services/WebsiteServices'
// import { getProducts } from '../../../redux/slices/product'
// import { useDispatch, useSelector } from '../../../redux/store'

const Dashboard = withSwal((props) => {
  const { swal } = props
  const checkDepartue = localStorage.getItem('checkDepartue') || {}
  const travelData = localStorage.getItem('traveldata')
  const checkTravel = travelData && travelData !== 'undefined' ? JSON.parse(travelData) : {}
  const dispatch = useDispatch()
  const [loading, setloading] = useState(false)
  const [Data, setdatas] = useState([])

  const [loadings, setloadings] = useState(false)
  // const [supplier, setSupplier] = useState([])
  // const { showNotification } = useNotificationContext()
  const check = checkDepartue != 'undefined'
  const travel = checkTravel != 'undefined'

  useEffect(() => {
    if (check && travel) {
      const names = checkTravel?.itinerary?.map((item) => item.travel_quote?.title)
      const namesString = names.join(', ')
      swal
        .fire({
          title: 'Welcome to Travel Plus',
          text: `Welcome to Travel Plus / Your travel quote date is today. Don’t miss it! Travel Quote Name :${namesString}`,
          confirmButtonText: 'Got It',
        })
        .then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem('checkDepartue', 'undefined')
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [client, setdata] = useState([])
  const defaultValues = {
    start_date: '',
    end_date: '',
    client_id: '',
  }

  const { control, watch, setValue, reset } = useForm({
    resolver: yupResolver(),
    defaultValues,
  })
  const data = watch()

  const [todayDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    getAllclientoption(setdata, setloading)
    // getAllsupplieroption(setSupplier, setloading)
  }, [])
  const [Datait, setdatait] = useState()
  const [loadingit, setloadingit] = useState(false)

  useEffect(() => {
    getAllIt(setdatait, setloadingit)
    getAllTravel(setdatas, setloadings)
    // dispatch(getProducts())

    getAllWebsite(dispatch, setloadings)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilters = () => {
    const startdata = data?.start_date ? new Date(data.start_date) : null
    const enddata = data?.end_date ? new Date(data.end_date) : null

    const startdate = startdata && !isNaN(startdata) ? startdata.toISOString().split('T')[0] : null
    const enddate = enddata && !isNaN(enddata) ? enddata.toISOString().split('T')[0] : null

    const clientFilter = (e) => e?.client_id === data?.client_id

    const dateFilter = (e) => {
      if (!e?.travel_start_date) return false
      const travelDate = e.travel_start_date
      if (startdate && enddate) {
        return travelDate >= startdate && travelDate <= enddate
      }
      return false
    }

    const filteredData = Data.filter((e) => {
      if (startdate && enddate && data?.client_id) {
        return clientFilter(e) && dateFilter(e)
      }
      if (data?.client_id) {
        return clientFilter(e)
      }
      if (startdate && enddate) {
        return dateFilter(e)
      }
      return false
    })

    const filteredDatait = Datait.filter((e) => {
      if (startdate && enddate && data?.client_id) {
        return clientFilter(e) && dateFilter(e)
      }
      if (data?.client_id) {
        return clientFilter(e)
      }
      if (startdate && enddate) {
        return dateFilter(e)
      }
      return false
    })

    setdatas(filteredData)
    setdatait(filteredDatait)
  }

  const handleClearFilters = () => {
    reset()
    setValue('start_date', '')
    setValue('end_date', '')
    getAllIt(setdatait, setloadingit)
    getAllTravel(setdatas, setloadings)
  }
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <PageMetaData title="Dashboard Agent" />
          <Row style={{ display: 'flex' }}>
            <Form className="d-flex justify-content-evenly flex-wrap">
              <Col md={3} xs={12}>
                <label className="mb-2">Travel Start Dates</label>
                <div className="input-group" id="DateRange">
                  <Flatpickr
                    className="form-control"
                    onChange={(event) => setValue('start_date', event)}
                    placeholder="Pick Travel Start Date"
                    options={{
                      enable: [
                        {
                          from: '2000-04-01',
                          to: todayDate,
                        },
                      ],
                    }}
                  />
                </div>
              </Col>
              <Col md={3} xs={12}>
                <label className="mb-2">Travel Ending Dates</label>
                <div className="input-group" id="DateRange">
                  <Flatpickr
                    className="form-control"
                    placeholder="Pick Travel End Date"
                    onChange={(event) => setValue('end_date', event)}
                    options={{
                      from: '2000-04-01',
                      to: '2050-04-01',
                    }}
                  />
                </div>
              </Col>
              <Col md={3} xs={12}>
                <SelectFormInput
                  name="client_id"
                  control={control}
                  label="Select Client"
                  disabled={loading}
                  labelClassName="mt-1"
                  containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
                  options={client}
                />
              </Col>
              <div className="custombutton">
                <Col md={1} sx={6}>
                  <Button className="dashboard_filter_button" variant="success" onClick={handleFilters}>
                    Filter
                  </Button>
                </Col>
                <Col md={1} sx={6}>
                  <Button className="dashboard_filter_button" variant="danger" onClick={handleClearFilters}>
                    clear
                  </Button>
                </Col>
              </div>
            </Form>
            <Col md={6} xs={12}>
              <TravelQuotes setdata={setdatas} Data={Data} loading={loadings} />
            </Col>

            <Col md={6} xs={12}>
              <TableRightDashboardAgent Data={Datait} setloadingit={setloadingit} setdatait={setdatait} loading={loadingit} />
            </Col>
          </Row>
        </>
      )}
    </>
  )
})
export default Dashboard
