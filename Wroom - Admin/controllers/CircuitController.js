let model = require('../models/circuit.js');
let async = require('async');

// ///////////////////////// GESTION DES CIRCUITS

module.exports.Gestion = function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        response.title = 'Gestion des circuits';
        model.getMainInfoCircuit( function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.gestion = result;
            response.render('gestionCircuits', response);
        })
    }
};
 
////////////////////////////// AJOUTER UN CIRCUIT (AFFICHAGE)
 
 module.exports.Ajouter = 	function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        response.title = 'Ajouter un circuit';
        model.getPays( function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.pays = result;
            response.render('addCircuit', response)
        })
    }
 };
 
///////////////////////////// MODIFIER UN CIRCUIT (AFFICHAGE)
 
 module.exports.Modifier = 	function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        let idDuCircuit = request.params.cirnum;
        request.session.cirnum = idDuCircuit;

        async.parallel([
            function(callback){
                model.getInfoOfACircuit(idDuCircuit, (function (errPil, resultText) {callback(null, resultText)}));
            }, 
            function(callback){
                model.getPays(function (errPil, resultPhoto) {callback(null, resultPhoto)});
            },
        ],
        function(err, result){
            if(err){
                console.log(err)
                return;
            }
    
            response.infos = result[0][0];
            response.pays = result[1];
            response.title = 'Modifier un circuit';
            response.render('editCircuit', response);
        })
    }
  };

//  ///////////////////////////// AJOUTER UN CIRCUIT (SQL)

module.exports.AjoutSQL = function(request, response){

    let formulaire = request.body;
    let fileCircuit = request.files.ciradresseimage;

    fileCircuit.mv('../Wroom - Admin/public/image/circuit/' + fileCircuit.name);
    fileCircuit.mv('../Wroom/public/image/circuit/' + fileCircuit.name);

    formulaire.ciradresseimage = fileCircuit.name;
    response.title = 'Gestion des circuits';

    async.parallel([
        function(callback){
           model.addNewCircuit(formulaire, (function (err, result) {callback(null, result); }));
        },
        function(callback){
           model.getMainInfoCircuit(function (errPil, resultPil) {callback(null, resultPil)});
        },
    ],
    function(err, result){
        if(err){
           console.log(err)
           return;
        }

        response.gestion = result[1];
    
        response.render('gestionCircuits', response)
   }
   )
};

///////////////////////////// MODIFIER UN CIRCUIT (SQL)

module.exports.ModifierSQL = function(request, response){

    let formulaire = request.body;
    let idCircuit = request.session.cirnum;

    async.parallel([
        function(callback){
            model.modifyCircuit(formulaire, idCircuit, (function (err, result) {callback(null, result); }));
        },
        function(callback){
            model.getMainInfoCircuit(function (errPil, resultPil) {callback(null, resultPil)});
        },
    ],
    function(err, result){
        if(err){
            console.log(err)
            return;
        }
        response.gestion = result[1];
        response.redirect('/gestCircuits');
    }) 
};

//////////////////////////// SUPPRIMMER UN CIRCUIT (SQL)

module.exports.Supprimer = 	function(request, response){
    let idCircuit = request.params.cirnum;
    
    async.parallel([
        function(callback){
            model.suppCircuit(idCircuit, (function (err, result) {callback(null, result); }));
        },
        function(callback){
            model.getMainInfoCircuit(function (errPil, resultPil) {callback(null, resultPil)});
        },
    ],
    function(err, result){
        if(err){
           console.log(err)
           return;
        }
        response.gestion = result[1];
        response.redirect('/gestCircuits');
   })
};