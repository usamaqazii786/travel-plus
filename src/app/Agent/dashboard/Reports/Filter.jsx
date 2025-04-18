import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'react-bootstrap'
import SelectFormInput from '@/components/form/SelectFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

const Filter = ({ open, handleClose }) => {
  // Validation schema with Yup
  const customFormSchema = Yup.object({
    is_elite: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip_code: Yup.string(),
    supplier_type: Yup.string(),
    supplier: Yup.string(),
    booking_start_date: Yup.string(),
    booking_end_date: Yup.string(),
    submission_start_date: Yup.string(),
    submission_end_date: Yup.string(),
    min_gross_commission: Yup.string(),
    max_gross_commission: Yup.string(),
    min_agent_commission: Yup.string(),
    max_agent_commission: Yup.string(),
    interval: Yup.string(),
  })

  // Hook form setup
  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(customFormSchema),
  })

  const interval = watch('interval')
  // Data for interval select input
  const [internal] = useState([
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Quarterly', label: 'Quarterly' },
    { value: 'Annually', label: 'Annually' },
    { value: 'Custom', label: 'Custom' },
  ])

  // Data for 'is_elite' select input
  const [eliteOptions] = useState([
    { value: '1', label: 'Elite' },
    { value: '0', label: 'Non Elite' },
  ])

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data) // You can handle the form submission here
  }

  return (
    <Modal show={open} onHide={handleClose} scrollable className="fade">
      <ModalHeader closeButton>
        <h6 className="modal-title m-0" id="exampleModalScrollableTitle">
          Filter
        </h6>
      </ModalHeader>
      <ModalBody>
        <form id="form-validation-2" onSubmit={handleSubmit(onSubmit)} className="form col-md-12">
          {/* 'is_elite' as a SelectFormInput */}
          <SelectFormInput
            name="interval"
            control={control}
            label="Interval"
            labelClassName="mt-2"
            containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
            options={internal}
          />
          {interval === 'Custom' && (
            <>
              <SelectFormInput
                name="is_elite"
                control={control}
                label="Is Elite"
                labelClassName="mt-2"
                containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
                options={eliteOptions}
              />

              <TextFormInput name="city" label="City" containerClassName="mb-2" placeholder="Enter City" control={control} />
              <TextFormInput name="state" label="State" containerClassName="mb-2" placeholder="Enter State" control={control} />
              <TextFormInput name="zip_code" label="Zip Code" containerClassName="mb-2" placeholder="Enter Zip Code" control={control} />
              <TextFormInput
                name="supplier_type"
                label="Supplier Type"
                containerClassName="mb-2"
                placeholder="Enter Supplier Type"
                control={control}
              />
              <TextFormInput name="supplier" label="Supplier" containerClassName="mb-2" placeholder="Enter Supplier" control={control} />
              <TextFormInput
                name="booking_start_date"
                label="Booking Start Date"
                containerClassName="mb-2"
                placeholder="Enter Booking Start Date"
                control={control}
              />
              <TextFormInput
                name="booking_end_date"
                label="Booking End Date"
                containerClassName="mb-2"
                placeholder="Enter Booking End Date"
                control={control}
              />
              <TextFormInput
                name="submission_start_date"
                label="Submission Start Date"
                containerClassName="mb-2"
                placeholder="Enter Submission Start Date"
                control={control}
              />
              <TextFormInput
                name="submission_end_date"
                label="Submission End Date"
                containerClassName="mb-2"
                placeholder="Enter Submission End Date"
                control={control}
              />
              <TextFormInput
                name="min_gross_commission"
                label="Min Gross Commission"
                containerClassName="mb-2"
                placeholder="Enter Min Gross Commission"
                control={control}
              />
              <TextFormInput
                name="max_gross_commission"
                label="Max Gross Commission"
                containerClassName="mb-2"
                placeholder="Enter Max Gross Commission"
                control={control}
              />
              <TextFormInput
                name="min_agent_commission"
                label="Min Agent Commission"
                containerClassName="mb-2"
                placeholder="Enter Min Agent Commission"
                control={control}
              />
              <TextFormInput
                name="max_agent_commission"
                label="Max Agent Commission"
                containerClassName="mb-2"
                placeholder="Enter Max Agent Commission"
                control={control}
              />
            </>
          )}
          {/* Interval Field */}

          <Button variant="primary" type="submit">
            Submit form
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

export default Filter
