let model = require('../models/resultat.js');
let async = require('async');

////////////////////////////// LISTER  GRAND PRIX
module.exports.ListerGrandPrix = function(request, response){

	model.getListeGrandPrix( function (err, result) {
		if (err) {
			console.log(err);
			return;
		}
		response.listeGP = result;

	response.title = 'Liste des résulats des grands prix';

	response.render('listerResultat', response);
})};

//////////////////////////// FICHE D'UN GRAND PRIX

module.exports.FicheGP = 	function(request, response){
	let idDuGP = request.params.gpnum;
    async.parallel([
        function(callback){
            model.getListeGrandPrix(function (errRes, resultListe) {callback(null, resultListe)});
        },
        function(callback){
            model.getInfoFicheGP(idDuGP, (function (errRes, resultFiche) {callback(null, resultFiche)}));
		},
		function(callback){
            model.getPiloteCourse(idDuGP, (function (errRes, resultFiche) {callback(null, resultFiche)}));
		},
		function(callback){
            model.getNbPilotes(idDuGP, function (errRes, resultFiche) {callback(null, resultFiche)});
		},
	],
    function(err, result){
        if(err){
            console.log(err)
            return;
		}
		response.listeGP = result[0];
		response.infoGP = result[1][0];
		response.piloteCourse = result[2];
		let nb = result[3][0].nb;
		
		model.getPoints(nb, function (err, resultat) {
			if (err) {
				console.log(err);
				return;
			}
			
			response.points = resultat;
			response.title = result[1][0].gpnom;
			response.render('detailGP', response);
		})
    })
 }