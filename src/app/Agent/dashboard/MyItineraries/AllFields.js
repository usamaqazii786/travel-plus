export const quoteFields = [
  { name: 'travel_type', label: 'Travel Type' },
  { name: 'title', type: 'text', label: 'Trip Name' },
  { name: 'client_id', type: 'selects', label: 'Client' },
  { name: 'travel_start_date', type: 'date', label: 'Start Date' },
  { name: 'travel_end_date', type: 'date', label: 'End Date' },
  { name: 'number_of_adults', type: 'number', label: 'Number of Adults' },
  { name: 'number_of_children', type: 'number', label: 'Number of Children' },
  { name: 'total_cost', type: 'number', label: 'Total Cost' },
  { name: 'deposit_paid', type: 'number', label: 'Deposit Or Deposit Required' },
  { name: 'agent_notes', type: 'text', label: 'Agent Notes' },
  { name: 'destination', type: 'text', label: 'Destination' },
  { name: 'trip_image', type: 'file', label: 'Trip Image' },

  // { name: 'payment_key_phrase', type: 'text', label: 'Payment Key Phrase' },
]
export const travelerFields = [
  {
    name: 'traveler',
    type: 'selectss',
    label: 'Select Traveler',
    options: [
      { value: 'Agent', label: 'Agent' },
      { value: 'Client', label: 'Client' },
    ],
  },
  {
    name: 'traveler_type',
    type: 'select',
    label: 'Select Traveler Type',
    options: [
      { value: 'Adult', label: 'Adult' },
      { value: 'Child', label: 'Child' },
    ],
  },
  { name: 'traveler_first_name', type: 'text', label: 'Traveler First Name' },
  { name: 'traveler_middle_name', type: 'text', label: 'Traveler Middle Name' },
  { name: 'traveler_last_name', type: 'text', label: 'Traveler Last Name' },
  {
    name: 'traveler_gender',
    type: 'select',
    label: 'Traveler Gender',
    options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Other', label: 'Other' },
    ],
  },
  { name: 'traveler_age', type: 'number', label: 'Traveler Age' },
  { name: 'traveler_date_of_birth', type: 'date', label: 'Traveler Date of Birth' },
  { name: 'traveler_loyalty_number', type: 'text', label: 'Traveler Loyalty Number' },
  { name: 'traveler_known_traveler_number', type: 'text', label: 'Traveler Known Traveler Number' },
  { name: 'traveler_room_number', type: 'text', label: 'Traveler Room Number' },
  { name: 'traveler_flight_number', type: 'text', label: 'Traveler Flight Number' },
]
export const clientRecord = [
  {
    name: 'client_type',
    type: 'select',
    label: 'Client Type',
    options: [
      { value: 'Adult', label: 'Adult' },
      { value: 'Child', label: 'Child' },
    ],
  },
  { name: 'client_first_name', type: 'text', label: 'Client First Name' },
  { name: 'client_middle_name', type: 'text', label: 'Client Middle Name' },
  { name: 'client_last_name', type: 'text', label: 'Client Last Name' },
  { name: 'client_age', type: 'number', label: 'Client Age' },
  { name: 'client_email', type: 'email', label: 'Client Email' },
  {
    name: 'client_gender',
    type: 'select',
    label: 'Client Gender',
    options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Other', label: 'Other' },
    ],
  },
  { name: 'client_date_of_birth', type: 'date', label: 'Client Date of Birth' },
  { name: 'client_notes', type: 'text', label: 'Client Notes' },
]
export const hotelFields = [
  // { name: 'hotel_room_number', type: 'text', label: 'Hotel Room Number' },
  { name: 'hotel_name', type: 'text', label: 'Hotel Name' },
  { name: 'hotel_room_type', type: 'text', label: 'Hotel Room Type' },
  { name: 'hotel_number_of_adults', type: 'number', label: 'Hotel Number of Adults' },
  { name: 'hotel_number_of_kids', type: 'number', label: 'Hotel Number of Kids' },
  { name: 'hotel_special_request', type: 'text', label: 'Hotel Special Requests' },
  { name: 'hotel_total_cost', type: 'number', label: 'Hotel Total Cost' },
  { name: 'hotel_deposit_required', type: 'number', label: 'Hotel Deposit Required' },
]
export const ticket = [
  {
    name: 'ticket_type',
    type: 'select',
    label: 'Select Ticket Type',
    options: [
      { value: 'Adult', label: 'Adult' },
      { value: 'Child', label: 'Child' },
    ],
  },
  { name: 'ticket_name', type: 'text', label: 'Ticket Name' },
  { name: 'ticket_price', type: 'number', label: 'Ticket Price' },
  { name: 'ticket_total_price', type: 'number', label: 'Ticket Total Price' },
  { name: 'ticket_qantity', type: 'number', label: 'Ticket Quantity' },
]
export const flightFields = [
  { name: 'flight_airline', type: 'text', label: 'Flight Airline' },
  { name: 'flight_flight_number', type: 'text', label: 'Flight Number' },
  { name: 'flight_number_of_passengers', type: 'number', label: 'Flight Number of Passengers' },
  { name: 'flight_departure_datetime', type: 'datetime-local', label: 'Flight Departure Date and Time' },
  { name: 'flight_arrival_datetime', type: 'datetime-local', label: 'Flight Arrival Date and Time' },
  { name: 'flight_departing_city', type: 'text', label: 'Flight Departing City' },
  { name: 'flight_arrival_city', type: 'text', label: 'Flight Arrival City' },
  { name: 'flight_total_cost', type: 'number', label: 'Flight Total Cost' },
  { name: 'flight_deposit_required', type: 'number', label: 'Flight Deposit Required' },
]
export const groundFields = [
  { name: 'transportation_company', type: 'text', label: 'Ground Transportation Company' },
  { name: 'transportation_type', type: 'text', label: 'Ground Transportation Type' },
  { name: 'transportation_number_of_passengers', type: 'number', label: 'Ground Number of Passengers' },
  { name: 'transportation_departing_location', type: 'text', label: 'Ground Departing Location' },
  { name: 'transportation_arriving_location', type: 'text', label: 'Ground Arriving Location' },
  { name: 'transportation_departure_datetime', type: 'datetime-local', label: 'Ground Transportation Departure Date and Time' },
  { name: 'transportation_arrival_datetime', type: 'datetime-local', label: 'Ground Transportation Arrival Date and Time' },
  { name: 'transportation_total_cost', type: 'number', label: 'Ground Transportation Total Cost' },
  { name: 'transportation_deposit_required', type: 'number', label: 'Ground Transportation Deposit Required' },
]
export const addOnsFields = [
  {
    name: 'add_ons_type',
    type: 'select',
    label: 'Add-On Type',
    options: [
      { value: 'Excursion', label: 'Excursion' },
      { value: 'Insurance', label: 'Insurance' },
      { value: 'Dinner', label: 'Dinner' },
      { value: 'Other', label: 'Other' },
    ],
  },
  { name: 'add_ons_description', type: 'text', label: 'Add-On Description' },
  { name: 'add_ons_start_date', type: 'date', label: 'Add-On Start Date' },
  { name: 'add_ons_end_date', type: 'date', label: 'Add-On End Date' },
  { name: 'add_ons_number_of_adults', type: 'number', label: 'Add-On Number of Adults' },
  { name: 'add_ons_number_of_kids', type: 'number', label: 'Add-On Number of Kids' },
  { name: 'add_ons_total_cost', type: 'number', label: 'Add-On Total Cost' },
  { name: 'add_ons_deposit_required', type: 'number', label: 'Add-On Deposit Required' },
]
export const cruiseFields = [
  { name: 'cruise_line', type: 'text', label: 'Cruise line' },
  { name: 'cruise_ship', type: 'text', label: 'Cruise Ship' },
  { name: 'cruise_stateroom_type', type: 'text', label: 'Cruise Stateroom Type' },
  { name: 'cruise_stateroom_number', type: 'number', label: 'Cruise Stateroom Number' },
  { name: 'cruise_deck', type: 'number', label: 'Cruise Deck' },
  { name: 'cruise_number_of_days', type: 'number', label: 'Cruise Number of Days' },
  { name: 'cruise_number_of_adults', type: 'number', label: 'Cruise Number of Adults' },
  { name: 'cruise_number_of_kids', type: 'number', label: 'Cruise Number of Kids' },
  { name: 'cruise_departing_port', type: 'text', label: 'Cruise Departing Port' },
  { name: 'cruise_port_stop', type: 'text', label: 'Cruise Port Stops' },
  { name: 'cruise_ending_port', type: 'text', label: 'Cruise Ending Port' },
  { name: 'cruise_dining', type: 'text', label: 'Cruise Dining' },
  { name: 'cruise_total_cost', type: 'number', label: 'Cruise Total Cost' },
  { name: 'cruise_deposit_required', type: 'number', label: 'Cruise Deposit Required' },
  { name: 'cruise_notes', type: 'text', label: 'Cruise Notes' },
]
export const feedbackFields = [{ name: 'feedback', type: 'text', label: 'Email Text', textarea: true }]
export const formBuilderButtons = [
  { name: 'Add Text Field', type: 'text', color: 'primary' },
  { name: 'Add Email Field', type: 'email', color: 'success' },
  { name: 'Add Password Field', type: 'password', color: 'warning' },
  { name: 'Add Checkbox', type: 'checkbox', color: 'info' },
  // { name: 'Add Radio Button', type: 'radio', color: 'secondary' },
  { name: 'Add Dropdown', type: 'select', color: 'success' },
]
const cardone = [
  { label: 'Billing Address', name: 'billing_address', placeholder: 'Enter billing address', type: 'text' },
  { label: 'Country', name: 'country', placeholder: 'Enter country', type: 'text' },
  { label: 'State/Province', name: 'state', placeholder: 'Enter state', type: 'text' },
  { label: 'Zip Code', name: 'zip_code', placeholder: 'Enter zip code', type: 'number' },
  { label: "Cardholder's Name", name: 'card_name', placeholder: 'Enter name on card', type: 'text' },
  { label: 'Card Number', name: 'card_number', placeholder: 'Enter card number', type: 'number' },
  { label: 'Expiry Date', name: 'expiry_date', placeholder: 'MM/YY', type: 'month' },
  { label: 'CVC Code', name: 'cvc_code', placeholder: 'Enter CVC code', type: 'number' },
]
const cardtwo = [
  { label: 'Billing Address', name: 'billing_address[1]', placeholder: 'Enter billing address', type: 'text' },
  { label: 'Country', name: 'country[1]', placeholder: 'Enter country', type: 'text' },
  { label: 'State/Province', name: 'state[1]', placeholder: 'Enter state', type: 'text' },
  { label: 'Zip Code', name: 'zip_code[1]', placeholder: 'Enter zip code', type: 'number' },
  { label: "Cardholder's Name", name: 'card_name[1]', placeholder: 'Enter name on card', type: 'text' },
  { label: 'Card Number', name: 'card_number[1]', placeholder: 'Enter card number', type: 'number' },
  { label: 'Expiry Date', name: 'expiry_date[1]', placeholder: 'MM/YY', type: 'month' },
  { label: 'CVC Code', name: 'cvc_code[1]', placeholder: 'Enter CVC code', type: 'number' },
]
export const paymentFields = [[...cardone], [...cardtwo]]
export const OptionsForFormBuilder = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
]
