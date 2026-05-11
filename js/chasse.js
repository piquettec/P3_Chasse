/* Variables globales */
const arrIdsPersonnagesAPiger = new Array("e0001", "e0008", "e0015", "e0019");
const arrIdsObjetsAPiger = new Array("e0002", "e0004", "e0007", "e0021");
const arrIdsLieuxAPiger = new Array("e0005", "e0012", "e0016", "e0022");

window.addEventListener("load", initialiser);

function initialiser() {

    document.getElementById("btnDebuterChasse").addEventListener("click", demarrerChasse);
    localStorage.setItem("chasse_commencer", "false");

    if (localStorage.getItem("chasse_commencer") === "true") {

        document.getElementById("messageEtatChasse").innerHTML = "Chasse en cours";
        document.getElementById("zoneEnigme").hidden = false;

        document.getElementById("lienChercherIndices").hidden = false;

        document.getElementById("btnDebuterChasse").setAttribute("disabled", "");
        document.getElementById("btnDemarrerNouvelleChasse").hidden = false;

        const strIdPersonnage = localStorage.getItem("id_personnage");
        const strIdObjet = localStorage.getItem("id_objet");
        const strIdLieu = localStorage.getItem("id_lieu");

        document.getElementById("personnageIndice").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.INDICE;

        document.getElementById("objetIndice").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.INDICE;

        document.getElementById("lieuIndice").innerHTML = objJSONepigraphes[strIdLieu].CHASSE.INDICE;

        if (localStorage.getItem("personnage_est_trouve") === "true") {
            document.getElementById("personnageMessageTrouve").hidden = false;
            document.getElementById("personnageIndice").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.REPONSE;
        }

        if (localStorage.getItem("objet_est_trouve") === "true") {
            document.getElementById("objetMessageTrouve").hidden = false;
            document.getElementById("objetIndice").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.REPONSE;
        }

        if (localStorage.getItem("lieu_est_trouve") === "true") {
            document.getElementById("lieuMessageTrouve").hidden = false;
            document.getElementById("lieuIndice").innerHTML = objJSONepigraphes[strIdLieu].CHASSE.REPONSE;
        }

        if (localStorage.getItem("personnage_est_trouve") === "true" && localStorage.getItem("objet_est_trouve") === "true" && localStorage.getItem("lieu_est_trouve") === "true") {
            document.getElementById("zoneMessageChasseCompletee").hidden = false
        }
    }
}

function demarrerChasse() {
    localStorage.clear();

    let intHasard = Math.floor(Math.random() * arrIdsPersonnagesAPiger.length);

    const strIdPersonnage = arrIdsPersonnagesAPiger[intHasard].toString(); 
    const strIdObjet = arrIdsObjetsAPiger[intHasard].toString();
    const strIdLieu = arrIdsLieuxAPiger[intHasard].toString();

    localStorage.setItem("id_personnage", strIdPersonnage);
    localStorage.setItem("id_objet", strIdObjet);
    localStorage.setItem("id_lieu", strIdLieu);

    localStorage.setItem("personnage_est_trouve", "false"); 
    localStorage.setItem("objet_est_trouve", "false");
    localStorage.setItem("lieu_est_trouve", "false");
    
    localStorage.setItem("chasse_commencer", "true");

    document.getElementById("personnageSegment").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.INDICE;

    document.getElementById("objetSegment").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.INDICE;

    document.getElementById("lieuSegment").innerHTML = objJSONepigraphes[strIdLieu].CHASSE.INDICE;

    if (localStorage.getItem("chasse_commencer") === "true") {

        document.getElementById("messageEtatChasse").innerHTML = "Chasse en cours";
        document.getElementById("zoneEnigme").hidden = false;

        document.getElementById("lienChercherIndices").hidden = false;

        document.getElementById("btnDebuterChasse").setAttribute("disabled", "");
        document.getElementById("btnDemarrerNouvelleChasse").hidden = false;

        const strIdPersonnage = localStorage.getItem("id_personnage");
        const strIdObjet = localStorage.getItem("id_objet");
        const strIdLieu = localStorage.getItem("id_lieu");

        document.getElementById("personnageIndice").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.INDICE;

        document.getElementById("objetIndice").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.INDICE;

        document.getElementById("lieuIndice").innerHTML = objJSONepigraphes[strIdLieu].CHASSE.INDICE;

        if (localStorage.getItem("personnage_est_trouve") === "true") {
            document.getElementById("personnageMessageTrouve").hidden = false;
            document.getElementById("personnageIndice").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.REPONSE;
        }

        if (localStorage.getItem("objet_est_trouve") === "true") {
            document.getElementById("objetMessageTrouve").hidden = false;
            document.getElementById("objetIndice").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.REPONSE;
        }

        if (localStorage.getItem("lieu_est_trouve") === "true") {
            document.getElementById("lieuMessageTrouve").hidden = false;
            document.getElementById("lieuIndice").innerHTML = objJSONepigraphes[strIdLieu].CHASSE.REPONSE;
        }
    }
}

document.getElementById("btnDemarrerNouvelleChasse").addEventListener("click", ()=> {
    if (localStorage.getItem("chasse_commencer") === "true") {

        document.getElementById("btnDebuterChasse").removeAttribute("disabled");
        localStorage.setItem("chasse_commencer", "false");
        document.getElementById("btnDemarrerNouvelleChasse").hidden = true;
        window.location.reload();
    }
})



const refBouton = document.getElementById("btnConcours").addEventListener("click", function (event) {
        event.preventDefault();
    });
