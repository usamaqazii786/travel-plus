// import logoDark from '@/assets/images/logo-dark.png';
// import logoLight from '@/assets/images/logo-light.png';
import logoSm from '@/assets/images/logo-sm.webp'
import { Link } from 'react-router-dom'
const LogoBox = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <Link to={user?.role == 'admin' ? '/dashboard' : '/agentdashboard'} className="logo">
      <span>
        <img src={logoSm} alt="logo-small" width={38} height={38} className="logo-sm" />
      </span>
      <span>
        {/* <img src={logoLight} alt="logo-large" className="logo-lg logo-light" /> */}
        {/* <img src={logoDark} alt="logo-large" className="logo-lg logo-dark" /> */}
      </span>
    </Link>
  )
}
export default LogoBox
