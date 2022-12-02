function startFight(mst, medic) {
    tabEntiteMst = [];
    tabEntiteMedic = [];
    for (let i = 0; i < mst.length; i++) {
        let MST = new Entite(mst[i]);
        tabEntiteMst.push(MST);
    }
    for (let i = 0; i < medic.length; i++) {
        let medicament = new Entite(medic[i]);
        tabEntiteMedic.push(medicament);
    }

    let totalHealthMST = 0;
    let totalHealthMedic = 0;
    let totalAttackMst = 0;
    let totalAttackMedic = 0;
    let totalDefenseMst = 0;
    let totalDefenseMedic = 0;
    let totalSpeedMst = 0;
    let totalSpeedMedic = 0;
    for (let i = 0; i < tabEntiteMst.length; i++) {
        totalHealthMST += tabEntiteMst[i].health;
        totalAttackMst += tabEntiteMst[i].attack;
        totalDefenseMst += tabEntiteMst[i].defense;
        totalSpeedMst += tabEntiteMst[i].speed;
    }
    for (let i = 0; i < tabEntiteMedic.length; i++) {
        totalHealthMedic += tabEntiteMedic[i].health;
        totalAttackMedic += tabEntiteMedic[i].attack;
        totalDefenseMedic += tabEntiteMedic[i].defense;
        totalSpeedMedic += tabEntiteMedic[i].speed;
    }

    let tabTotalMST = ['MST', totalHealthMST, totalAttackMst, totalDefenseMst, totalSpeedMst, true]; 
    let tabTotalMedic = ['Medicament', totalHealthMedic, totalAttackMedic, totalDefenseMedic, totalSpeedMedic, true];
    generateModels(tabEntiteMst, tabEntiteMedic);

    playFight(tabTotalMST, tabTotalMedic, tabEntiteMst, tabEntiteMedic);
}


    function wait(ms) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(ms)
          }, ms )
        });
      }


    async function playFight(MST, medicament, mstModel, medicamentModel) {
        generateModels(mstModel, medicamentModel);
        let turn = 0;
        let maxTurn = 99999;
        if($('.maxTurn').val() != '') {
        maxTurn = $('.maxTurn').val();
        }
        while (MST[5] && medicament[5] && turn < maxTurn) {
            await wait(1000);
            playTurn(MST, medicament);
            updateFightInfos(MST, medicament);
            animateAttack();
            turn++;
        }
        determineWInner(MST, medicament);

    }

    function checkIfAlive(entite) {
        let hp = 0;
        for (let i = 0; i < entite.length; i++) {
            hp += entite[i].health;
        }
        return hp > 0 ? true : false;
    }

    function playTurn(MST, medicament) {
        if (MST[4] > medicament[4]) {
            attack(MST, medicament);
            attack(medicament, MST);
        } else {
            attack(medicament, MST);
            attack(MST, medicament);
        }
    }


    function determineWInner(MST, medicament) {
        document.location.href="#top-main";
        document.getElementById("win-box").style.display = 'initial';
        if (MST[5] && !medicament[5]) {
            $('#winner').text(MST[0]);
            animateDeath('CampMedic');
            return MST[0];

        } else if (medicament[5] && !MST[5]) {
            $('#winner').text(medicament[0]);
            animateDeath('CampMST');
            return medicament[0];
        } else {
            let val = MST[1]>=medicament[1] ? MST[0] : medicament[0];
            $('#winner').text(val);
            return val;
        }
    }

function attack(attacker, defender) {
    let damage = attacker[2] / defender[3];
    if (damage < 0) {
        damage = 0;
    }
    defender[1] -= damage;
    if (defender[1] <= 0) {
        defender[5] = false;
    }
}

function generateModels(MST, medicament) {
    $('#CampMST').text('');
    $('#CampMedic').text('');
    for (let i = 0; i < MST.length; i++) {
    $('#CampMST').append('<img id="model" src="' + MST[i].image + '" alt="' + MST[i].image + '">');
    }

    for (let i = 0; i < medicament.length; i++) {    
    $('#CampMedic').append('<img id="medoc" src="' + medicament[i].image + '" alt="' + medicament[i].name + '">');
    }
}

function updateFightInfos(MST, medicament) {
    $('#MST1Health').text((MST[1].toFixed(1)));
    $('#medicament1Health').text((medicament[1].toFixed(1)));

    $('#MST1Attack').text(MST[2]);
    $('#medicament1Attack').text(medicament[2]);

    
    $('#MST1Defense').text(MST[3]);
    $('#medicament1Defense').text(medicament[3]);


    $('#MST1Speed').text(MST[4]);
    $('#medicament1Speed').text(medicament[4]);
}

function animateAttack() {
    $("#CampMedic").animate({right: `+=${Math.floor(Math.random() * 300)}px`});
    $("#CampMedic").animate({right: '0px'});
    $("#CampMST").animate({left: `+=${Math.floor(Math.random() * 300)}px`});
    $("#CampMST").animate({left: '0px'});
}

function animateDeath(dead) {
    //make dead model disappear by setting display to none
    $('#'+ dead + '>img').css('display', 'none');   
}

function visible(i) {
    document.getElementById(i).style.display='none';
}