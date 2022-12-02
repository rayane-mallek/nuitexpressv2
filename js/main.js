$(document).ready(function () {

    $('.ui.dropdown')
    .dropdown()
    ;

    let mst = $('#' + $('#MST').val()).text();
    let medic = $('#' + $('#medicament').val()).text();
    let MST = new Entite(mst);
    let medicament = new Entite(medic);
    updateFightInfos(MST, medicament);
    generateModels(MST, medicament)



    $('#startButton').click(function () {
        let mst = $('#' + $('#MST').val()).text();
        let medicament = $('#' + $('#medicament').val()).text();
        startFight(mst, medicament);

    });

    $('#MST, #medicament').change(function () {
        let mst = $('#' + $('#MST').val()).text();
        let medic = $('#' + $('#medicament').val()).text();
        let MST = new Entite(mst);
        let medicament = new Entite(medic);
        updateFightInfos(MST, medicament);
        generateModels(MST, medicament)
    });





});

let i = 2;