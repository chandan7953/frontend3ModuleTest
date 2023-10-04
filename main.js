
async function getIPAddress() {
  try {
    // Make an HTTP request to ipinfo.io
    const response = await fetch("https://ipinfo.io/json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const ipAddress = data.ip;
    // Display the IP address on the page
    document.getElementById("ip-address").textContent = ipAddress;
    // Display the IP address on the page
    const aboutLocation = document.getElementById("aboutLocation");
    const [latitude, longitude] = data.loc.split(',');
    aboutLocation.innerHTML = `
         <div>
            <p id="lat">Lat: <span>${latitude}</span></p>
            <p>Long: <span></span>${longitude}</p>
          </div>
          <div>
            <p>City: <span>${data.city}</span></p>
            <p>Region: <span>${data.region}</span></p>
          </div>
          <div>
            <p>Organisation: <span>${data.org}</span></p>
            <p>Hostname: <span>${data.domain}</span></p>
          </div>
    `;
    const map = document.getElementById("map");
    map.innerHTML = `
    <iframe src="https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed" frameborder="0" style="border: 0;"></iframe>
    `;

    const moreInfo=document.getElementsByClassName("more-info")[0];
    moreInfo.innerHTML="";
    moreInfo.innerHTML=`
    <h3>More Information About You</h3>
    <p>Time Zone: <span>${data.timezone}</span></p>
    <p>Date And Time: <span>${date}</span></p>
    <p>Pincode: <span>${data.postal}</span></p>
    <p >Message: <span>${message}</span></p>
    `
    
  } catch (error) {
    console.error("Error fetching IP address:", error);
  }
}

// Call the function to get the IP address
getIPAddress();


async function fetchPostalApi(pincode){
  try{
      const response=await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data=await response.json();
      message=data[0].Message;
      renderPostalApiData(data[0].PostOffice);
      postOfcData=data[0].PostOffice;

      
  }
  catch(e){
      console.log(e);
  }

}


function renderPostalApiData(data){
  cardContainer.innerHTML="";

  data.forEach((ele) => {
      const div=document.createElement("div");
      div.className="card";
      div.innerHTML=`
      <h4>Name: <span>${ele.Name}</span></h4>
      <h4>Branch Type: <span>${ele.BranchType}</span></h4>
      <h4>Delivery Status: <span>${ele.DeliveryStatus}</span></h4>
      <h4>District: <span>${ele.District}</span></h4>
      <h4>Divison: <span>${ele.Division}</span></h4>
     
      `
      cardContainer.appendChild(div);
      
  });
}