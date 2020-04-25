let db = require('../configDb');

module.exports.getListeEcurie = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT ecunum, payadrdrap, ecunom FROM " +
                            "ecurie e INNER JOIN pays p ";
                  sql= sql + "ON p.paynum=e.paynum ORDER BY ecunom";
                  
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//////////////////////////////////// RÉCUPÉRER INFO POUR LA FICHE ECURIE

module.exports.getInfoFicheEcurie = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT ecunom, ecunomdir, ecuadrsiege, ecuadresseimage, fpnum, paynom FROM ecurie e INNER JOIN pays pa ";
            sql = sql + "ON e.paynum = pa.paynum WHERE e.ecunum = " + data;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// RÉCUPÉRER PILOTE LIEE A L'ECURIE POUR LA FICHE ECURIE

module.exports.getPiloteFicheEcurie = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
         let sql ="SELECT p.pilnum, pilprenom, pilnom, piltexte,  phoadresse FROM pilote p INNER JOIN photo ph ON p.pilnum = ph.pilnum ";
         sql = sql + "WHERE ecunum LIKE '" + data + "%' AND phonum = 1 ORDER BY 1 ASC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// RÉCUPÉRER VOITURE LIEE A L'ECURIE POUR LA FICHE ECURIE

module.exports.getVoitureFicheEcurie = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
         let sql ="SELECT voinom, voiadresseimage, typelibelle FROM voiture v INNER JOIN type_voiture tv ON v.typnum = tv.typnum ";
         sql = sql + "WHERE ecunum = " + data ;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};