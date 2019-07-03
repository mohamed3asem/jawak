export const filterClients = (clients, filterValue) => {
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(filterValue.toLowerCase())
  );
  return filteredClients;
};
