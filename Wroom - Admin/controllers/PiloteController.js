let model = require('../models/pilote.js');
let async = require('async');

// ///////////////////////// GESTION DES PILOTES

module.exports.Gestion = function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        response.title = 'Gestion des pilotes';
        model.getMainInfoPilote( function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.gestion = result;
            response.render('gestionPilotes', response);
        })
    }
};

// ///////////////////////// AJOUTER UN PILOTE (AFFICHAGE)

module.exports.Ajouter = 	function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        response.title = 'Ajouter un Pilote';
        async.parallel([
            function(callback){
                model.getNationalites(function (err, result) {callback(null, result); });
            },
            function(callback){
                model.getEcuries(function (errPil, resultPil) {callback(null, resultPil)});
            },
        ],
        function(err, result){
            if(err){
                console.log(err)
                return;
            }
            response.nationalites = result[0];
            response.ecuries = result[1];
            response.render('addPilote', response)
        })
    }
};

// ///////////////////////// MODIFIER UN PILOTE (AFFICHAGE)

module.exports.Modifier = 	function(request, response){
    let idDuPilote = request.params.pilnum;
    request.session.pilnum = request.params.pilnum;

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        async.parallel([
            function(callback){
                model.getInfoOfAPilote(idDuPilote, function (err, result) {callback(null, result); });
            },
            function(callback){
                model.getInfoOfAPhoto(idDuPilote, function (err, result) {callback(null, result); });
            },
            function(callback){
                model.getEcuries(function (errPil, resultFiche) {callback(null, resultFiche)});
            },
            function(callback){
                model.getNationalites(function (errPil, resultFiche) {callback(null, resultFiche)});
            },
        ],
        function(err, result){
            if(err){
                console.log(err)
                return;
            }

            response.infos = result[0][0];
            response.infosPhoto = result[1][0];
            response.ecuries = result[2];
            response.nationalites = result[3];
            response.title = 'Modifier un Pilote';
            response.render('editPilote', response);
        })
    }
 };

///////////////////////////// AJOUTER UN PILOTE (SQL)

module.exports.AjoutSQL = function(request, response){

    let formulaire = request.body;

    let filePhoto = request.files.phoadresse;
    filePhoto.mv('../Wroom - Admin/public/image/pilote/' + filePhoto.name);
    filePhoto.mv('../Wroom/public/image/pilote/' + filePhoto.name);
    formulaire.phoadresse = filePhoto.name;

    response.title = 'Gestion des Pilotes';

    async.parallel([
        function(callback){
            model.addNewPilote(formulaire, (function (err, result) {callback(null, result); }));
        },
        function(callback){
            model.getMainInfoPilote(function (errPil, resultPil) {callback(null, resultPil)});
        },
    ],
    function(err, result){
        if(err){
            console.log(err)
            return;
        }
         response.gestion = result[1];
         response.render('gestionPilotes', response)
    }) 
};

///////////////////////////// MODIFIER UN PILOTE (SQL)

module.exports.ModifierSQL = function(request, response){

    let formulaire = request.body;
    let idDuPilote = request.session.pilnum;

    async.parallel([
        function(callback){
            model.modifyPilote(formulaire, idDuPilote, (function (err, result) {callback(null, result); }));
        },
        function(callback){
            model.modifyPhoto(formulaire, idDuPilote, (function (err, result) {callback(null, result); }));
        },
        function(callback){
            model.getMainInfoPilote(function (errPil, resultPil) {callback(null, resultPil)});
        },
    ],
    function(err, result){
        if(err){
            console.log(err)
            return;
        }
        response.gestion = result[2];
        response.redirect('/gestPilotes');
    }) 
};

//////////////////////////// SUPPRIMMER UN PILOTE (SQL)

module.exports.Supprimer = 	function(request, response){
    let idDuPilote = request.params.pilnum;
    
    async.parallel([
        function(callback){
            model.suppPilote(idDuPilote, (function (err, result) {callback(null, result); }));
        },
        function(callback){
            model.suppPhoto(idDuPilote, (function (err, result) {callback(null, result); }));
        },
        function(callback){
            model.getMainInfoPilote(function (errPil, resultPil) {callback(null, resultPil)});
        },
    ],
    function(err, result){
        if(err){
           console.log(err)
           return;
        }
        response.gestion = result[2];
        response.redirect('/gestPilotes');
   }
   )
};