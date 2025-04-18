/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
import { Suspense, useEffect, useState } from 'react'
import CommisionTable from './CommissionTable'
import { getAllCommissionsadmin } from '../../../../utils/Services/CommissionServices'
import { useNotificationContext } from '../../../../context/useNotificationContext'
import SelectFormInput from '@/components/form/SelectFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import { statusoption } from '../../../../utils/Services/CommissionServices'
import { getAllagentsoption } from '../../../../utils/Services/AgentServices'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { mkConfig, generateCsv, download } from 'export-to-csv'
import IconifyIcon from '../../../../components/wrappers/IconifyIcon'
export default function SubmittedCommission() {
  const today = new Date().toISOString().split('T')[0]
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
    filename: `Commission_${today}`,
  })
  const [commssion, setCommission] = useState([])
  const [filteredCommission, setFilteredCommission] = useState([])
  const { showNotification } = useNotificationContext()
  const [loading, setloading] = useState(false)
  const filterData = filteredCommission.filter((e) => e?.is_draft == 0)

  useEffect(() => {
    getAllCommissionsadmin((data) => {
      setCommission(data)
      setFilteredCommission(data)
    }, setloading)
  }, [])

  const defaultValues = {
    agent_name: '',
    status: '',
  }
  const [agent, setAgent] = useState([])
  const [, setAgentloading] = useState([])
  const { control, watch, setValue, reset } = useForm({
    resolver: yupResolver(),
    defaultValues,
  })
  const data = watch()

  useEffect(() => {
    getAllagentsoption(setAgent, setAgentloading)
  }, [])
  const handleFilters = () => {
    const searchText = data?.search?.toLowerCase() || ''

    const filterAgent = commssion.filter((e) => {
      const agentMatch = !data?.agent_name || e?.subadmin?.some((sub) => sub.id == data?.agent_name)
      const statusMatch = !data?.status || e?.status == data?.status

      const searchMatch =
        Object.values(e).some((value) => value && value.toString().toLowerCase().includes(searchText)) ||
        e?.subadmin?.some((sub) => sub.fname.toLowerCase().includes(searchText) || sub.lname.toLowerCase().includes(searchText))

      return agentMatch && statusMatch && searchMatch
    })
    setFilteredCommission(filterAgent)
  }

  const handleClearFilters = () => {
    setValue('status', '')
    setValue('agent_name', '')
    reset()
    setFilteredCommission(commssion)
  }
  useEffect(() => {
    handleFilters()
  }, [data.search])
  const customizeDataForExport = (data) => {
    return data?.map((item) => ({
      DateSubmitted: item.today_date,
      AgentName: item.subadmin?.[0]?.fname + ' ' + item?.subadmin?.[0]?.lname,
      AgentEmail: item.subadmin?.[0]?.email,
      Supplier: item.supplier?.supplier_name,
      ReservationNumber: item.reservation_number,
      InternalNotes: item.internal_notes,
      TravelDate: item.departure_date,
      GrossCommission: item.gross_commision,
      AgentCommission: item.agent_commision,
      Status: item.status,
      Notes: item.notes,
    }))
  }
  const exportToExcel = () => {
    const customizedData = customizeDataForExport(filterData)
    // const filename = `Commission ${today}`
    const csv = generateCsv(csvConfig)(customizedData)
    console.log('Generated CSV with dummy data:', csv)
    if (csv) {
      download(csvConfig)(csv)
    }
  }
  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col>
                <Row>
                  <Col md={3} xs={12}>
                    <TextFormInput
                      containerClassName="w-100"
                      label="Search..."
                      name="search"
                      control={control}
                      placeholder="Type something here..."
                      noValidate
                    />
                  </Col>
                  <Col md={3} xs={12}>
                    <SelectFormInput
                      name="agent_name"
                      control={control}
                      label="Select Agent"
                      labelClassName="mt-1"
                      containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
                      options={agent}
                    />
                  </Col>
                  <Col md={3} xs={12}>
                    <SelectFormInput
                      name="status"
                      control={control}
                      defaultValue=""
                      label="Select Status"
                      labelClassName="mt-1"
                      containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
                      options={statusoption}
                    />
                  </Col>
                  <Col md={1} sx={3}>
                    <Button className="dashboard_filter_button" variant="success" onClick={handleFilters}>
                      Filter
                    </Button>
                  </Col>
                  <Col md={1} sx={3}>
                    <Button className="dashboard_filter_button" variant="danger" onClick={handleClearFilters}>
                      Clear
                    </Button>
                  </Col>
                </Row>
              </Col>
              <CardTitle as={'h4'}>Submitted Commission</CardTitle>
            </Row>
            <Col xs="auto">
              <Button variant="success" className="mt-2" onClick={exportToExcel}>
                <IconifyIcon icon="fa6-solid:download" className="me-1" /> Export CSV
              </Button>
            </Col>
          </CardHeader>
          <CardBody className="pt-0">
            <Suspense fallback={<Preloader />}>
              {filteredCommission && (
                <CommisionTable
                  commssion={filterData}
                  setcommssion={setFilteredCommission}
                  setloadingcommision={setloading}
                  loading={loading}
                  showNotification={showNotification}
                />
              )}
            </Suspense>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
