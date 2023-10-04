let ipAddress;
async function handleGetUserIPAddress() {
  try {
    const response = await fetch("https://api.ipify.org/?format=json");
    const result = await response.json();
    return result.ip;
  } catch (error) {
    console.log(error.code, error.message);
  }
}
// function to get Location Data from IP Address
async function handleGetLocationData(IP) {
  try {
      const response = await fetch(`https://ipapi.co/${IP}/json/`);
      const result = await response.json();
      return result;
  } catch (error) {
      console.log(error.code, error.message);
  }
}

// function to add Data On displayLocation Page
async function addDataOnDisplayLocationPage(locationData) {
  try {
    
    document.getElementById("ip-address").textContent = ipAddress;
    const aboutLocation = document.getElementById("aboutLocation");
      aboutLocation.innerHTML = `
    <div>
      <p id="lat">Lat: <span>${locationData.latitude}</span></p>
        <p>Long: <span>${locationData.longitude}</span></p>
     </div>
     <div> 
      <p>City: <span>${locationData.city}</span></p>
      <p>Region: <span>${locationData.region}</span></p>
     </div>
     <div>
      <p>Organisation: <span>${locationData.org}</span></p>
      <p>Hostname: <span>${locationData.ip}</span></p>
     </div>
      `;
    const map = document.getElementById("map");
    let mapData = `<iframe src="https://maps.google.com/maps?q=${locationData.latitude},${locationData.longitude}&output=embed" width="100%" height="100%" frameborder="0" style="border:0"></iframe>`;
    map.innerHTML = mapData;

    let datetime = new Date().toLocaleString("en-US", { timeZone: `${locationData.timezone}` });
    document.getElementById('timeZone').innerHTML = locationData.timezone;        
      document.getElementById('dateTime').innerHTML = datetime;
      document.getElementById('pincode').innerHTML = locationData.postal;

      addDataOnCard(locationData.postal);
  } catch (error) {
      console.log('Location render error : ', error.code, ' ', error.message);
  }
}

async function addDataOnCard(pincode) {
  try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const result = await response.json();
      document.getElementById('message').innerHTML = result[0].Message;

      result[0].PostOffice.forEach(card => {

          let data = `<div class="card" id="card">
                  <p>Name : &nbsp; <span id="name">${card.Name}</span></p>
                  <p>Branch Type : &nbsp; <span id="branchType">${card.BranchType}</span></p>
                  <p>Delivery Status : &nbsp; <span id="deliveryStatus">${card.DeliveryStatus}</span></p>
                  <p>District : &nbsp; <span id="district">${card.District}</span></p>
                  <p>Division : &nbsp; <span id="division">${card.Division}</span></p>
              </div>`;

          document.getElementById('cardsGrid').innerHTML += data;
      });
  } catch (error) {
      console.log('Card render error : ', error.code, ' ', error.message);
  }
}


const searchFunction = () => {
  try {
      let filter = document.getElementById('searchInput').value.toUpperCase();
      let cards = document.getElementsByClassName('card');
      let cardArray = Array.from(cards);

      cardArray.forEach(card => {
          let postName = card.querySelector('#name');
          let branchOffice = card.querySelector('#branchType');

          if (postName || branchOffice) {
              let post = postName.textContent.toUpperCase();
              let branch = branchOffice.textContent.toUpperCase();

              if (post.includes(filter) || branch.includes(filter)) {
                  card.style.display = "";
              } else {
                  card.style.display = "none";
              }
          }
      });
  } catch (error) {
      console.log('Searching error : ', error.code, ' ', error.message);
  }
}

async function fillData() {
  try {
    ipAddress = await handleGetUserIPAddress();
    const locationData = await handleGetLocationData(ipAddress);
    addDataOnDisplayLocationPage(locationData);
  } catch (error) {
    console.log(error.code, error.message);
  }
}
fillData();