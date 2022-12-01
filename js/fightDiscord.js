function startFightDiscord(mst, medic) {
    let MST = new Entite(mst);
    let medicament = new Entite(medic);
    playFightDiscord(MST, medicament);
}




    function playFightDiscord(MST, medicament) {
        while (MST.isAlive && medicament.isAlive) {
            playTurnDiscord(MST, medicament);
        }
        determineWInnerDiscord(MST, medicament);

    }

    function playTurnDiscord(MST, medicament) {

        if (MST.speed > medicament.speed) {
            attackDiscord(MST, medicament);
            attackDiscord(medicament, MST);
        } else {
            attackDiscord(medicament, MST);
            attackDiscord(MST, medicament);
        }
        $('#healthMST').text(MST.health);
        $('#healthMedic').text(medicament.health);

    }

    function determineWInnerDiscord(MST, medicament) {
        if (MST.isAlive) {
            $('#winnerDiscord').text(MST.name);

            return MST.name;

        } else {

            $('#winnerDiscord').text(medicament.name);
            return medicament.name;

        }
    }

function attackDiscord(attackDiscorder, defender) {
    let damage = attackDiscorder.attackDiscord / defender.defense;
    if (damage < 0) {
        damage = 0;
    }
    defender.health -= damage;
    if (defender.health <= 0) {
        defender.isAlive = false;
    }
}



