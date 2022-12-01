$(document).ready(function () {

let urlString = window.location.href
console.log(urlString)
let paramString = urlString.split('?')[1];
let queryString = new URLSearchParams(paramString);

for (let pair of queryString.entries()) {
   console.log("Key is: " + pair[0]);
   console.log("Value is: " + pair[1]);
    let entite = new Entite(pair[1]);
    if(pair[0] == "mst"){
    $('#mstResponse').text(JSON.stringify(entite));
    }
    if(pair[0] == "medic"){
    $('#medicResponse').text(JSON.stringify(entite));
    }
}

});


