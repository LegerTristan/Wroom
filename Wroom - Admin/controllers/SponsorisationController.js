let model = require('../models/sponsorisation.js');
let modelFinance = require('../models/finance.js');
let async = require('async');

   // //////////////////////// GESTION DES SPONSORISATIONS

module.exports.Gestion = function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        response.title = 'Gestion des sponsorisations';
        model.getInfoSponsorisation( function (err, result) {
            if (err) {

                console.log(err);
                return;
            }
            response.gestion = result;
            response.render('gestionSponsorisations', response);
        });
    }
}

// ///////////////////////// AJOUTER UN SPONSORISE (AFFICHAGE)

module.exports.Ajouter = function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        async.parallel([
            function(callback){
                modelFinance.getSponsors(function (err, result) {callback(null, result); });
            },
            function(callback){
                model.getPilotes(function (errPil, resultPil) {callback(null, resultPil)});
            },
        ],
        function(err, result){
            if(err){
                console.log(err)
                return;
            }
            
            response.sponsors = result[0];
            response.pilotes = result[1];
         
            response.render('addSponsorisation', response)
        })
    }
};
 
/////////////////////////////// AJOUTER UNE SPONSORISATION (SQL)

module.exports.AjoutSQL = function(request, response){

    let formulaire = request.body;  

    model.verifySponso(formulaire, function (err, result) {
        if (err) {

            console.log(err);
            return;
        }
        
        let resultat = result;

        if(resultat[0] != null){
            response.redirect('/gestSponsorisations');
        }
        else{
            model.addNewSponso(formulaire, function (err, result) {
                if (err) {
        
                    console.log(err);
                    return;
                }
                
                response.redirect('/gestSponsorisations');
            })  
        }
    });
};

//////////////////////////// SUPPRIMMER UNE SPONSORISATION (SQL)

module.exports.Supprimer = 	function(request, response){
    let idDuSponsor = request.params.sponum;
    let idDuPilote = request.param('pilnum');
    
    model.suppLienSponso(idDuSponsor, idDuPilote, function (err, result) {
        if (err) {

            console.log(err);
            return;
        }
        
        response.redirect('/gestSponsorisations');
    })
};