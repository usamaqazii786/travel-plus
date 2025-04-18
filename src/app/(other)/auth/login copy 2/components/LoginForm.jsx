import PasswordFormInput from '@/components/form/PasswordFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import useSignIn from '../useSignIn'
import { Col } from 'react-bootstrap'
// import { Link } from 'react-router-dom';
import { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginForm = () => {
  const { loading, login, control } = useSignIn()
  const [isChecked, setIsChecked] = useState(false)  // State to track checkbox status
  const [error, setError] = useState("")  // State to track error message

  const HandleAgrement = () => {
    window.location.href =
      'https://firebasestorage.googleapis.com/v0/b/lispira.appspot.com/o/Agent%20Agreement%20CRM.pdf?alt=media&token=796a1c28-3640-4b28-8f3d-422078fb5758'
  }

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked)  // Update checkbox state
    setError("")  // Clear error message when checkbox is clicked
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isChecked) {
      setError("You must agree to the Agent Agreement to proceed.")
      return
    }
    login()
  }

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <TextFormInput control={control} name="email" label="Username" containerClassName="form-group mb-2" placeholder="Enter your username" />

      <PasswordFormInput control={control} name="password" label="Password" containerClassName="form-group" placeholder="Enter your password" />

      <div className="form-group row mt-3">
        <Col sm={12}>
          <div className="form-check form-switch form-switch-primary">
            <input
              className="form-check-input"
              type="checkbox"
              id="customSwitchSuccess"
              checked={isChecked} 
              onChange={handleCheckboxChange}
            />
            <label
              className="form-check-label"
              style={{ cursor: 'pointer' }}
              htmlFor="customSwitchSuccess"
              onClick={HandleAgrement}
            >
              I Agree to the Agent Agreement
            </label>
          </div>
          {error && <div className="text-danger mt-2">{error}</div>} {/* Display error message */}
        </Col>
      </div>

      <div className="form-group mb-0 row">
        <Col xs={12}>
          <div className="d-grid mt-3">
            <button className="btn btn-primary flex-centered" type="submit" disabled={loading}>
              Log In <IconifyIcon icon="fa6-solid:right-to-bracket" className="ms-1" />
            </button>
          </div>
          <div className='d-flex justify-content-between mt-3'>
            <Link to="/agent/register" className='text-dark'>Register Account ?</Link>
            <Link to="/agent/reset-pass" className='text-dark'>Forgot Password ?</Link>

          </div>
        </Col>
      </div>
    </form>
  )
}

export default LoginForm
