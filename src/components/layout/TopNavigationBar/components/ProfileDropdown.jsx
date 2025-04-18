import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'
// import avatar1 from '@/assets/images/users/avatar-1.jpg'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
// import { deleteCookie } from 'cookies-next'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../context/useAuthContext'
// import { useContext } from 'react'
// import { AuthContext } from '../../../../context/useAuthContext'
const ProfileDropdown = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'unknown')
  const Handlenavigate = () => {
    navigate('/agent/profile')
  }
  // const authSessionKey = '_RIZZ_AUTH_KEY_'
  // const { removeSession } = useContext(AuthContext)
  const { removeSession } = useAuthContext()

  return (
    <Dropdown className="topbar-item">
      <DropdownToggle className="nav-link arrow-none nav-icon" role="button" aria-haspopup="false" aria-expanded="false">
        <img src={user?.image || '/public/assets/profile.png'} alt="user" className="thumb-md" style={{ borderRadius: '50%' }} />
      </DropdownToggle>
      <DropdownMenu align={'end'} className="py-0">
        <div className="d-flex align-items-center dropdown-item py-2 bg-secondary-subtle">
          <div className="flex-shrink-0">
            <img src={user?.image || '/public/assets/profile.png'} alt="avatar" className="thumb-md" style={{ borderRadius: '50%' }} />
          </div>
          <div className="flex-grow-1 ms-2 text-truncate align-self-center">
            <h6 className="my-0 fw-medium text-dark fs-13">{user?.fname + ' ' + user?.lname}</h6>
            <small className="text-muted mb-0">{user?.email}</small>
          </div>
        </div>
        {user?.role === 'subadmin' && (
          <>
            <DropdownDivider className="mt-0" />
            <small className="text-muted px-2 pb-1 d-block">Pdf</small>

            {user?.location_status === 'Yes' && (
              <DropdownItem href="/dashboard/w_nineform">
                <IconifyIcon icon="mdi:file-pdf-outline" className="fs-18 me-1 align-text-bottom" /> w-9
              </DropdownItem>
            )}

            {user?.location_status !== 'Yes' && (
              <>
                <DropdownDivider className="mt-0" />
                <DropdownItem href="/dashboard/w_eightform">
                  <IconifyIcon icon="mdi:file-pdf-outline" className="fs-18 me-1 align-text-bottom" /> W-8BEN
                </DropdownItem>
              </>
            )}
          </>
        )}
        {/* <DropdownItem href="/pages/faqs">
          <IconifyIcon icon="la:wallet" className="fs-18 me-1 align-text-bottom" /> 
        </DropdownItem> */}
        {/* <small className="text-muted px-2 py-1 d-block">Settings</small> */}
        {/* <DropdownItem href="/pages/profile">
          <IconifyIcon icon="la:cog" className="fs-18 me-1 align-text-bottom" />
          Account Settings
        </DropdownItem>
        <DropdownItem href="/pages/profile">
          <IconifyIcon icon="la:lock" className="fs-18 me-1 align-text-bottom" /> Security
        </DropdownItem>
        <DropdownItem href="/pages/faqs">
          <IconifyIcon icon="la:question-circle" className="fs-18 me-1 align-text-bottom" /> Help Center
        </DropdownItem> */}
        {user?.role === 'subadmin' && (
          <>
            <DropdownItem onClick={() => Handlenavigate()}>
              <IconifyIcon icon="la:user" className="fs-18 me-1 align-text-bottom" /> Profile
            </DropdownItem>
            <DropdownDivider className="mb-0" />
          </>
        )}
        <DropdownItem className="text-danger" onClick={removeSession}>
          <IconifyIcon icon="la:power-off" className="fs-18 me-1 align-text-bottom" /> Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
export default ProfileDropdown
