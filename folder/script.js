// const proxyURL = 'https://api.allorigins.win/get?url=';
// const apiURL = proxyURL + encodeURIComponent('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=client_data');
// // Use CORS Anywhere proxy
const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
const apiURL = corsAnywhereUrl + 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=client_data';

// Fetch data from API using the proxy
 async function fetchData() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// import dummyData from "./dummyData.js"

fetchData().then(data => {
  const clients = data.clients;
   temp(data);
});

function temp(dummyData){
const clientFilter = document.getElementById("clientFilter");
const clientList = document.getElementById("clientList");
const popup = document.getElementById("popup");
const popupName = document.getElementById("popupName");
const popupPoints = document.getElementById("popupPoints");
const popupAddress = document.getElementById("popupAddress");

// Use dummyData instead of fetching from API
const clients = dummyData.clients;
const clientData = dummyData.data;

function updateClientList(filter) {
  clientList.innerHTML = "";

  clients.forEach((client) => {
    if (
      filter === "all" ||
      (filter === "managers" && client.isManager) ||
      (filter === "nonManagers" && !client.isManager)
    ) {
      const listItem = document.createElement("li");
      listItem.textContent = `${client.label} - ${
        clientData[client.id].points
      } points`;
      listItem.addEventListener("click", () => showPopup(client.id));
      clientList.appendChild(listItem);
    }
  });
}

function showPopup(clientId) {
    const selectedClient = clientData[clientId];
    popupName.textContent = `Name: ${selectedClient.name}`;
    popupPoints.textContent = `Points: ${selectedClient.points}`;
    popupAddress.textContent = `Address: ${selectedClient.address}`;
    popup.style.display = "block";
}

// Apply filter when dropdown value changes
clientFilter.addEventListener("change", () => {
  updateClientList(clientFilter.value);
});

// Initial load with all clients
updateClientList("all");
}