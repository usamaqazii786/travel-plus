import React from 'react'
import { Col, Card, ListGroup } from 'react-bootstrap'

export default function PaymentRightInformation({ travel }) {
  return (
    <Col md={4} sx={12}>
      <Card className="border-0 shadow rounded-3" style={{ background: 'white' }}>
        <Card.Header className=" text-white text-center" style={{ background: 'white' }}>
          <h3 className="text-black">Travel Details</h3>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush" className="mb-5">
            {[
              { label: 'Trip Name', value: travel?.title },
              { label: 'Client', value: travel?.client?.family_name },
              { label: 'Start Date', value: travel?.travel_start_date },
              { label: 'End Date', value: travel?.travel_end_date },
              { label: 'Number of Adults', value: travel?.number_of_adults },
              { label: 'Number of Children', value: travel?.number_of_children },
              { label: 'Total Cost', value: `$${travel?.total_cost}` },
              { label: 'Destination', value: travel?.destination },
              { label: 'Travel Type', value: travel?.travel_type },
            ].map((item, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between bg-primary">
                <h5 className="fw-bold" style={{color:"white"}}>{item.label}</h5>
                <span style={{color:"white"}}>{item.value || 'N/A'}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  )
}
