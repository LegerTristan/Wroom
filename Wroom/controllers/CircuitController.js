let model = require('../models/circuit.js');
let async = require('async');

// ////////////////////// L I S T E R     C I R C U I T S

module.exports.ListerCircuit = function(request, response){
    response.title = 'Liste des circuits';
    model.getListeCircuits( function (err, result) {
        if (err) {

            console.log(err);
            return;
        }
        response.listeCircuits = result;
    response.render('listerCircuit', response);
    });
}

// ///////////////////////// FICHE D'UN CIRCUIT

module.exports.FicheCircuit = 	function(request, response){
    let data = request.params.cirnum;
    async.parallel([
        function(callback){
            model.getListeCircuits( function (errPil, resultListe) {callback(null, resultListe)});
        },
        function(callback){
            model.getInfoFicheCircuit(data, (function (errPil, resultFiche) {callback(null, resultFiche)}));
        },
    ],
    function(err, result){
        if(err){
            console.log(err)
            return;
        }

        response.listeCircuits = result[0];
        response.infoCircuit = result[1];
        response.title = result[1][0].cirnom;
        response.render('detailCircuit', response);
    }
    )
 };
