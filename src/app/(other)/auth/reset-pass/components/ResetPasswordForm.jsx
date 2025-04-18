import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import TextFormInput from '@/components/form/TextFormInput'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Col, Row, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useNotificationContext } from '../../../../../context/useNotificationContext'
import { resetPasswordService } from '../../../../../utils/Services/AgentServices'
import { useState } from 'react'
const ResetPasswordForm = () => {
  const resetPasswordSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
  })
  const [loading, setloading] = useState()
  const { showNotification } = useNotificationContext()
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  })
  const onSubmit = (data) => {
    resetPasswordService(data, navigate, showNotification, setloading)
  }

  return (
    <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
      <TextFormInput control={control} name="email" label="Email" placeholder="Enter your email" containerClassName="form-group mb-2" />

      <Row className="form-group mb-0">
        <Col xs={12}>
          <div className="d-grid ">
            <button className="btn btn-primary flex-centered" type="submit">
              {loading ? (
                <Spinner className="spinner-border-custom-1 mt-1" size="sm" />
              ) : (
                <span>
                  Reset <IconifyIcon icon="fa6-solid:right-to-bracket" className="ms-1" />
                </span>
              )}
            </button>
          </div>
        </Col>
      </Row>
    </form>
  )
}
export default ResetPasswordForm
