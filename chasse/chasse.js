/* Variables globales */
const arrIdsPersonnagesAPiger = new Array("e0001", "e0008", "e0015", "e0019");
const arrIdsObjetsAPiger = new Array("e0002", "e0004", "e0007", "e0021");
const arrIdsLieuxAPiger = new Array("e0005", "e0012", "e0016", "e0022");

//*************************
// Écouteurs d'événements 
//*************************
document.getElementById("btnDebuterChasse").addEventListener("click", demarrerChasse);
window.addEventListener("load", initialiser);

const refBoutonNouvelleChasse = document.getElementById("btnDemarrerNouvelleChasse");
const refLienCarte = document.getElementById("lienChercherIndices");
refBoutonNouvelleChasse.addEventListener("click", reactiverChasse);
//*************************
// Fonctions
//*************************

const refPersonnageTrouve = document.getElementById("personnageMessageTrouve");
const refObjetTrouve = document.getElementById("objetMessageTrouve");
const refLieuTrouve = document.getElementById("lieuMessageTrouve");


function demarrerChasse() {
    //Tirage au sort dans les tableaux des possibilités et mise en localStorage
    document.getElementById("messageEtatChasse").innerHTML = "Chasse en cours";
    document.getElementById("btnDebuterChasse").disabled = true;
    document.getElementById("zoneEnigme").removeAttribute('hidden');
    refBoutonNouvelleChasse.removeAttribute('hidden');
    refLienCarte.removeAttribute('hidden');
    
    let strIdPersonnage = arrIdsPersonnagesAPiger[Math.floor(Math.random() * arrIdsPersonnagesAPiger.length)];
    localStorage.id_personnage = strIdPersonnage;
    
    let strIdObjet = arrIdsObjetsAPiger[Math.floor(Math.random() * arrIdsObjetsAPiger.length)];
    localStorage.id_Objet = strIdObjet;
    
    let strIdLieux = arrIdsLieuxAPiger[Math.floor(Math.random() * arrIdsLieuxAPiger.length)];
    localStorage.id_Lieux = strIdLieux;
    
    document.getElementById("personnageSegment").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.INDICE;
    document.getElementById("objetSegment").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.INDICE;
    document.getElementById("lieuSegment").innerHTML = objJSONepigraphes[strIdLieux].CHASSE.INDICE;
    
    //affichage des indices
    document.getElementById("personnageIndice").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.INDICE;
    document.getElementById("objetIndice").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.INDICE;
    document.getElementById("lieuIndice").innerHTML = objJSONepigraphes[strIdLieux].CHASSE.INDICE;
    localStorage.personnage_est_trouve = "false";
    localStorage.objet_est_trouve = "false";
    localStorage.lieu_est_trouve = "false";
    
    refPersonnageTrouve.setAttribute("hidden", "")
    refObjetTrouve.setAttribute("hidden", "")
    refLieuTrouve.setAttribute("hidden", "")
    
    //affichage de (trouve) si la reponse est bonne
    const refReponsePersonnage = localStorage.id_personnage;
    if(localStorage.personnage_est_trouve === "true") {
        refPersonnageTrouve.removeAttribute ("hidden");
        document.getElementById("personnageIndice").innerHTML = objJSONepigraphes[refReponsePersonnage].CHASSE.REPONSE;
        
    }
    else {
        refPersonnageTrouve.setAttribute ("hidden", "");
        document.getElementById("personnageIndice").innerHTML = objJSONepigraphes[refReponsePersonnage].CHASSE.INDICE;
    }
    
    const refReponseObjet = localStorage.id_Objet;
    if(localStorage.objet_est_trouve === "true") {
        refObjetTrouve.removeAttribute ("hidden");
        document.getElementById("objetIndice").innerHTML = objJSONepigraphes[refReponseObjet].CHASSE.REPONSE;
    }
    else {
        refObjetTrouve.setAttribute ("hidden", "");
        document.getElementById("objetIndice").innerHTML = objJSONepigraphes[refReponseObjet].CHASSE.INDICE;
    }
    
    const refReponseLieu = localStorage.id_Lieux;
    if(localStorage.lieu_est_trouve === "true") {
        refLieuTrouve.removeAttribute ("hidden");
        document.getElementById("lieuIndice").innerHTML = objJSONepigraphes[refReponseLieu].CHASSE.REPONSE;
    }
    else {
        refLieuTrouve.setAttribute ("hidden", "");
        document.getElementById("lieuIndice").innerHTML = objJSONepigraphes[refReponseLieu].CHASSE.INDICE;
    }
    
    if (localStorage.personnage_est_trouve === "true" && localStorage.objet_est_trouve === "true" && localStorage.lieu_est_trouve === "true") {
        document.getElementById("zoneEnigme").removeAttribute('hidden');
        document.getElementById("messageEtatChasse").removeAttribute("hidden");
        document.getElementById("zoneMessageChasseCompletee").removeAttribute("hidden");
        refBoutonNouvelleChasse.setAttribute("hidden","");
        refLienCarte.setAttribute("hidden","");
        reactiverChasse();
        localStorage.clear();
    }
}

function initialiser() {
    if(localStorage.personnage_est_trouve = "true") {
            document.getElementById("messageEtatChasse").innerHTML = "Chasse en cours";
            document.getElementById("zoneEnigme").removeAttribute('hidden');
            let strIdPersonnage = arrIdsPersonnagesAPiger[Math.floor(Math.random() * arrIdsPersonnagesAPiger.length)];
            localStorage.id_personnage = strIdPersonnage;
            
            let strIdObjet = arrIdsObjetsAPiger[Math.floor(Math.random() * arrIdsObjetsAPiger.length)];
            localStorage.id_Objet = strIdObjet;
            
            let strIdLieux = arrIdsLieuxAPiger[Math.floor(Math.random() * arrIdsLieuxAPiger.length)];
            localStorage.id_Lieux = strIdLieux;
            
            document.getElementById("personnageSegment").innerHTML = objJSONepigraphes[strIdPersonnage].CHASSE.INDICE;
            document.getElementById("objetSegment").innerHTML = objJSONepigraphes[strIdObjet].CHASSE.INDICE;
            document.getElementById("lieuSegment").innerHTML = objJSONepigraphes[strIdLieux].CHASSE.INDICE;
            document.getElementById("messageEtatChasse").setAttribute("hidden","");
            document.getElementById("zoneMessageChasseCompletee").setAttribute("hidden","");
        }
    
}

// Reactivation du bouton "Commencer la chasse"
function reactiverChasse() {
    document.getElementById("btnDebuterChasse").disabled = false;
}