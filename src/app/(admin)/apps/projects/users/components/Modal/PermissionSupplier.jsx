import { Button, Col, Modal, ModalBody, ModalFooter, Row } from 'react-bootstrap'
import SelectFormInputmulti from '@/components/form/SelectFormInputmulti'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AddPerimssionSupplier } from '../../../../../../../utils/Services/SupplierServices'

const customFormSchema = yup.object().shape({
  supplier: yup.array(),
})

export default function PermissionSupplier({ handlecloseSupplier, open, options, showNotification, setloading, id }) {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(customFormSchema),
    defaultValues: {
      supplier: [],
    },
  })

  const onSubmit = (data) => {
    AddPerimssionSupplier(data?.supplier, handlecloseSupplier, showNotification, setloading, id, reset)
  }

  return (
    <Modal show={open} onHide={handlecloseSupplier} centered className="fade" id="exampleModalCenter" tabIndex={-1} role="dialog">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Row>
            <Col lg={12} className="text-center align-self-center">
              <SelectFormInputmulti
                name="supplier"
                control={control}
                label="Select a Supplier"
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
          <Button variant="secondary" size="sm" type="button" onClick={handlecloseSupplier}>
            Close
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
