const btn = document.getElementById("btn");


async function handleGetUserIPAddress() {
  try {
      const response = await fetch('https://api.ipify.org/?format=json')
      const result = await response.json();
      return result.ip;
  } catch (error) {
      console.log(error.code, error.message);
  }
}

 async function toAddIp(){
  try{
     let ipAddress = await handleGetUserIPAddress();
     document.getElementById('ip-address').innerHTML = ipAddress;

  }
  catch (error) {
    alert('Something Went Wrong !');
    return window.location.reload();
}
}

toAddIp();

// Add a click event listener to the button
btn.addEventListener("click", function () {
  // Set the URL to redirect to
  const redirectUrl = "./main.html"; // Replacme with your desired URL
  // Redirect to the specified URL
  window.location.href = redirectUrl;
});
