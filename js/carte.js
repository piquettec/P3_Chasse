/**
* @file Démo Google Maps - Création de marqueurs et d'infobulles
* @author Yves Helie <yves.helie@cegep-ste-foy.qc.ca>
* @todo Personnaliser le marqueur
* @todo Personnaliser l'infobulle (lignes 47 à 53)
* @version 1.1.4
*/
 
const objCarte = {
    objMap: null,
    arrMarqueurs: [],
    fltLatCentreCarte: 46.811638,
    fltLngCentreCarte: -71.223758,
    strUrlImages: '../media/images/',
    intZoomCarte: 14,
 
    initialiser: function (strIdCarte) {
        this.objMap = new google.maps.Map(document.getElementById(strIdCarte), {
            center: {
                lat: this.fltLatCentreCarte,
                lng: this.fltLngCentreCarte
            },
            scrollwheel: false,
            zoom: this.intZoomCarte
        });
        this.creerMarqueurs();
    },
 
    creerMarqueurs: function () {
        for (let strIdEpigraphe in objJSONepigraphes) {
            const objEpigrapheCourant = objJSONepigraphes[strIdEpigraphe];
 
            const strGabaritContenuInfobulle =
				`<div class="infobulle">
				<div class="image"><img width="100%" src="../media/images/${strIdEpigraphe}.png"/></div>
				<div class="titre">${objEpigrapheCourant.PRENOM} ${objEpigrapheCourant.NOM}</div>
				<div class="adresse">Adresse : ${objEpigrapheCourant.ADRESSE}</div>
					<a class="btn" href="../fiches/${objEpigrapheCourant.DOMAINE}?id=${strIdEpigraphe}">
						Consulter la fiche de ${objEpigrapheCourant.PRENOM} ${objEpigrapheCourant.NOM}
					</a>
				</div>`;
 
            console.log(strGabaritContenuInfobulle);
            console.log(objEpigrapheCourant);
            console.log(strIdEpigraphe);
 
            const objInfobulle = new google.maps.InfoWindow({
                content: strGabaritContenuInfobulle
            });
 
            const objMarqueur = new google.maps.Marker({
                position: new google.maps.LatLng(objEpigrapheCourant.LATITUDE, objEpigrapheCourant.LONGITUDE),
                title: objEpigrapheCourant.IMAGE.TITRE,
                map: this.objMap,
                icon: `${this.strUrlImages}marqueurs/landmark-orchid.svg`,
                infowindow: objInfobulle
            });
 
            objMarqueur.addListener('click', function () {
                objCarte.fermerToutesInfobulles();
                this.infowindow.open(objCarte.objMap, this);
                this.setIcon(`${objCarte.strUrlImages}marqueurs/landmark-maroon.svg`);
            });
 
            this.arrMarqueurs.push(objMarqueur);
        }
    },
 
    fermerToutesInfobulles: function () {
        this.arrMarqueurs.forEach(function (objMarqueur) {
            objMarqueur.infowindow.close();
        });
    }
};

objCarte.initialiser('carte');