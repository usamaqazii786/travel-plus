// import IconifyIcon from '@/components/wrappers/IconifyIcon'

import { Nav, NavItem, NavLink, TabContainer, TabContent, TabPane } from 'react-bootstrap'

// import UserDetailsTable from './components/UserDetailsTable'
import PageMetaData from '@/components/PageMetaData'
import SubmittedCommission from './SubmittedCommission'
import SavedCommission from './SavedCommission'
// import SupplierCommission from './SupplierCommission'

// import { useNavigate } from 'react-router-dom'

const Commision = () => {
  // const navigate = useNavigate()

  return (
    <>
      <PageMetaData title="Commission" />
      
      <TabContainer defaultActiveKey="submitted">
        <Nav className="nav-tabs mb-3" style={{ borderBottom: 'none' }} role="tablist">
          <NavItem>
            <NavLink eventKey="submitted" className="fw-medium text-dark" role="tab" aria-selected="true">
              Submitted Commission
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey="gallery" className="fw-medium text-dark" role="tab" aria-selected="false">
              Saved Commission
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink eventKey="supplierc" className="fw-medium text-dark" role="tab" aria-selected="false">
              Supplier Commission
            </NavLink>
          </NavItem> */}
        </Nav>
        <TabContent>
          <TabPane eventKey="submitted" id="submitted" role="tabpanel">
            <SubmittedCommission />
          </TabPane>
          <TabPane eventKey="gallery" className="p-3" id="gallery" role="tabpanel">
            <SavedCommission />
          </TabPane>
          {/* <TabPane eventKey="supplierc" className="p-3" id="supplierc" role="tabpanel">
            <SupplierCommission />
          </TabPane> */}
        </TabContent>
      </TabContainer>
    </>
  )
}
export default Commision
