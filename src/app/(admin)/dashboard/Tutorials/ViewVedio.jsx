import React from 'react'
import { Button, Col, Modal, ModalBody, ModalFooter, Row } from 'react-bootstrap'

export default function ViewVedio({ handleclose, open, data }) {
  return (
    <Modal show={open} onHide={handleclose} centered className="fade" id="exampleModalCenter" tabIndex={-1} role="dialog">
      <ModalBody>
        <Row>
          <Col lg={12} className="text-center align-self-center">
            <video width="100%" height="100%" autoPlay controls className="mt-2" style={{ objectFit: 'cover' }} src={`${data}`} />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" size="sm" type="button" onClick={handleclose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}
