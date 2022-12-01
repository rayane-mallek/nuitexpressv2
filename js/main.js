$(document).ready(function () {
    console.log('Hello World!');

    $('#startButton').click(function () {
        let mst = $('#' + $('#MST').val()).text();
        let medicament = $('#' + $('#medicament').val()).text();
        startFight(mst, medicament);

    });

    function startFight(mst, medic) {
        let MST = new Entite(mst);
        let medicament = new Entite(medic);
        updateFightInfos(MST, medicament);
        generateModels(MST, medicament);
        playFight(MST, medicament);
        }





    function playFight(MST, medicament) {
        while (MST.isAlive && medicament.isAlive) {
            updateFightInfos(MST, medicament);
                if (MST.speed > medicament.speed) {
                    attack(MST, medicament);
                    if (medicament.isAlive) {
                        attack(medicament, MST);
                    }
                } else {
                    attack(medicament, MST);
                    if (MST.isAlive) {
                        attack(MST, medicament);
                    }
                }
        }
        if (MST.isAlive) {
            console.log(MST.name + ' a gagné !');
            $('#winner').text(MST.name);
        } else {
            $('#winner').text(medicament.name);
        }
    }

    function attack(attacker, defender) {
        let damage = attacker.attack - defender.defense;
        if (damage < 0) {
            damage = 0;
        }
        defender.health -= damage;
        if (defender.health <= 0) {
            defender.isAlive = false;
        }
    }


    function updateFightInfos(MST, medicament) {
        $('#MSTname').text(MST.name);
        $('#medicname').text(medicament.name);
        $('#MST1Health').text(MST.health);
        $('#medicament1Health').text(medicament.health);
        $('#MST1Attack').text(MST.attack);
        $('#medicament1Attack').text(medicament.attack);
        $('#MST1Defense').text(MST.defense);
        $('#medicament1Defense').text(medicament.defense);
        $('#MST1Speed').text(MST.speed);
        $('#medicament1Speed').text(medicament.speed);
    }

    function generateModels(MST, medicament) {
        $('#CampMst').text('');
        $('#CampMst').append('<img src="' + MST.image + '" alt="' + MST.name + '">');
        $('#CampMedic').text('');
        $('#CampMedic').append('<img src="' + medicament.image + '" alt="' + medicament.name + '">');
        $('#MST1').attr('src', MST.image);
        $('#medicament1').attr('src', medicament.image);
    }


});