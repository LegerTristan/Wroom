let model = require('../models/pilote.js');
let async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des pilotes';
   model.getFirstNameLetter( function (err, result) {
      if (err) {
          console.log(err);
          return;
      }
      response.repertoire = result;

      response.render('repertoirePilotes', response);
  })};

// ///////////////////////// NOM DES PILOTES

module.exports.PrenomNomPilote = 	function(request, response){
   let data = request.params.initial;
   response.title = 'Pilote dont le nom commence par ' + data;
   async.parallel([
       function(callback){
           model.getFirstNameLetter(function (err, result) {callback(null, result); });
       },
       function(callback){
           model.getMainInfoPilote(data, (function (errPil, resultPil) {callback(null, resultPil)}));
       },
   ],
   function(err, result){
       if(err){
           console.log(err)
           return;
       }
        response.repertoire = result[0];
        response.data = result[1];
        response.render('nomPilote', response)
   }
   )
};

// ///////////////////////// FICHE D'UN PILOTE

module.exports.FichePilote = 	function(request, response){
    let data = request.params.pilnum;
    async.parallel([
        function(callback){
            model.getFirstNameLetter(function (err, result) {callback(null, result); });
        },
        function(callback){
            model.getInfoFichePilote(data, (function (errPil, resultFiche) {callback(null, resultFiche)}));
        },
        function(callback){
            model.getSponsorPilote(data, (function (errPil, resultSponsor) {callback(null, resultSponsor)}));
        },
        function(callback){
            model.getTextPilote(data, (function (errPil, resultText) {callback(null, resultText)}));
        },
        function(callback){
            model.getPhotoPilote(data, (function (errPil, resultPhoto) {callback(null, resultPhoto)}));
        },
    ],
    function(err, result){
        if(err){
            console.log(err)
            return;
        }

        response.repertoire = result[0];
        response.infoPilote = result[1];
        response.sponsor = result[2];
        response.text = result[3];
        response.photos = result[4];
        response.title = result[1][0].pilnom + " " +  result[1][0].pilprenom;
        response.render('detailPilote', response);
    }
    )
 };
