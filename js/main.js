$(document).ready(function () {

    $('.ui.dropdown')
    .dropdown()
    ;

    function darkPattern(){
        let params = (new URL(document.location)).searchParams;
        if(darkPattern){  
            $('.darkPattern').hide();
            $('.PatternDark').show();
            function flouttage(time){
                document.body.setAttribute('style','filter: blur(5px); transition: 2s;')  
                }
            function deflouttage(){
              document.body.setAttribute('style','filter: blur(0); transition: 2s;')  
            }
            function floutdeflout(){   
                flouttage();
                setTimeout(deflouttage, 4000);
            }
            setInterval(floutdeflout,4000)
        }
    }
    
    darkPattern();

    function createArray(name){
        let tab = [];
        jQuery("select[name='"+ name + "']").each(function() {
            tab.push($('#' + $(this).val()).text());
        })
        return tab;
    }


    $('#startButton').click(function () {
        startFight(createArray('mst'), createArray('medic'));

    });

    $('#MST, #medicament').change(function () {
        let mst = $('#' + $('#MST').val()).text();
        let medic = $('#' + $('#medicament').val()).text();
        let MST = new Entite(mst);
        let medicament = new Entite(medic);
    });

    $('#addMST').click(function () {
        $('#MST').clone().addClass('ui search dropdown').appendTo('#containerSelectMST');
        $('.ui.dropdown')
        .dropdown()
        ;
        createArray('mst');
    });

    $('#addMedic').click(function () {
        $('#medicament').clone().addClass('ui search dropdown').appendTo('#containerSelectMedic');
        $('.ui.dropdown')
        .dropdown()
        ;
        createArray('medic');
    });

    




});

