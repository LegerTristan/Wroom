let model = require('../models/ecurie.js');
let async = require('async');

   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response){
   response.title = 'Liste des écuries';
    model.getListeEcurie( function (err, result) {
        if (err) {

            console.log(err);
            return;
        }
    response.listeEcurie = result;
    response.render('listerEcurie', response);
});
}

// ///////////////////////// FICHE D'UNE ECURIE

module.exports.FicheEcurie = 	function(request, response){
    let data = request.params.ecunum;
    async.parallel([
        function(callback){
            model.getListeEcurie(function (errEcu, resultFiche) {callback(null, resultFiche)});
        },
        function(callback){
            model.getInfoFicheEcurie(data, (function (errEcu, resultFiche) {callback(null, resultFiche)}));
        },
        function(callback){
            model.getPiloteFicheEcurie(data, (function (errEcu, resultFiche) {callback(null, resultFiche)}));
        },
        function(callback){
            model.getVoitureFicheEcurie(data, (function (errEcu, resultFiche) {callback(null, resultFiche)}));
        },
    ],
    function(err, result){
        if(err){
            console.log(err)
            return;
        }
        response.listeEcurie = result[0];
        response.infoEcurie = result[1][0];
        response.infoEcurie.piloteEcurie = result[2];
        response.infoEcurie.voitureEcurie = result[3];
        response.title = result[1][0].ecunom;

        response.render('detailEcurie', response);
    }
    )
 };