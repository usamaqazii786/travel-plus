import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Spinner } from 'react-bootstrap'
import TextFormInput from '@/components/form/TextFormInput'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotificationContext } from '../../../../context/useNotificationContext'
import { useState } from 'react'
import { AddpaymentServiceIt } from '../../../../utils/Services/PaymentServices'

const CreatePaymentNotification = ({ open, handleClose, id, setData, setloadingGet }) => {
  // Validation schema with Yup
  const { showNotification } = useNotificationContext()
  const [loading, setloading] = useState(false)
  const validationSchema = Yup.object({
    amount: Yup.string().required('Amount is required'),
    description: Yup.string().required('Description is required'),
  })

  // Default values for the form
  const defaultValues = {
    amount: '$', // Default value for Amount
    description: '', // Default value for Description
  }

  // Hook form setup with default values and validation schema
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  // Handle form submission
  const onSubmit = (data) => {
    AddpaymentServiceIt(data, handleClose, showNotification, setloading, id,setData,setloadingGet)
  }

  return (
    <Modal show={open} onHide={handleClose} scrollable className="fade">
      <ModalHeader closeButton>
        <h6 className="modal-title m-0" id="exampleModalScrollableTitle">
          Create Payment Notification
        </h6>
      </ModalHeader>
      <ModalBody>
        <form id="form-validation-2" onSubmit={handleSubmit(onSubmit)} className="form col-md-12">
          {/* Amount Field */}
          <TextFormInput name="amount" label="Amount" containerClassName="mb-2" placeholder="Enter Amount" control={control} />

          {/* Description Field */}
          <TextFormInput name="description" label="Description" containerClassName="mb-2" placeholder="Enter Description" control={control} />

          {/* Submit Button */}
          <Button variant="primary" type="submit">
           Submit Form {loading && <Spinner className="spinner-border-custom-1 mt-1" size="sm" /> }
            {/* Submit form */}
          </Button>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" size="sm" type="button" onClick={handleClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreatePaymentNotification
