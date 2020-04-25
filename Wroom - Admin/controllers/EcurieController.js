let model = require('../models/ecurie.js');
let modelCircuit = require('../models/circuit.js');
let async = require('async');

///////////////////////////// GESTION DES ECURIES

module.exports.Gestion = function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        response.title = 'Gestion des écuries';
        model.getMainInfoEcurie( function (err, result) {
            if (err) {

                console.log(err);
                return;
            }
            response.gestion = result;
            response.render('gestionEcuries', response);
        });
    }
}

// ///////////////////////// AJOUTER UNE ECURIE (AFFICHAGE)

module.exports.Ajouter = 	function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        response.title = 'Ajouter une écurie';
        async.parallel([
            function(callback){
                model.getFPneu(function (errPil, resultPil) {callback(null, resultPil)});
            },
            function(callback){
                model.getTypeVoiture(function (errPil, resultPil) {callback(null, resultPil)});
            },
            function(callback){
                modelCircuit.getPays(function (err, result) {callback(null, result)});
            },
        ],
        function(err, result){
            if(err){
                console.log(err)
                return;
            }

            response.fpneu = result[0];
            response.typeVoiture = result[1];
            response.pays = result[2];
            response.render('addEcurie', response)
        })
    }
};

//////////////////////////// MODIFIER UNE ECURIE (AFFICHAGE)
 
 module.exports.Modifier = 	function(request, response){

    if(request.session.connecte == false || request.session.connecte == null){
        response.redirect('/connexion');
    }
    else{
        let data = request.params.ecunum;
        request.session.ecunum = request.params.ecunum;

        async.parallel([
            function(callback){
                model.getInfoOfAnEcurie(data, function (err, result) {callback(null, result); });
            },
            function(callback){
                model.getInfoOfAVoiture(data, function (err, result) {callback(null, result); });
            },
            function(callback){
                model.getFPneu(function (errPil, resultPil) {callback(null, resultPil)});
            },
            function(callback){
                model.getTypeVoiture(function (errPil, resultPil) {callback(null, resultPil)});
            },
            function(callback){
                modelCircuit.getPays(function (err, result) {callback(null, result)});
            },
        ],
        function(err, result){
            if(err){
                console.log(err)
                return;
            }

            response.infos = result[0][0];
            response.infosVoiture = result[1][0];
            response.fpneu = result[2];
            response.typeVoiture = result[3];
            response.pays = result[4];
            response.title = 'Modifier une écurie';
            response.render('editEcurie', response);
        })
    }
 };

  ///////////////////////////// AJOUTER UNE ECURIE (SQL)

module.exports.AjoutSQL = function(request, response){

    let formulaire = request.body;
    let fileEcurie = request.files.ecuadresseimage;
    let fileVoiture = request.files.voiadresseimage;

    formulaire.ecuadresseimage = fileEcurie.name;
    formulaire.voiadresseimage = fileVoiture.name;

    fileEcurie.mv('../Wroom - Admin/public/image/ecurie/' + fileEcurie.name);
    fileEcurie.mv('../Wroom/public/image/ecurie/' + fileEcurie.name);

    fileVoiture.mv('../Wroom - Admin/public/image/ecurie/voiture/' + fileVoiture.name);
    fileVoiture.mv('../Wroom/public/image/ecurie/voiture/' + fileVoiture.name);

    response.title = 'Gestion des Ecuries';

    async.parallel([
        function(callback){
            model.addNewEcurie(formulaire, (function (err, result) {callback(null, result); }));
        },
        function(callback){
            model.getMainInfoEcurie(function (errPil, resultPil) {callback(null, resultPil)});
        },
    ],
    function(err, result){
        if(err){
            console.log(err)
            return;
        }
        response.gestion = result[1];
        response.render('gestionEcuries', response)
    }) 
};
 
///////////////////////////// MODIFIER UNE ECURIE (SQL)

module.exports.ModifierSQL = function(request, response){

    let formulaire = request.body;
    let idEcurie = request.session.ecunum;
    let fileEcurie = request.files.ecuadresseimage;
    let fileVoiture = request.files.voiadresseimage;

    fileEcurie.mv('../Wroom - Admin/public/image/ecurie/' + fileEcurie.name);
    fileEcurie.mv('../Wroom/public/image/ecurie/' + fileEcurie.name);

    fileVoiture.mv('../Wroom - Admin/public/image/ecurie/voiture/' + fileVoiture.name);
    fileVoiture.mv('../Wroom/public/image/ecurie/voiture/' + fileVoiture.name);

    async.parallel([
        function(callback){
            model.modifyEcurie(formulaire, idEcurie, (function (err, result) {callback(null, result); }));
        },
        function(callback){
            model.modifyVoiture(formulaire, idEcurie, (function (err, result) {callback(null, result); }));
        },
        function(callback){
            model.getMainInfoEcurie(function (errPil, resultPil) {callback(null, resultPil)});
        },
    ],
    function(err, result){
        if(err){
            console.log(err)
            return;
        }
        response.gestion = result[1];
        response.redirect('/gestEcuries');
    }) 
};

//////////////////////////// SUPPRIMMER UNE ECURIE (SQL)

module.exports.Supprimer = 	function(request, response){
    let idEcurie = request.params.ecunum;
    
    async.parallel([
        function(callback){
           model.suppVoiture(idEcurie, (function (err, result) {callback(null, result); }));
        },
       function(callback){
           model.suppEcurie(idEcurie, (function (err, result) {callback(null, result); }));
       },
       function(callback){
           model.getMainInfoEcurie(function (errPil, resultPil) {callback(null, resultPil)});
       },
   ],
   function(err, result){
        if(err){
           console.log(err)
           return;
        }
        response.gestion = result[1];
        response.redirect('/gestEcuries');
   }
   )
};