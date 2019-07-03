export const renderEventsStatus = id => {
  switch (id) {
    case 1:
      return 'Pending Approval';
    case 2:
      return 'Approved';
    case 3:
      return 'Ended';
    default:
      return 'Pending Approval';
  }
};

export const renderPaymentMethod = id => {
  switch (id) {
    case 1:
      return 'Cash';
    case 2:
      return 'Visa';
    default:
      return 'Unkown';
  }
};

export const renderAttendanceState = stateBoolean => {
  const state = stateBoolean ? 'Attended' : 'Absent';
  return state;
};
