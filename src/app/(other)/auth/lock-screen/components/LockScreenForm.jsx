import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import PasswordFormInput from '@/components/form/PasswordFormInput'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Col, Spinner } from 'react-bootstrap'
import { useState } from 'react'
import { changePasswordService } from '../../../../../utils/Services/AgentServices'
import { useNotificationContext } from '../../../../../context/useNotificationContext'
import { useNavigate } from 'react-router-dom'

const LockScreenForm = () => {
  const lockScreenSchema = yup.object({
    password: yup.string().min(6, 'Password must be of minimum 6 characters').required('Password is required'),
    token: yup.string().required('code is required'),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  })
  const [loading, setloading] = useState()
  const { showNotification } = useNotificationContext()
  const navigate = useNavigate()

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(lockScreenSchema),
  })

  const onSubmit = async (data) => {
    changePasswordService(data, navigate, showNotification, setloading)
  }
  return (
    <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
      <PasswordFormInput control={control} name="token" label="Code" placeholder="Enter Code" containerClassName="form-group mb-2" />
      <PasswordFormInput control={control} name="password" label="Password" placeholder="Enter your password" containerClassName="form-group mb-2" />
      <PasswordFormInput
        control={control}
        name="password_confirmation"
        label="Confirm Password"
        placeholder="Confirm your password"
        containerClassName="form-group mb-2"
      />

      <div className="form-group mb-0 row">
        <Col xs={12}>
          <div className="d-grid">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? (
                <Spinner  className="spinner-border-custom-1 mt-1" size="sm" />
              ) : (
                <>
                  Change Password <IconifyIcon icon="fa6-solid:right-to-bracket" className="ms-1" />
                </>
              )}
            </button>
          </div>
        </Col>
      </div>
    </form>
  )
}

export default LockScreenForm
