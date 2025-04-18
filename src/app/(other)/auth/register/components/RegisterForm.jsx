import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import PasswordFormInput from '@/components/form/PasswordFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import SelectFormInput from '@/components/form/SelectFormInput'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Col, Spinner } from 'react-bootstrap'
import { agency, CreateAgentService } from '../../../../../utils/Services/AgentServices'
import { useNavigate } from 'react-router-dom'
import { useNotificationContext } from '../../../../../context/useNotificationContext'
import { useState } from 'react'
import { options } from '../../../../../utils/Services/AgentServices'
// import { Link } from 'react-router-dom'

const RegisterForm = () => {
  const registerSchema = yup.object({
    fname: yup.string().required('First Name is required'),
    lname: yup.string().required('Last Name is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be of minimum 6 characters').required('Password is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    phone: yup.string().required('Phone Number is required'),
    location_status: yup.string().required('Residence is required'),
    zip_code: yup
      .string()
      .matches(/^\d{5}$/, 'Enter a valid zip code')
      .required('Zip code is required'),
    // image: yup.mixed().required('Image is required'),
  })
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const { showNotification } = useNotificationContext()

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = (data) => {
    CreateAgentService(data, navigate, showNotification, setloading)
  }

  return (
    <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
      <TextFormInput control={control} name="fname" label="First Name" placeholder="Enter your first name" containerClassName="form-group mb-2" />
      <TextFormInput control={control} name="lname" label="Last Name" placeholder="Enter your last name" containerClassName="form-group mb-2" />
      <TextFormInput control={control} name="email" label="Email" placeholder="Enter your email" containerClassName="form-group mb-2" />
      <TextFormInput control={control} name="phone" type="number" label="Phone" placeholder="Enter your Phone" containerClassName="form-group mb-2" />
      <PasswordFormInput control={control} name="password" label="Password" placeholder="Enter your password" containerClassName="form-group mb-2" />
      <SelectFormInput
        name="location_status"
        control={control}
        label="Select Residence"
        labelClassName="mt-2"
        containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
        options={options}
      />
      <SelectFormInput
        name="agency"
        control={control}
        label="Select Agency"
        labelClassName="mt-2"
        containerClassName="col-lg-12 col-12 mb-2 mb-lg-12"
        options={agency}
      />

      <TextFormInput control={control} name="city" label="City" placeholder="Enter your city" containerClassName="form-group mb-2" />

      <TextFormInput control={control} name="state" label="State" placeholder="Enter your state" containerClassName="form-group mb-2" />

      <TextFormInput control={control} name="zip_code" label="Zip Code" placeholder="Enter your zip code" containerClassName="form-group mb-2" />

      <div className="form-group mb-2">
        <label htmlFor="image">Upload Profile Picture</label>
        <input name="image" onChange={(e) => setValue('image', e.target.files[0])} label="Attech Profile Picture" type="file" />
      </div>

      {/* <div className="form-group row mt-3">
        <Col xs={12}>
          <div className="form-check form-switch form-switch-success">
            <input className="form-check-input" type="checkbox" id="customSwitchSuccess" />
            <label className="form-check-label" htmlFor="customSwitchSuccess">
              By registering you agree to the Travel+{' '}
              <Link to="" className="text-primary">
                Terms of Use
              </Link>
            </label>
          </div>
        </Col>
      </div> */}

      <div className="form-group mb-0 row">
        <Col xs={12}>
          <div className="d-grid mt-3">
            <button className="btn btn-primary flex-centered" type="submit">
              {loading ? 'Loading...' : 'Register'}
              {!loading ? <IconifyIcon icon="fa6-solid:right-to-bracket" className="ms-1" /> : <Spinner />}
            </button>
          </div>
        </Col>
      </div>
    </form>
  )
}

export default RegisterForm
