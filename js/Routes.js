$(document).ready(function () {

let params = (new URL(document.location)).searchParams;
let medic = params.get("medic");
let mst = params.get("mst");
console.log(mst);
console.log(medic);

startFightDiscord(mst, medic); 



});


