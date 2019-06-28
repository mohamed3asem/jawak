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
