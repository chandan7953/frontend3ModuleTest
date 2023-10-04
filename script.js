// function getIPAddress() {
//     // Make an HTTP request to ipinfo.io
//     fetch('https://ipinfo.io/json')
//       .then((response) => response.json())
//       .then((data) => {
//         const ipAddress = data.ip;
//         // Display the IP address on the page
//         console.log(ipAddress);
//       })
//       .catch((error) => {
//         console.error('Error fetching IP address:', error);
//       });
//   }

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
    document.getElementById("ip-address").textContent =
      "Your IP address is: " + ipAddress;
  } catch (error) {
    console.error("Error fetching IP address:", error);
  }
}

// Call the function to get the IP address
getIPAddress();

const btn = document.getElementById("btn");

// Add a click event listener to the button
button.addEventListener("click", function () {
  // Set the URL to redirect to
  const redirectUrl = "./main.html"; // Replacme with your desired URL
  // Redirect to the specified URL
  window.location.href = redirectUrl;
});
