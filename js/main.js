$(document).ready(function () {



    function debugDiscordBot() {
        console.log('Discord bot is ready!');
        return 'Discord bot is ready!';
    }

    $('#startButton').click(function () {
        let mst = $('#' + $('#MST').val()).text();
        let medicament = $('#' + $('#medicament').val()).text();
        startFight(mst, medicament);
        
    });

    $('#MSTSelect').change(function () {
        let mst = $('#' + $('#MST').val()).text();
        updateFightInfos(mst);
    });

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
            while (MST.isAlive && medicament.isAlive) {
                await wait(100);
                playTurn(MST, medicament);
                updateFightInfos(MST, medicament);
                generateModels(MST, medicament);
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
                return MST.name;
    
            } else {
                $('#winner').text(medicament.name);
                return medicament.name;
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