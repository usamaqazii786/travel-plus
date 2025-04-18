import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
const PersonalInformation = ({ user }) => {
  return (
    <Card>
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <CardTitle as="h4">Personal Information</CardTitle>
          </Col>
          {/* <Col xs="auto">
            <span role="button" className="float-end text-muted d-inline-flex text-decoration-underline">
              <IconifyIcon icon="iconoir:edit-pencil" className="fs-18 me-1" />
              Edit
            </span>
          </Col> */}
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        {/* <p className="text-muted fw-medium mb-3">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </p>
        <div className="mb-3">
          <span className="badge bg-transparent border border-light text-gray-700 fs-12 fw-medium mb-1">Javascript</span>
          <span className="badge bg-transparent border border-light text-gray-700 fs-12 fw-medium mb-1">Python</span>
          <span className="badge bg-transparent border border-light text-gray-700 fs-12 fw-medium mb-1">Angular</span>
          <span className="badge bg-transparent border border-light text-gray-700 fs-12 fw-medium mb-1">Reactjs</span>
          <span className="badge bg-transparent border border-light text-gray-700 fs-12 fw-medium mb-1">Flutter</span>
        </div> */}
        <ul className="list-unstyled mb-0">
          <li>
            <IconifyIcon icon="la:user" className="me-2 text-secondary fs-22 align-middle" />
            <b> First Name </b> : {user?.fname || 'Empty'}
          </li>
          <li className="mt-2">
            <IconifyIcon icon="la:user" className="me-2 text-secondary fs-22 align-middle" />
            <b> Last Name </b> : {user?.lname || 'Empty'}
          </li>
          <li className="mt-2">
            <IconifyIcon icon="la:map-marker" className="me-2 text-secondary fs-22 align-middle" />
            <b> City </b> : {user?.city || 'Empty'}
          </li>
          <li className="mt-2">
            <IconifyIcon icon="la:map-signs" className="me-2 text-secondary fs-22 align-middle" />
            <b> State </b> : {user?.state || 'Empty'}
          </li>
          <li className="mt-2">
            <IconifyIcon icon="la:globe" className="me-2 text-secondary fs-22 align-middle" />
            <b> Zipcode </b> : {user?.zip_code || 'Empty'}
          </li>
          <li className="mt-2">
            <IconifyIcon icon="la:envelope" className="me-2 text-secondary fs-22 align-middle" />
            <b> Email </b> : {user?.email || 'Empty'}
          </li>
        </ul>

        {/* <Row className="justify-content-center mt-4">
          <Col xs="auto" className="text-end border-end">
            <span className="thumb-md justify-content-center d-flex align-items-center bg-blue text-white rounded-circle ms-auto mb-1">
              <IconifyIcon icon="fa-brands:facebook-f" />
            </span>
            <p className="mb-0 fw-semibold">Facebook</p>
            <h4 className="m-0 fw-bold">
              25k <span className="text-muted fs-12 fw-normal">Followers</span>
            </h4>
          </Col>
          <Col xs="auto">
            <span className="thumb-md justify-content-center d-flex align-items-center bg-black text-white rounded-circle mb-1">
              <IconifyIcon icon="fa6-brands:x-twitter" />
            </span>
            <p className="mb-0 fw-semibold">Twitter</p>
            <h4 className="m-0 fw-bold">
              58k <span className="text-muted fs-12 fw-normal">Followers</span>
            </h4>
          </Col>
        </Row> */}
      </CardBody>
    </Card>
  )
}
export default PersonalInformation
