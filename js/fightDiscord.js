function startFightDiscord(mst, medic) {
    let MST = new Entite(mst);
    let medicament = new Entite(medic);
    generateModels(MST, medicament);
    playFight(MST, medicament);
}




    function playFight(MST, medicament) {
        while (MST.isAlive && medicament.isAlive) {
            playTurn(MST, medicament);
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
            $('#winnerDiscord').text(MST.name);

            return MST.name;

        } else {
            console.log(medicament.name);

            $('#winnerDiscord').text(medicament.name);
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



