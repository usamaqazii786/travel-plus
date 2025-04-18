import React, { Suspense, useEffect, useState } from 'react'
// import PaymentTable from './PaymentTable.jsx'
// import TextFormInput from '@/components/form/TextFormInput'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

import Preloader from '@/components/Preloader'
import { Card, CardBody, CardHeader, Col, FormControl, FormGroup, Row } from 'react-bootstrap'
import PaperWorkDocumentsTable from './PaperWorkDocumentsTable.jsx'
import { AddPaperworkService, getAllPaperworks, SendEmailPaperWork } from '../../../../utils/Services/PaperworkServices.js'
import { useNavigate } from 'react-router-dom'
import { useNotificationContext } from '../../../../context/useNotificationContext.jsx'
export default function PaperWorkDocuments({ id }) {
  const [Data, setData] = useState([])
  const { showNotification } = useNotificationContext()
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const [file, setfiles] = useState(null)
  const HandleSubmit = () => {
    AddPaperworkService(file, navigate, showNotification, setloading, id, setData)
  }
  useEffect(() => {
    getAllPaperworks(setData, setloading,id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleSendEmail = (id) => {
    SendEmailPaperWork(setloading, id, showNotification)
  }
  return (
    <>
      <Card>
        <CardHeader>
          <Row className="align-items-center">
            <FormGroup className="mb-3 row">
              <Row>
                <Col lg={9} xl={8} className="d-flex align-items-center">
                  <FormControl type="file" className="me-2" onChange={(e) => setfiles(e.target.files[0])} />

                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => HandleSubmit()}>
                    {loading ? <IconifyIcon icon="fa6-solid:spinner" className="me-1" /> : <IconifyIcon icon="fa6-solid:upload" className="me-1" />}
                    {loading ? 'Uploading...' : 'Upload'}
                  </button>
                </Col>
              </Row>
            </FormGroup>
          </Row>
        </CardHeader>
        <CardBody className="pt-0">
          <Suspense fallback={<Preloader />}>
            {Data && (
              <PaperWorkDocumentsTable
                Data={Data}
                handleSendEmail={handleSendEmail}
                setloading={setloading}
                id={id}
                setdata={setData}
                showNotification={showNotification}
              />
            )}
          </Suspense>
        </CardBody>
      </Card>
    </>
  )
}
