let loadedRouteTab = [];

//charge la structure d'une ligne
function loadRoute(id_route) {
    let route = '/vue/route/' + id_route + '/route',
        target = document.getElementById('slide-route'),
        callback = null;

    loadedRouteTab = [];

    ajaxRouter(route, target, callback);
}

//charge un onglet
function loadTabRoute(id_route, tab, callback) {
    if(!loadedRouteTab[tab]){
        loadedRouteTab[tab] = true;

        let route = '/vue/route/' + id_route + '/' + tab,
            target = document.getElementById('route-tab-' + tab);

        axios.get(route).then(function (response) {
            target.innerHTML = response.data;
            if(callback !== null) callFunction(callback, window);
        });

    }
}

function reloadRouteInformationTab() {
    let route_id = document.getElementById('info-route-id');
    closeModal();
    loadTabRoute(route_id.value, 'information', 'initInformationRouteTab');
    return false;
}

function initInformationRouteTab() {

    //ajoute les événements open modal sur les boutons
    initOpenModal();

    //convertie les textes en markdown
    convertMarkdownZone();
}


function optimisePopupRoute() {
    let climbSelect = document.getElementById('select-climbs-popup-route'),
        zoneEquipement = document.getElementById('popup-route-equipement-zone'),
        typeCotation = document.getElementById('popup-route-type-cotation'),
        cotationIncline = document.getElementById('popup-route-cotation-incline'),
        nbLongueur = document.getElementById('popup-route-nb-longueur'),
        zoneBloc = document.getElementById('popup-route-bloc-zone'),
        tableLongeur = document.getElementById('popup-route-table-longueur'),
        checkTypeCotation = document.getElementById('type-cotation-longeur');

    //Type bloc
    if(climbSelect.value === '2'){
        zoneEquipement.style.display = 'none';
        cotationIncline.style.display = 'block';
        typeCotation.style.display = 'none';
        nbLongueur.style.display = 'none';
        tableLongeur.style.display = 'none';
        zoneBloc.style.display = 'block';
    }

    //Type voie
    if(climbSelect.value === '3'){
        zoneEquipement.style.display = 'block';
        cotationIncline.style.display = 'block';
        typeCotation.style.display = 'none';
        nbLongueur.style.display = 'none';
        tableLongeur.style.display = 'none';
        zoneBloc.style.display = 'none';
    }

    //Type grande-voie
    if(climbSelect.value === '4'){
        typeCotation.style.display = 'block';
        nbLongueur.style.display = 'block';
        zoneBloc.style.display = 'none';
        if(checkTypeCotation.checked === true){
            cotationIncline.style.display = 'none';
            zoneEquipement.style.display = 'none';
            tableLongeur.style.display = 'block';
        }else{
            cotationIncline.style.display = 'block';
            zoneEquipement.style.display = 'block';
            tableLongeur.style.display = 'none';
        }
    }

    //Type trad
    if(climbSelect.value === '5'){
        typeCotation.style.display = 'block';
        nbLongueur.style.display = 'block';
        zoneBloc.style.display = 'none';
        if(checkTypeCotation.checked === true){
            cotationIncline.style.display = 'none';
            zoneEquipement.style.display = 'none';
            tableLongeur.style.display = 'block';
        }else{
            cotationIncline.style.display = 'block';
            zoneEquipement.style.display = 'block';
            tableLongeur.style.display = 'none';
        }
    }

    //Type artif
    if(climbSelect.value === '6'){
        nbLongueur.style.display = 'block';
        zoneBloc.style.display = 'none';
        if(checkTypeCotation.checked === true){
            cotationIncline.style.display = 'none';
            zoneEquipement.style.display = 'none';
            tableLongeur.style.display = 'block';
        }else{
            cotationIncline.style.display = 'block';
            zoneEquipement.style.display = 'block';
            tableLongeur.style.display = 'none';
        }
    }

    //Type deep-water
    if(climbSelect.value === '7'){
        zoneEquipement.style.display = 'none';
        cotationIncline.style.display = 'block';
        nbLongueur.style.display = 'none';
        typeCotation.style.display = 'none';
        tableLongeur.style.display = 'none';
        zoneBloc.style.display = 'none';
    }

    //Type via-ferrata
    if(climbSelect.value === '8'){
        zoneEquipement.style.display = 'none';
        cotationIncline.style.display = 'block';
        nbLongueur.style.display = 'none';
        typeCotation.style.display = 'none';
        tableLongeur.style.display = 'none';
        zoneBloc.style.display = 'none';
    }

}

function dupliqueLongueurLine() {
    let trTable = document.querySelectorAll('#popup-route-table-longueur tbody tr'),
        tbodyTable = document.getElementById('tbody-liste-longueur'),
        nb_longueur = document.getElementById('nb_longueur'),
        saveLine = '';

    if(nb_longueur.value >= 1){
        $('#tbody-liste-longueur select').material_select('destroy');
        saveLine = trTable[0].innerHTML;
        tbodyTable.innerHTML = '';
        for(let i = 0 ; i < nb_longueur.value ; i++){
            tbodyTable.innerHTML += saveLine.replace('L.1','L.' + (i + 1));
        }
    }

    getJsonLongueur();

    //réinitialise les selects
    $('select').material_select();
}

function setJsonLongueur() {
    let cotation_longueur = document.getElementsByName('cotation_longueur'),
        ponderation_longueur = document.getElementsByName('ponderation_longueur'),
        relais_longueur = document.getElementsByName('relais_longueur'),
        point_longueur = document.getElementsByName('point_longueur'),
        nb_point_longueur = document.getElementsByName('nb_point_longueur'),
        incline_id_longeur = document.getElementsByName('incline_id_longeur'),
        height_longueur = document.getElementsByName('height_longueur'),
        jsonLongueur = document.getElementById('jsonLongueur'),
        tableJson = [];

    for(let i = 0 ; i < cotation_longueur.length ; i++){
        let tempTab = [
            cotation_longueur[i].value,
            ponderation_longueur[i].value,
            relais_longueur[i].value,
            point_longueur[i].value,
            nb_point_longueur[i].value,
            incline_id_longeur[i].value,
            height_longueur[i].value
        ];
        tableJson.push(tempTab.join(';'));
    }

    jsonLongueur.value = tableJson.join('||');

}

function getJsonLongueur() {
    let cotation_longueur = document.getElementsByName('cotation_longueur'),
        ponderation_longueur = document.getElementsByName('ponderation_longueur'),
        relais_longueur = document.getElementsByName('relais_longueur'),
        point_longueur = document.getElementsByName('point_longueur'),
        nb_point_longueur = document.getElementsByName('nb_point_longueur'),
        incline_id_longeur = document.getElementsByName('incline_id_longeur'),
        height_longueur = document.getElementsByName('height_longueur'),
        jsonLongueur = document.getElementById('jsonLongueur'),
        tableJson = jsonLongueur.value.split('||');

    for(let i = 0 ; i < tableJson.length ; i++){
        let tempTab = tableJson[i].split(';');
        try {
            cotation_longueur[i].value = tempTab[0];
            ponderation_longueur[i].value = tempTab[1];
            relais_longueur[i].value = tempTab[2];
            point_longueur[i].value = tempTab[3];
            nb_point_longueur[i].value = tempTab[4];
            incline_id_longeur[i].value = tempTab[5];
            height_longueur[i].value = tempTab[6];
        }catch (e){}
    }
}