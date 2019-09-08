import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import Smartphone from '@material-ui/icons/Smartphone';
import LocationCity from '@material-ui/icons/LocationCity';
import EventNote from '@material-ui/icons/EventNote';
import CreditCard from '@material-ui/icons/CreditCard';
import CalenderToday from '@material-ui/icons/CalendarToday';
import Person from '@material-ui/icons/Person';
import HowToReg from '@material-ui/icons/HowToReg';

export const tblEvents = [
  { id: '1', text: 'Name', valueName: 'name' },
  { id: '2', text: 'Organizer', valueName: 'phoneNumber' },
  { id: '3', text: 'Activity', valueName: 'activityName' },
  { id: '4', text: 'City', valueName: 'city' },
  // { id: '5', text: 'Age', valueName: 'communityAgeId' },
  // { id: '6', text: 'Gender', valueName: 'communityGenderId' },
  { id: '7', text: 'Place', valueName: 'place' },
  { id: '8', text: 'Price', valueName: 'price' },
  { id: '9', text: 'Duration', valueName: 'duration' },
  { id: '10', text: 'Start time', valueName: 'startTime' },
  { id: '11', text: 'End time', valueName: 'endTime' },
  { id: '12', text: 'Event Date', valueName: 'date' },
  { id: '13', text: 'Created at', valueName: 'createdAt' },
  // { id: '14', text: 'Visible', valueName: 'activate' },
  // { id: '15', text: 'Status', valueName: 'statusId' },
  { id: '16', text: 'Notes', valueName: 'notic' }
];

export const tblOrganizers = [
  { id: '1', text: 'Name', valueName: 'name' },
  { id: '2', text: 'Phone No.', valueName: 'phone' },
  // { id: '3', text: 'Description', valueName: 'description' },
  // { id: '4', text: 'Created At', valueName: 'createdAt' },
  // { id: '5', text: 'Profile Picture', valueName: 'profileImage' },
  // { id: '6', text: 'Role', valueName: 'roleId' },
  { id: '7', text: 'Email', valueName: 'email' }
  // { id: '9', text: 'City', valueName: 'city' },
  // { id: '10', text: 'MOI Number', valueName: 'moiNumber' }
];

export const tblCustomers = [
  { id: '1', text: 'Name', valueName: 'name' },
  { id: '2', text: 'Phone No.', valueName: 'phone' },
  // { id: '3', text: 'Description', valueName: 'description' },
  // { id: '4', text: 'Gender', valueName: 'gender' },
  // { id: '5', text: 'Birthdate', valueName: 'birthdate' },
  // { id: '6', text: 'Profile Picture', valueName: 'profileImage' },
  // { id: '7', text: 'Joined By', valueName: 'joinForm' },
  { id: '8', text: 'Email', valueName: 'email' }
];

export const tblTickets = [
  { id: '12', text: 'Ticket No', valueName: 'id' },
  { id: '1', text: 'Event Name', valueName: 'eventName' },
  { id: '2', text: 'Customer Name', valueName: 'userName' },
  { id: '3', text: 'Activity Name', valueName: 'activityNameEn' },
  { id: '4', text: 'Organizer Name', valueName: 'organizerName' },
  { id: '6', text: 'No. of Tickets', valueName: 'noOfTicket' },
  { id: '7', text: 'CouponCode', valueName: 'couponCode' },
  { id: '8', text: 'Created at', valueName: 'createdAt' }
];

export const tblCoupons = [
  { id: '12', text: 'Coupon Code', valueName: 'code' },
  { id: '1', text: 'Discount', valueName: 'discount' }
];

export const tblTransactions = [
  { id: '27', text: 'Coustomer Name', valueName: 'userName' },
  { id: '12', text: 'Coupon Code', valueName: 'code' },
  { id: '2', text: 'Discount', valueName: 'discount' },
  { id: '4', text: 'Event Name', valueName: 'eventName' },
  { id: '3', text: 'Event Date', valueName: 'eventDate' },
  { id: '1', text: 'Created At', valueName: 'createdAt' },
  { id: '6', text: 'No. of Tickets', valueName: 'noOfTicket' },
  { id: '8', text: 'Ticket price before discount', valueName: 'price' },
  { id: '7', text: 'Totla price after discount', valueName: 'newPrice' },
  { id: '22', text: 'Payment Method', valueName: 'paymentMethodeId' },
  { id: '25', text: 'Confirmed', valueName: 'confirmed' }
];

export const organizerListKeys = {
  phone: 'Phone No.',
  city: 'City',
  email: 'Email:',
  moiNumber: 'MOI Number:',
  createdAt: 'Created At:',
  description: 'Description:'
};

export const organizerListIcons = {
  phone: <Smartphone />,
  city: <LocationCity />,
  email: <Email />,
  moiNumber: <CreditCard />,
  createdAt: <CalenderToday />,
  description: <EventNote />
};

export const customerListKeys = {
  phone: 'Phone No.',
  city: 'City:',
  email: 'Email:',
  gender: 'Gender:',
  birthdate: 'Birth Date:',
  joinForm: 'Joined By:',
  createdAt: 'Created At:',
  description: 'Description:'
};

export const customerListIcons = {
  phone: <Smartphone />,
  city: <LocationCity />,
  email: <Email />,
  gender: <Person />,
  birthdate: <CalenderToday />,
  joinForm: <HowToReg />,
  createdAt: <CalenderToday />,
  description: <EventNote />
};

export const editFormFields = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    label: 'Organizer Name',
    required: true
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone No.',
    required: false
  },
  {
    name: 'email',
    type: 'text',
    label: 'Email Adress',
    required: true
  },
  {
    name: 'city',
    type: 'text',
    label: 'City',
    required: false
  },
  {
    name: 'moiNumber',
    type: 'text',
    label: 'MOI Number',
    required: true
  },
  {
    name: 'description',
    type: 'text',
    label: 'Description',
    required: false
  }
];

export const addCouponFields = [
  {
    name: 'code',
    type: 'text',
    label: 'Coupon Code',
    required: true,
    inputProps: {}
  },
  {
    name: 'discount',
    type: 'text',
    label: 'Discount Value',
    required: true,
    inputProps: {
      endAdornment: <InputAdornment position="end">%</InputAdornment>
    }
  }
];
