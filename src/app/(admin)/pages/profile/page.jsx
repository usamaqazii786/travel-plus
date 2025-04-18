import { Col, Row } from 'react-bootstrap'
import ProfileCard from './components/ProfileCard'
import PersonalInformation from './components/PersonalInformation'
// import ProfileView from './components/ProfileView'
import PageMetaData from '@/components/PageMetaData'
import UpdateProfile from './components/UpdateProfile'
const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'unknown')
  return (
    <>
      <PageMetaData title="Profile" />
      <Row className="justify-content-center">
        <Col xs={12}>
          <ProfileCard user={user} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={4}>
          <PersonalInformation user={user} />
        </Col>
        <Col md={8}>
          <UpdateProfile user={user} />
          {/* <ProfileView /> */}
        </Col>
      </Row>
    </>
  )
}
export default Profile
