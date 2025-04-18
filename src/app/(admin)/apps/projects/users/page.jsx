import Preloader from '@/components/Preloader'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import { getAllUsers } from '@/helpers/data'
import { Suspense, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import UserDetailsTable from './components/UserDetailsTable'
import PageMetaData from '@/components/PageMetaData'
import { useNavigate } from 'react-router-dom'
import { getAllagents } from '../../../../../utils/Services/AgentServices'
import PermissionWebsite from './components/Modal/PermissionWebsite'
import { getAllWebsites } from '../../../../../utils/Services/WebsiteServices'
import { useNotificationContext } from '../../../../../context/useNotificationContext'
import PermissionSupplier from './components/Modal/PermissionSupplier'
import {  getAllsupplieroptionAdmin } from '../../../../../utils/Services/SupplierServices'
const Users = () => {
  const { showNotification } = useNotificationContext()
  const [users, setAgent] = useState([])
  const [website, setWebsite] = useState([])
  const [supplier, setSupplier] = useState([])
  const [loading, setloading] = useState(false)
  const [open, setOpen] = useState(false)
  const [opensupplier, setOpensupplier] = useState(false)
  const [id, setid] = useState(false)

  useEffect(() => {
    getAllagents(setAgent, setloading)
    getAllsupplieroptionAdmin(setSupplier, setloading)
    getAllWebsites(setWebsite, setloading, true)
  }, [])
  const navigate = useNavigate()
  const HandleOpen = (id) => {
    setid(id)
    setOpen(true)
  }
  const HandleOpenSuppplier = (id) => {
    setid(id)
    setOpensupplier(true)
  }

  const handleclose = () => setOpen(false)
  const handlecloseSupplier = () => setOpensupplier(false)

  return (
    <>
      {loading && <Preloader />}
      <PageMetaData title="Agent" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col>
                  <CardTitle as={'h4'}>Agent Details</CardTitle>
                </Col>
                <Col xs="auto">
                  <Button color="variant" onClick={() => navigate('/dashboard/addagent')}>
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Add Agent
                  </Button>
                  {/* <button className="btn btn-primary">
                    <IconifyIcon icon="fa6-solid:plus" className="me-1" /> Invite Agent
                  </button> */}
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="pt-0">
              <Suspense fallback={<Preloader />}>
                {users && (
                  <UserDetailsTable
                    users={users}
                    showNotification={showNotification}
                    HandleOpen={HandleOpen}
                    HandleOpenSuppplier={HandleOpenSuppplier}
                    setAgent={setAgent}
                    setloadingAgent={setloading}
                  />
                )}
              </Suspense>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <PermissionWebsite
        open={open}
        id={id}
        handleclose={handleclose}
        setloading={setloading}
        options={website}
        showNotification={showNotification}
      />
      <PermissionSupplier
        open={opensupplier}
        id={id}
        handlecloseSupplier={handlecloseSupplier}
        setloading={setloading}
        options={supplier}
        showNotification={showNotification}
      />
    </>
  )
}
export default Users
