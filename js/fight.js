function startFight(mst, medic) {
    let MST = new Entite(mst);
    let medicament = new Entite(medic);
    generateModels(MST, medicament);
    playFight(MST, medicament);
}

    function wait(ms) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log("Done waiting");
            resolve(ms)
          }, ms )
        });
      }


    async function playFight(MST, medicament) {
        generateModels(MST, medicament);
        while (MST.isAlive && medicament.isAlive) {
            await wait(1000);
            playTurn(MST, medicament);
            updateFightInfos(MST, medicament);
            animateAttack();
        }
        determineWInner(MST, medicament);

    }

    function playTurn(MST, medicament) {
        if (MST.speed > medicament.speed) {
            attack(MST, medicament);
            attack(medicament, MST);
        } else {
            attack(medicament, MST);
            attack(MST, medicament);
        }
    }

    function determineWInner(MST, medicament) {
        if (MST.isAlive) {
            $('#winner').text(MST.name);
            animateDeath('CampMedic');
            return MST.name;

        } else {
            $('#winner').text(medicament.name);
            animateDeath('CampMST');

            return medicament.name;
        }
    }

function attack(attacker, defender) {
    let damage = attacker.attack / defender.defense;
    if (damage < 0) {
        damage = 0;
    }
    defender.health -= damage;
    if (defender.health <= 0) {
        defender.isAlive = false;
    }
}
function generateModels(MST, medicament) {
    $('#CampMST').text('');
    $('#CampMST').append('<img id="model" src="' + MST.image + '" alt="' + MST.name + '">');
    $('#CampMedic').text('');
    $('#CampMedic').append('<img src="' + medicament.image + '" alt="' + medicament.name + '">');
    $('#MST1').attr('src', MST.image);
    $('#medicament1').attr('src', medicament.image);
}

function updateFightInfos(MST, medicament) {
    $('#MSTname').text(MST.name);
    $('#medicname').text(medicament.name);
    $('#MST1Health').text((MST.health).toFixed(1));
    $('#medicament1Health').text((medicament.health).toFixed(1));
    $('#MST1Attack').text(MST.attack);
    $('#medicament1Attack').text(medicament.attack);
    $('#MST1Defense').text(MST.defense);
    $('#medicament1Defense').text(medicament.defense);
    $('#MST1Speed').text(MST.speed);
    $('#medicament1Speed').text(medicament.speed);
}

function animateAttack() {
    $("#CampMedic").animate({right: '+=250px'});
    $("#CampMedic").animate({right: '0px'});
    $("#CampMST").animate({left: '+=250px'});
    $("#CampMST").animate({left: '0px'});
}

function animateDeath(dead) {
    //make dead model disappear by setting display to none
    $('#'+ dead + '>img').css('display', 'none');   
}