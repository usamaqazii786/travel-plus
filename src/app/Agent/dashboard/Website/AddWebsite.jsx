import ComponentContainerCard from '@/components/ComponentContainerCard'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Button, Col, Form, InputGroup } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import TextFormInput from '@/components/form/TextFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from './Schema'

// Define the validation schema using Yup

const AddWebsite = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), // Use yupResolver to connect the schema
    defaultValues: {
      title: 'Website Title', // Default value for Title
      url: 'https://example.com', // Default value for URL
      email: 'email@example.com', // Default value for Email
      phone: '+123456789', // Default value for Phone
      location: '+123456789', // Default value for Location
    },
  })
  console.log(errors)

  const onSubmit = (data) => {
    console.log(data) // Handle form submission
  }

  return (
    <ComponentContainerCard title="Add Website">
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Title Field */}
        <Col lg={9} xl={8}>
          <TextFormInput name="title" label="Title" control={control} />
        </Col>

        {/* URL Field */}
        <Col lg={9} xl={8}>
          <InputGroup>
            <span className="input-group-text">
              <IconifyIcon icon="la:globe" />
            </span>
            <TextFormInput name="url" label="Website URL" control={control} placeholder="Website URL" />
          </InputGroup>
        </Col>

        {/* Email Field */}
        <Col lg={9} xl={8}>
          <InputGroup>
            <span className="input-group-text">
              <IconifyIcon icon="la:at" />
            </span>
            <TextFormInput name="email" label="Email Address" control={control} placeholder="Email" />
          </InputGroup>
        </Col>

        {/* Phone Field */}
        <Col lg={9} xl={8}>
          <InputGroup>
            <span className="input-group-text">
              <IconifyIcon icon="la:phone" />
            </span>
            <TextFormInput name="phone" label="Phone" control={control} placeholder="Phone" />
          </InputGroup>
        </Col>

        {/* Location Field */}
        <Col lg={9} xl={8}>
          <InputGroup>
            <span className="input-group-text">
              <IconifyIcon icon="la:location" />
            </span>
            <TextFormInput name="location" label="Location" control={control} placeholder="Location" />
          </InputGroup>
        </Col>

        {/* Submit Button */}
        <div className="text-center">
          <Button variant="primary" className="d-flex justify-content-center" style={{ width: '100%' }} type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </ComponentContainerCard>
  )
}

export default AddWebsite
