
// represente les keydown du konami code
const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
// variable pour controler 
let current = 0;

let keyHandler = function (event) {
	//console.log(event.key);

    // si la keydown ne fait pas partie du pattern
    // et si la keydown n'est pas correspondant à celle du pattern, à la case n°current
    if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
        current = 0;
		return;
	} else {
        //on incremente à chaque fois que ça correspond au pattern
        current++;
    }
   
    // si le pattern est completé, "notif"
    if (pattern.length === current) {
      current = 0;
      //console.log('konami code');
    
$      //redirect to a new tab with the url
      window.open(location.protocol + '//' + location.host + location.pathname + '/maladius', '_blank');
	}
};

document.addEventListener('keydown', keyHandler, false);



// first test of modal
function exemple() {
  el = document.getElementById("example");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}



// second type of modal

const modal1 = document.querySelector(".modal");
const modal2 = document.querySelector(".modal2");

document.getElementById("sida").addEventListener("click",toggleModal);
const closeButtonSIDA = document.querySelector(".close-button");
closeButtonSIDA.addEventListener("click", toggleModal);

document.getElementById("ist").addEventListener("click",toggleModalIST);
const closeButtonIST = document.querySelector(".close-button2");
closeButtonIST.addEventListener("click", toggleModalIST);
  
function toggleModal() {
  modal1.classList.toggle("show-modal");
}

function toggleModalIST() {
  modal2.classList.toggle("show-modal");
}
  // function windowOnClick(event) {
  //     if (event.target === modal) {
  //         toggleModal();
  //     }
  // }
  
  // trigger.addEventListener("click", toggleModal);
  // closeButton.addEventListener("click", toggleModal);
  // window.addEventListener("click", windowOnClick);


// exemple de reaction
function konami_reaction(){
  var shock = document.createElement('div');
    var img = new Image();
    img.src = "img/taslesida.png";
    img.style.width = '550px';
    img.style.height = '375px';
    img.style.transition = '13s all';
    img.style.position = 'fixed';
    img.style.right = '-374px';
    // img.style.bottom = 'calc(-50% + 280px)';
    img.style.top = '100px';
    img.style.zIndex = 999999;

    document.body.appendChild(img);

    window.setTimeout(function () {
      img.style.right = 'calc(100% + 500px)';
    }, 50);

    // window.setTimeout(function(){
    //   img.style.right = 'calc(100% + 375px)';
    // }, 4500);

    window.setTimeout(function () {
      img.parentNode.removeChild(img);
    }, 10300);
}

function exemple() {
  el = document.getElementById("example");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}


/*
function unicorn() {
  "use strict";

  // type 'unicorn' on your keyboard
  var key = [85, 78, 73, 67, 79, 82, 78];
  var ck = 0;
  var max = key.length;

  var unicorn = function () {

    var shock = document.createElement('div');
    var img = new Image();
    img.src = "img/taslesida.png";
    // img.src = data;
    img.style.width = '500px';
    img.style.height = '375px';
    img.style.transition = '13s all';
    img.style.position = 'fixed';
    img.style.right = '-374px';
    // img.style.bottom = 'calc(-50% + 280px)';
    img.style.top = '100px';
    img.style.zIndex = 999999;

    document.body.appendChild(img);

    window.setTimeout(function () {
      img.style.right = 'calc(100% + 500px)';
    }, 50);

    // window.setTimeout(function(){
    //   img.style.right = 'calc(100% + 375px)';
    // }, 4500);

    window.setTimeout(function () {
      img.parentNode.removeChild(img);
    }, 10300);

  };

  var record = function (e) {

    if (e.which === key[ck]) {
      ck++;
    } else {
      ck = 0;
    }

    if (ck >= max) {
      unicorn();
      ck = 0;
    }

  };

  var init = function (data) {

    document.addEventListener('keyup', record);

  };

  // var data = "https://weichiachang.github.io/easter-eggs-mobile/images/unicorn.gif"
  var data = "img/taslesida.png";

  init(data)
}*/