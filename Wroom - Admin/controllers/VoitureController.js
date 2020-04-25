let model = require('../models/voiture.js');
let modelPilote = require('../models/pilote.js');
let async = require('async');

///////////////////////////// GESTION DES VOITURES

module.exports.Gestion = function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        response.title = 'Gestion des voitures';
        model.getMainInfoVoiture( function (err, result) {
            if (err) {

                console.log(err);
                return;
            }
            response.gestion = result;
            response.render('gestionVoitures', response);
        });
    }
}

// ///////////////////////// AJOUTER UNE VOITURE (AFFICHAGE)

module.exports.Ajouter = function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        async.parallel([
            function(callback){
                modelPilote.getEcuries(function (err, result) {callback(null, result); });
            },
            function(callback){
                model.getTypeVoitures(function (errPil, resultPil) {callback(null, resultPil)});
            },
        ],
        function(err, result){
            if(err){
                console.log(err)
                return;
            }
            
            response.ecuries = result[0];
            response.typeVoitures = result[1];
         
            response.render('addVoiture', response)
        })
    }
};

/////////////////////////////// AJOUTER UNE VOITURE (SQL)

module.exports.AjoutSQL = function(request, response){

    let formulaire = request.body;

    let fileImage = request.files.voiadresseimage;
    fileImage.mv('../Wroom - Admin/public/image/ecurie/voiture/' + fileImage.name);
    fileImage.mv('../Wroom/public/image/ecurie/voiture/' + fileImage.name);
    formulaire.voiadresseimage = fileImage.name;

    model.addNewVoiture(formulaire, function (err, result) {
        if (err) {
        
            console.log(err);
                return;
        }
    })
    
    response.redirect('/gestVoitures');
};

//////////////////////////// SUPPRIMMER UNE SPONSORISATION (SQL)

module.exports.Supprimer = 	function(request, response){
    let idEcurie = request.params.ecunum;
    let idVoiture = request.param('voinum');
    
    model.suppLienVoiture(idEcurie, idVoiture, function (err, result) {
        if (err) {

            console.log(err);
            return;
        }
        
        response.redirect('/gestVoitures');
    })
};