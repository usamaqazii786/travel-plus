import { Button, Col, Modal, ModalBody, ModalFooter, Row } from 'react-bootstrap'
import SelectFormInputmulti from '@/components/form/SelectFormInputmulti'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AddPerimssionService } from '../../../../../../../utils/Services/WebsiteServices'

const customFormSchema = yup.object().shape({
  website: yup.array(),
})

export default function PermissionWebsite({ handleclose, open, options, showNotification, setloading, id }) {
  const { control, handleSubmit, reset} = useForm({
    resolver: yupResolver(customFormSchema),
    defaultValues: {
      website: [],
    },
  })

  const onSubmit = (data) => {
    AddPerimssionService(data?.website, handleclose, showNotification, setloading, id, reset)
  }

  return (
    <Modal show={open} onHide={handleclose} centered className="fade" id="exampleModalCenter" tabIndex={-1} role="dialog">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Row>
            <Col lg={12} className="text-center align-self-center">
              <SelectFormInputmulti
                name="website"
                control={control}
                label="Select a Website"
                labelClassName="mt-2"
                containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
                options={options}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" size="sm" type="submit">
            Submit
          </Button>
          <Button variant="secondary" size="sm" type="button" onClick={handleclose}>
            Close
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
