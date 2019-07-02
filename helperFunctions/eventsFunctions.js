export const categorizeEvents = events => {
  const pendingEvents = [];
  const activeEvents = [];
  const endedEvents = [];

  events.map(event => {
    if (event.statusId === 1) {
      pendingEvents.push(event);
    } else if (event.statusId === 2) {
      activeEvents.push(event);
    } else {
      endedEvents.push(event);
    }
  });

  return { pendingEvents, activeEvents, endedEvents };
};
