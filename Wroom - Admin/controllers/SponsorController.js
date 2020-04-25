let model = require('../models/sponsor.js');
let modelPilote = require('../models/pilote.js');
let async = require('async');

   // //////////////////////// GESTION DES SPONSORS

module.exports.Gestion = function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        response.title = 'Gestion des sponsors';
        model.getMainInfoSponsor( function (err, result) {
            if (err) {

                console.log(err);
                return;
            }
            response.gestion = result;
            response.render('gestionSponsors', response);
        });
    }
}

// ///////////////////////// AJOUTER UN SPONSOR (AFFICHAGE)

module.exports.Ajouter = 	function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        response.title = 'Ajouter un sponsor';
        modelPilote.getEcuries( function (err, result) {
            if (err) {

                console.log(err);
                return;
            }
            response.ecuries = result;
            response.render('addSponsor', response)
        })
    }
 };
 
// ///////////////////////// MODIFIER UN SPONSOR (AFFICHAGE)

module.exports.Modifier = 	function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        let data = request.params.sponum;
        request.session.sponum = request.params.sponum;

        async.parallel([
            function(callback){
                model.getInfoOfASponsor(data, function (err, result) {callback(null, result); });
            },
            function(callback){
                modelPilote.getEcuries(function (errPil, resultFiche) {callback(null, resultFiche)});
            },
        ],
        function(err, result){
            if(err){
                console.log(err)
                return;
            }

            response.infos = result[0][0];
            response.ecuries = result[1];
            response.title = 'Modifier un Sponsor';
            response.render('editSponsor', response);
        })
    }
 };
 
/////////////////////////////// AJOUTER UN SPONSOR (SQL)

module.exports.AjoutSQL = function(request, response){

    let formulaire = request.body;  
    response.title = 'Gestion des Sponsors';

    async.parallel([
        function(callback){
            model.addNewSponsor(formulaire, (function (err, result) {callback(null, result); }));
        },
        function(callback){
            model.getMainInfoSponsor(function (errPil, resultPil) {callback(null, resultPil)});
        },
    ],
    function(err, result){
        if(err){
            console.log(err)
            return;
        }

         response.gestion = result[1];
     
         response.render('gestionSponsors', response)
    }
    )
};

///////////////////////////// MODIFIER UN SPONSOR (SQL)

module.exports.ModifierSQL = function(request, response){

    let formulaire = request.body;
    let idDuSponsor = request.session.sponum;

    async.parallel([
        function(callback){
            model.modifySponsor(formulaire, idDuSponsor, (function (err, result) {callback(null, result); }));
        },
        function(callback){
            model.modifyFinance(formulaire, idDuSponsor, (function (err, result) {callback(null, result); }));
        },
        function(callback){
            model.getMainInfoSponsor(function (errPil, resultPil) {callback(null, resultPil)});
        },
    ],
    function(err, result){
        if(err){
            console.log(err)
            return;
        }
         response.gestion = result[1];
         
         response.redirect('/gestSponsors');
    }) 
};

//////////////////////////// SUPPRIMMER UN SPONSOR (SQL)

module.exports.Supprimer = 	function(request, response){
    let idDuSponsor = request.params.sponum;
    
    async.parallel([
       function(callback){
           model.suppSponsor(idDuSponsor, (function (err, result) {callback(null, result); }));
       },
       function(callback){
            model.suppFinance(idDuSponsor, (function (err, result) {callback(null, result); }));
        },
   ],
   function(err, result){
       if(err){
           console.log(err)
           return;
        }
    
        response.redirect('/gestSponsors');
   })
};