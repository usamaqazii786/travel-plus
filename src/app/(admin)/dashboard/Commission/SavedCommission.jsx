import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import Preloader from '@/components/Preloader'
import { Suspense, useEffect, useState } from 'react'
import CommisionTable from './CommissionTable'
import { getAllCommissionsSaveadmin } from '../../../../utils/Services/CommissionServices'
import { useNotificationContext } from '../../../../context/useNotificationContext'
import SelectFormInput from '@/components/form/SelectFormInput'
import { statusoption } from '../../../../utils/Services/CommissionServices'
import { mkConfig, generateCsv, download } from 'export-to-csv'

import { getAllagentsoption } from '../../../../utils/Services/AgentServices'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import IconifyIcon from '../../../../components/wrappers/IconifyIcon'
export default function SavedCommission() {
  // const [commssion, setCommission] = useState([])
  // const [, setloading] = useState(false)

  const [commssion, setCommission] = useState([])
  const [filteredCommission, setFilteredCommission] = useState([])
  const { showNotification } = useNotificationContext()
  const [, setloading] = useState(false)
  const filterData = filteredCommission.filter((e) => e?.is_draft == 1)
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  })
  useEffect(() => {
    getAllCommissionsSaveadmin((data) => {
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
  const exportToExcel = () => {
    const csv = generateCsv(csvConfig)(data)
    download(csvConfig)(csv)
    console.log(csv)
  }

  const handleFilters = () => {
    const filterAgent = commssion.filter(
      (e) => (!data?.agent_name || e?.subadmin?.[0]?.id == data?.agent_name) && (!data?.status || e?.status == data?.status),
    )
    setFilteredCommission(filterAgent)
  }

  const handleClearFilters = () => {
    setValue('status', '')
    setValue('agent_name', '')
    reset()
    setFilteredCommission(commssion)
  }

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col>
                <Col>
                  <Row>
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
                <CardTitle as={'h4'}>Commision</CardTitle>
              </Col>

              <Col xs="auto">
                <Button className=" text-dark me-1" onClick={exportToExcel}>
                  <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Agent
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="pt-0">
            <Suspense fallback={<Preloader />}>
              {commssion && (
                <CommisionTable
                  commssion={filterData}
                  setcommssion={setFilteredCommission}
                  setloadingcommision={setloading}
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
