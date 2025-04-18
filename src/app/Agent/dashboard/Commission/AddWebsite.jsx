import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Button, Col, FormControl, FormGroup, FormLabel, InputGroup } from 'react-bootstrap'

const AddWebsite = () => {
  return (
    <ComponentContainerCard title="Add Website">
      
      {/* Title Field */}
      <FormGroup className="mb-3 row">
        <FormLabel className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">Title</FormLabel>
        <Col lg={9} xl={8}>
          <FormControl type="text" defaultValue="Website Title" />
        </Col>
      </FormGroup>
      
      {/* URL Field */}
      <FormGroup className="mb-3 row">
        <FormLabel className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">URL</FormLabel>
        <Col lg={9} xl={8}>
          <InputGroup>
            <span className="input-group-text">
              <IconifyIcon icon="la:globe" />
            </span>
            <FormControl type="text" defaultValue="https://example.com" placeholder="Website URL" aria-describedby="basic-addon1" />
          </InputGroup>
        </Col>
      </FormGroup>
      
      {/* Email Field */}
      <FormGroup className="mb-3 row">
        <FormLabel className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">Email Address</FormLabel>
        <Col lg={9} xl={8}>
          <InputGroup>
            <span className="input-group-text">
              <IconifyIcon icon="la:at" />
            </span>
            <FormControl type="text" defaultValue="email@example.com" placeholder="Email" aria-describedby="basic-addon1" />
          </InputGroup>
        </Col>
      </FormGroup>
      
      {/* Phone Field */}
      <FormGroup className="mb-3 row">
        <FormLabel className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">Phone</FormLabel>
        <Col lg={9} xl={8}>
          <InputGroup>
            <span className="input-group-text">
              <IconifyIcon icon="la:phone" />
            </span>
            <FormControl type="text" defaultValue="+123456789" placeholder="Phone" aria-describedby="basic-addon1" />
          </InputGroup>
        </Col>
      </FormGroup>
      
     
      <FormGroup className="mb-3 row">
        <FormLabel className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center">Location</FormLabel>
        <Col lg={9} xl={8}>
        
        <InputGroup>
            <span className="input-group-text">
              <IconifyIcon icon="la:location" />
            </span>
            <FormControl type="text" defaultValue="+123456789" placeholder="Phone" aria-describedby="basic-addon1" />
          </InputGroup>
        </Col>
      </FormGroup>

      {/* Submit Button */}
      <FormGroup className="row">
        <div className="col-lg-9 col-xl-8 offset-lg-3">
          <Button variant="primary" className="me-1" type="submit">
            Submit
          </Button>
        </div>
      </FormGroup>
    </ComponentContainerCard>
  )
}

export default AddWebsite;
