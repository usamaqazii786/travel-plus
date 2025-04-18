import React from 'react';
import { Nav, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import SubmitedTravelQuote from './SubmitedTravelQuote';
import { useTab } from '../../../utils/Services/TabsServices';
import Tabs from '../../../components/TabsForTravel/Tabs';
import SavedTravelQuote from './SavedTravelQuote';

export default function TableLeftDashboardAgent({ Data, setdata }) {
  const isDraft = Data.filter((item)=>item.is_draft===1)
  const isSubmit = Data.filter((item)=>item.is_draft===0)
  const {tabsForTravel}= useTab()
  return (
    <>
      <TabContainer defaultActiveKey="submitted">
        <Nav className="nav-tabs mb-3" style={{ borderBottom: 'none' }} role="tablist">
         {tabsForTravel?.map((tab) =>{
          return(
            <Tabs icon={tab.icon} eventKey={tab.eventKey} label={tab.label}/>
          )
         })}
        </Nav>
        <TabContent>
          <TabPane eventKey="submitted" id="submitted" role="tabpanel">
            <SubmitedTravelQuote setdata={setdata} Data={isSubmit}/>
          </TabPane>
          <TabPane eventKey="gallery" className="p-3" id="gallery" role="tabpanel">
            <SavedTravelQuote setdata={setdata} Data={isDraft} />
          </TabPane>
        </TabContent>
      </TabContainer>
    </>
  );
}
