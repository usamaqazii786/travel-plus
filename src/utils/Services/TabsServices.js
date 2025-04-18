export const useTab = (Traveltype) => {
  const cruise = Traveltype === 'Cruise'
  const hotelonly = Traveltype === 'Hotel Only'
  const allInclusive = Traveltype === 'All Inclusive'
  const travelpackage = Traveltype === 'Travel Package'
  const themepark = Traveltype === 'Theme Park Package'

  const ConditionForTraveler = cruise || hotelonly || allInclusive || travelpackage || themepark
  const ConditionForHotel = themepark || hotelonly || cruise || travelpackage || allInclusive
  const ConditionForFlight = cruise || travelpackage || themepark || allInclusive
  const ConditionForTicket = themepark
  const ConditionForGround = cruise || travelpackage
  const ConditionForAddons = cruise || hotelonly || allInclusive || travelpackage || themepark
  const traveltype = [
    { value: 'Cruise', label: 'Cruise' },
    { value: 'Theme Park Package', label: 'Theme Park Package' },
    { value: 'Hotel Only', label: 'Hotel Only' },
    { value: 'All Inclusive', label: 'All-Inclusive' },
    { value: 'Travel Package', label: 'Travel Package' },
  ]
  const tabs = [
    {
      id: 0,
      icon: 'fa:suitcase',
      eventKey: 'quoteHeader',
      label: 'Trip Details',
      condition: true,
    },

    { id: 1, icon: 'carbon:money', eventKey: 'traveler', label: 'Guest Details', condition: ConditionForTraveler },
    { id: 2, icon: 'carbon:money', eventKey: 'cruise', label: 'Cruise', condition: cruise },
    { id: 3, icon: 'mdi:hotel', eventKey: 'hotel', label: 'Hotel', condition: ConditionForHotel },
    { id: 4, icon: 'mdi:flight-takeoff', eventKey: 'flight', label: 'Flight', condition: ConditionForFlight },
    { id: 5, icon: 'fa:ticket', eventKey: 'ticket', label: 'Ticket', condition: ConditionForTicket },
    { id: 6, icon: 'fa-car', eventKey: 'ground', label: 'Ground Transportation', condition: ConditionForGround },
    { id: 7, icon: 'bi:box', eventKey: 'addon', label: 'Add-Ons', condition: ConditionForAddons },
    {
      id: 8,
      icon: 'fa:suitcase',
      eventKey: 'feedback',
      label: 'Email Text',
      condition: true,
    },
    // {id:8,
    //   icon: 'fluent:person-24-regular',
    //   eventKey: 'clientRecord',
    //   label: 'Client Record',
    //   condition: true,
    // },
  ]
  const tabsForTravel = [
    {
      eventKey: 'submitted',
      label: 'Submitted Quote',
      icon: 'fa-solid fa-file',
    },
    {
      eventKey: 'gallery',
      label: 'Quote Drafts',
      icon: 'fa-solid fa-save',
    },
  ]

  const tabsForProfile = [
    {
      eventKey: 'profile',
      label: 'Personal Profile',
      icon: 'fa-solid fa-user',
    },
    {
      eventKey: 'profileAgency',
      label: 'Agency Profile',
      icon: 'fa-solid fa-save',
    },
  ]

  return {
    ConditionForTraveler,
    ConditionForHotel,
    ConditionForFlight,
    ConditionForTicket,
    ConditionForGround,
    tabsForTravel,
    cruise,
    ConditionForAddons,
    tabs,
    traveltype,
    tabsForProfile,
  }
}
