// Fonctions utilitaires

/**
 * Obtenir la valeur d'un des paramètres (QueryParam) dans l'URL
 * @param {string} strParam - Nom du paramètre à rechercher dans l'URL
 * @returns {string} - Valeur correspondant au paramètre.
 *                     Retourne null lorsqu'aucune valeur n'est trouvée.
 */
function obtenirValeurUrlParam(strParam) {
    return new URLSearchParams(window.location.search).get(strParam);
}

/* Variables globales */

window.addEventListener("load", initialiser);
document.getElementById("btnSoumettre").addEventListener("click", validerPieceConviction);

function initialiser() {
    let intIdFicheCourante = obtenirValeurUrlParam("id");

    document.querySelectorAll("#prenom").forEach((element) => {element.textContent = objJSONepigraphes[intIdFicheCourante].PRENOM;});
    document.getElementById("nom").innerHTML = objJSONepigraphes[intIdFicheCourante].NOM;

    document.querySelector("section > p").innerHTML = objJSONepigraphes[intIdFicheCourante].DOMAINE;

    document.getElementById("url_image").setAttribute("src", "../images/" + objJSONepigraphes[intIdFicheCourante].SUFFIXE_IMAGES +".jpg");
    document.getElementById("titre_image").innerHTML = objJSONepigraphes[intIdFicheCourante].IMAGE.TITRE;
    document.getElementById("credit_image").innerHTML = objJSONepigraphes[intIdFicheCourante].IMAGE.CREDIT;

    document.getElementById("notes_biographiques").innerHTML = objJSONepigraphes[intIdFicheCourante].BIOGRAPHIE;

    document.getElementById("carteZoom").setAttribute("src", "../images/zoomgooglemap_" + objJSONepigraphes[intIdFicheCourante].SUFFIXE_IMAGES + ".png",);
    document.getElementById("arrondissement").innerHTML = objJSONepigraphes[intIdFicheCourante].ARRONDISSEMENT;
    document.getElementById("quartier").innerHTML = objJSONepigraphes[intIdFicheCourante].QUARTIER;
    document.getElementById("adresse").innerHTML = objJSONepigraphes[intIdFicheCourante].ADRESSE;

    document.getElementById("url_plaque").setAttribute("src", "../images/plaque_" + objJSONepigraphes[intIdFicheCourante].SUFFIXE_IMAGES + ".png",);
    document.getElementById("url_plaque").setAttribute("alt", "Épigraphe de " + objJSONepigraphes[intIdFicheCourante].PRENOM + " " + objJSONepigraphes[intIdFicheCourante].NOM,);
    document.getElementById("transcript").innerHTML = objJSONepigraphes[intIdFicheCourante].PLAQUE_TRANSCRIPTION;

    document.getElementById("audio_url").setAttribute("src", objJSONepigraphes[intIdFicheCourante].AUDIO.URL);
    document.getElementById("audio_preambule").innerHTML = objJSONepigraphes[intIdFicheCourante].AUDIO.DESCRIPTION;
    document.getElementById("audio_transcription").innerHTML = objJSONepigraphes[intIdFicheCourante].AUDIO.TRANSCRIPTION;
    document.getElementById("audio_credit").innerHTML = objJSONepigraphes[intIdFicheCourante].AUDIO.CREDIT;
}

function validerPieceConviction() {
    console.log("la fonction validerPieceConviction est appelée!");
    const refRadioCoche = document.querySelector('[name="formChasse"]:checked');
    console.log(refRadioCoche); //Cette ref du sélectionné permettra d'aller chercher le value
    const refMessage = document.getElementById("message"); //Ref du message pour donner notre rétroaction à l'utilisateur s'il a ou non la bonne réponse!

    let intIdFicheCourante = obtenirValeurUrlParam("id");

    let strIdPersonnage = localStorage.getItem("id_personnage");
    let strIdObjet = localStorage.getItem("id_objet");
    let strIdLieu = localStorage.getItem("id_lieu");

    if (!refRadioCoche) {
        refMessage.innerText = "Veuillez sélectionner un élément.";
        return;
    }

    if (localStorage.getItem("chasse_commencer") === "false") {
        refMessage.innerText = "Aucune chasse en cours. Si vous désirez débuter une chasse, visitez la page <Chasse>.";

        return
    }

    if (refRadioCoche.value === objJSONepigraphes[intIdFicheCourante].CHASSE.CATEGORIE) {
        if (localStorage.getItem(`${objJSONepigraphes[intIdFicheCourante].CHASSE.CATEGORIE}_est_trouve`) === "false") {
            refMessage.innerText = "";
            refMessage.innerText = "Bravo! Vous avez trouvé " + objJSONepigraphes[intIdFicheCourante].CHASSE.REPONSE;
            localStorage.setItem(`${objJSONepigraphes[intIdFicheCourante].CHASSE.CATEGORIE}_est_trouve`, "true");
        } 
        
        else {
            refMessage.innerText = `Vous avez déjà trouvé ce ${objJSONepigraphes[intIdFicheCourante].CHASSE.CATEGORIE}`;
        }

        return;
    } 
    
    else {
        refMessage.innerText = "Désolé. Ce n'est pas le bon élément.";
    }

    if (localStorage.getItem("personnage_est_trouve") === "true") {
        document.getElementById("personnageMessageTrouve").hidden = false;
        document.getElementById("personnageIndice").innerHTML = objJSONepigraphes[intIdFicheCourante].CHASSE.REPONSE;
    }

    if (localStorage.getItem("objet_est_trouve") === "true") {
        document.getElementById("objetMessageTrouve").hidden = false;
        document.getElementById("objetIndice").innerHTML = objJSONepigraphes[intIdFicheCourante].CHASSE.REPONSE;
    }

    if (localStorage.getItem("lieu_est_trouve") === "true") {
        document.getElementById("lieuMessageTrouve").hidden = false;
        document.getElementById("lieuIndice").innerHTML = objJSONepigraphes[intIdFicheCourante].CHASSE.REPONSE;
    }

    /*Vérifications à faire:
            -Je veux comparer ma fiche actuelle en querystring avec la bonne réponse en localStorage
            -Voir la page 3 de l'énoncé pdf pour savoir les rétroactions à afficher selon les situations!
            - pour lire dans le localStorage : localStorage.getItem(id_personnage).*/
    console.log(localStorage.getItem("id_personnage"));
}
