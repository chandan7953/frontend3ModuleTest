const btn = document.getElementById("btn");

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
      "Your Current IP Address is " + ipAddress;

  } catch (error) {
    console.error("Error fetching IP address:", error);
  }
}

// Call the function to get the IP address
getIPAddress();


// Add a click event listener to the button
btn.addEventListener("click", function () {
  // Set the URL to redirect to
  const redirectUrl = "./main.html"; // Replacme with your desired URL
  // Redirect to the specified URL
  window.location.href = redirectUrl;
});
