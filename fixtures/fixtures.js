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
  // { id: '2', text: 'Organizer', valueName: 'organizerId' },
  // { id: '3', text: 'Activity', valueName: 'activityId' },
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
  { id: '7', text: 'Email', valueName: 'email' },
  { id: '8', text: 'National ID', valueName: 'nationalNum' },
  { id: '9', text: 'City', valueName: 'city' },
  { id: '10', text: 'MOI Number', valueName: 'moiNumber' }
];

export const tblCustomers = [
  { id: '1', text: 'Name', valueName: 'name' },
  { id: '2', text: 'Phone No.', valueName: 'phone' },
  // { id: '3', text: 'Description', valueName: 'description' },
  // { id: '4', text: 'Gender', valueName: 'gender' },
  { id: '5', text: 'Birthdate', valueName: 'birthdate' },
  // { id: '6', text: 'Profile Picture', valueName: 'profileImage' },
  // { id: '7', text: 'Joined By', valueName: 'joinForm' },
  { id: '8', text: 'Email', valueName: 'email' },
  { id: '9', text: 'National ID', valueName: 'nationalNum' }
];

export const organizerListKeys = {
  phone: 'Phone No.',
  city: 'City',
  email: 'Email:',
  nationalNum: 'National ID',
  moiNumber: 'MOI Number:',
  createdAt: 'Created At:',
  description: 'Description:'
};

export const organizerListIcons = {
  phone: <Smartphone />,
  city: <LocationCity />,
  email: <Email />,
  nationalNum: <CreditCard />,
  moiNumber: <CreditCard />,
  createdAt: <CalenderToday />,
  description: <EventNote />
};

export const customerListKeys = {
  phone: 'Phone No.',
  city: 'City:',
  email: 'Email:',
  gender: 'Gender:',
  nationalNum: 'National ID:',
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
  nationalNum: <CreditCard />,
  birthdate: <CalenderToday />,
  joinForm: <HowToReg />,
  createdAt: <CalenderToday />,
  description: <EventNote />
};
