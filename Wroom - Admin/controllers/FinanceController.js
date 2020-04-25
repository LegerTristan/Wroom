let model = require('../models/finance.js');
let modelPilote = require('../models/pilote.js');
let async = require('async');

   // //////////////////////// GESTION DES FINANCES

    module.exports.Gestion = function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        response.title = 'Gestion des finances';
        model.getInfoFinance( function (err, result) {
            if (err) {

                console.log(err);
                return;
            }
            response.gestion = result;
            response.render('gestionFinances', response);
        });
    }
}

// ///////////////////////// AJOUTER UNE FINANCE (AFFICHAGE)

module.exports.Ajouter = function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        async.parallel([
            function(callback){
                model.getSponsors(function (err, result) {callback(null, result); });
            },
            function(callback){
                modelPilote.getEcuries(function (errPil, resultPil) {callback(null, resultPil)});
            },
        ],
        function(err, result){
            if(err){
                console.log(err)
                return;
            }
            
            response.sponsors = result[0];
            response.ecuries = result[1];
         
            response.render('addFinance', response)
        })
    }
};
 
/////////////////////////////// AJOUTER UNE FINANCE (SQL)

module.exports.AjoutSQL = function(request, response){

    let formulaire = request.body;  

    model.verifyFinance(formulaire, function (err, result) {
        if (err) {

            console.log(err);
            return;
        }
        
        let resultat = result;

        if(resultat[0] != null){
            response.redirect('/gestFinances');
        }
        else{
            model.addNewFinance(formulaire, function (err, result) {
                if (err) {
        
                    console.log(err);
                    return;
                }
                
                response.redirect('/gestFinances');
            })  
        }
    });
};

//////////////////////////// SUPPRIMMER UNE FINANCE (SQL)

module.exports.Supprimer = 	function(request, response){
    let idDuSponsor = request.params.sponum;
    let idEcurie = request.param('ecunum');
    
    model.suppLienFinance(idDuSponsor, idEcurie, function (err, result) {
        if (err) {

            console.log(err);
            return;
        }
        
        response.redirect('/gestFinances');
    })
};