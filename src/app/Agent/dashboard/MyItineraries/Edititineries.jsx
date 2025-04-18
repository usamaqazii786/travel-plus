import { Nav, NavItem, NavLink, TabContainer, TabContent, TabPane } from 'react-bootstrap'
import PageMetaData from '@/components/PageMetaData'
import { Icon } from '@iconify/react'
// import AddTravelDetail from './AddTravelDetail'
import Payment from './Payment'
import PaperWorkDocuments from './PaperWorkDocuments'
import AddCommission from './AddCommission'
import AddTravelTab from './TraveltnerayTab'
import { useParams } from 'react-router-dom'

export default function EditItineraries() {
  const { id } = useParams()
  return (
    <>
      <PageMetaData title="Commission" />
      <TabContainer defaultActiveKey="itinerary">
        <Nav className="nav-tabs mb-3" style={{ borderBottom: 'none' }} role="tablist">
          <NavItem>
            <NavLink eventKey="itinerary" className="fw-medium text-dark" role="tab" aria-selected="true">
              <Icon icon="akar-icons:travel" width={20} className="me-2" />
              Update Travel Itinerary
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey="payments" className="fw-medium text-dark" role="tab" aria-selected="false">
              <Icon icon="carbon:money" width={20} className="me-2" />
              Payments
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey="documents" className="fw-medium text-dark" role="tab" aria-selected="false">
              <Icon icon="mdi:file-document" width={20} className="me-2" />
              Paper Work and Documents
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey="commission" className="fw-medium text-dark" role="tab" aria-selected="false">
              <Icon icon="fluent:star-24-regular" width={20} className="me-2" />
              Commission
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent>
          <TabPane eventKey="itinerary" id="itinerary" role="tabpanel">
            <AddTravelTab  id={id}/>
          </TabPane>
          <TabPane eventKey="payments" id="payments" role="tabpanel">
            <Payment id={id}/>
          </TabPane>
          <TabPane eventKey="documents" id="documents" role="tabpanel">
            <PaperWorkDocuments id={id} />
          </TabPane>
          <TabPane eventKey="commission" id="commission" role="tabpanel">
            <AddCommission  id={id}/>
          </TabPane>
        </TabContent>
      </TabContainer>
    </>
  )
}
