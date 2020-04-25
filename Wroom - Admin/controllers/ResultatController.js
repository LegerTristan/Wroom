let model = require('../models/resultat.js');
let async = require('async');

////////////////////////////// LISTER GRAND PRIX

module.exports.SelectionGrandPrix = function(request, response){

	if(request.session.connecte == false || request.session.connecte == null){
		response.redirect('/connexion');
	}
	else{
		model.getListeGrandPrix( function (err, result) {
			if (err) {
				console.log(err);
				return;
			}
			response.choix = result;
			response.title = 'Séléctionner un grand prix';
			response.render('selectionGP', response);
		})
	}
};

////////////////////////////// SAISIE DES RÉSULTATS (AFFICHAGE)

module.exports.AffichageSaisie = function(request, response){

	if(request.session.connecte == false || request.session.connecte == null ){
		response.redirect('/connexion');
	}
	else{
		response.title = 'Saisie des résultats';

		let idDuGP = request.body.gpnum;
		request.session.gpnum = idDuGP;

		async.parallel([
			function(callback){
				model.getPiloteCourse(idDuGP, (function (errRes, resultFiche) {callback(null, resultFiche)}));
			},
			function(callback){
				model.getNbPilotes(idDuGP, (function (errRes, resultFiche) {callback(null, resultFiche)}));
			},
			function(callback){
				model.getAllOtherPilotes(idDuGP, (function (errRes, resultFiche) {callback(null, resultFiche)}));
			},
		],
		function(err, result){
			if(err){
				
				console.log(err)
				return;
			}

			response.piloteCourse = result[0];
			let nb = result[1][0].nb;
			response.otherPilotes = result[2];

			model.getPoints(nb, function (err, resultat) {
				if (err) {
					console.log(err);
					return;
				}
				
				response.points = resultat;

				response.render('saisieResultat', response);
			})
		})
		
	}
};

////////////////////////////// SUPPRIMER UN PILOTE D'UN GRAND PRIX

module.exports.SupprimerPilote = function(request, response){

	response.title = 'Saisie des résultats';

	let idDuPilote = request.params.pilnum;
	let idDuGP = request.session.gpnum;

	async.parallel([
		function(callback){
			model.getGPScoreForEachPilote(idDuGP, (function (errRes, resultFiche) {callback(null, resultFiche)}));
		},
		function(callback){
			model.suppPiloteGP(idDuPilote, idDuGP, (function (errRes, resultFiche) {callback(null, resultFiche)}));
		},
		function(callback){
			model.getPiloteCourse(idDuGP, (function (errRes, resultFiche) {callback(null, resultFiche)}));
		},
		function(callback){
			model.getNbPilotes(idDuGP, (function (errRes, resultFiche) {callback(null, resultFiche)}));
		},
		function(callback){
			model.getAllOtherPilotes(idDuGP, (function (errRes, resultFiche) {callback(null, resultFiche)}));
		},
		function(callback){
			model.getGPScoreForEachPilote(idDuGP, (function (errRes, resultFiche) {callback(null, resultFiche)}));
		},
	],
	function(err, result){
		if(err){
			
			console.log(err)
			return;
		}

		response.piloteCourse = result[2];
		let nb = result[3][0].nb;
		response.otherPilotes = result[4];

		model.getPoints(nb, function (err, resultat) {
			if (err) {
				console.log(err);
				return;
			}
			
			response.points = resultat;
			CalculerScore(result[0], result[5]);
			response.render('saisieResultat', response);
		})
	})
};

////////////////////////////// AJOUTER UN PILOTE A UN GRAND PRIX

module.exports.AjouterPilote = function(request, response){

	let formulaire = request.body;

	if(formulaire.tempscourse == ''){

		response.redirect('/selectionGP');
	}
	else{

		let idDuGP = request.session.gpnum;

		async.parallel([
			function(callback){
				model.getGPScoreForEachPilote(idDuGP, (function (errRes, resultFiche) {callback(null, resultFiche)}));
			},
			function(callback){
				model.addPiloteGP(idDuGP, formulaire, (function (err, resultat) {callback(null, resultat)}));
			},
			function(callback){
				model.getGPScoreForEachPilote(idDuGP, (function (errRes, resultFiche) {callback(null, resultFiche)}));
			},
		],
		function(err, result){
			if(err){
				
				console.log(err)
				return;
			}

			CalculerScore(result[0], result[2]);

			response.redirect('/selectionGP');
		})
	}
};

////////////////////////////// CALCUL DES SCORES DES PARTICIPANTS DE CE GRAND PRIX

function CalculerScore(oldRsltt, newRsltt){

	hmPiloteScore = {};
	hmEcurieScore = {};

	for(i = 0; i < newRsltt.length; i++){

		hmPiloteScore[newRsltt[i].pilnum] = newRsltt[i].pilpoints + newRsltt[i].ptnbpointsplace;
		hmEcurieScore[newRsltt[i].ecunum] = newRsltt[i].ecupoints;
	}

	for(j = 0; j < oldRsltt.length; j++){

		if(hmPiloteScore[oldRsltt[j].pilnum] != null){
			hmPiloteScore[oldRsltt[j].pilnum] = hmPiloteScore[oldRsltt[j].pilnum] - oldRsltt[j].ptnbpointsplace;
		}
		else{
			hmPiloteScore[oldRsltt[j].pilnum] = oldRsltt[j].pilpoints - oldRsltt[j].ptnbpointsplace;
			hmEcurieScore[oldRsltt[i].ecunum] = oldRsltt[i].ecupoints;
		}	
	}

	for(ecunum in hmEcurieScore){
		hmEcurieScore[ecunum] = 0;

		for(k = 0; k < newRsltt.length; k++){

			if(newRsltt[k].ecunum == ecunum){
				hmEcurieScore[ecunum] += newRsltt[k].ptnbpointsplace;
			}
		}
	}

	for(pilnum in hmPiloteScore){

		model.editerPointPilote(pilnum, hmPiloteScore[pilnum], function (err, result) {
			if (err) {
				console.log(err);
				return;
			}
		})
	}

	for(ecunum in hmEcurieScore){

		model.editerPointEcurie(ecunum, hmEcurieScore[ecunum], function (err, result) {
			if (err) {
				console.log(err);
				return;
			}
		})
	}

};
