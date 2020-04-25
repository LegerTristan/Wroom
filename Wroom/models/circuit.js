let db = require('../configDb');

//////////////////////////////////// RÉCUPÉRER LISTE CIRCUITS

module.exports.getListeCircuits = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="SELECT cirnum, payadrdrap, cirnom FROM " +
                            "circuit c INNER JOIN pays p ";
						sql= sql + "ON p.paynum=c.paynum ORDER BY cirnom";
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// RÉCUPÉRER INFO POUR LA FICHE PILOTE

module.exports.getInfoFicheCircuit = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT cirnom, cirlongueur, cirnbspectateurs, ciradresseimage, cirtext, paynom FROM circuit c " +
            " INNER JOIN pays p ON c.paynum = p.paynum WHERE cirnum = " + data;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};
