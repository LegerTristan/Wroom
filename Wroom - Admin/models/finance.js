let db = require('../configDb');

//////////////////////////////////// RÉCUPÈRE FINANCE

module.exports.getInfoFinance = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT f.sponum, f.ecunum, sponom, ecunom FROM finance f INNER JOIN sponsor s ON f.sponum = s.sponum ";
            sql = sql + "INNER JOIN ecurie e ON f.ecunum = e.ecunum ORDER BY sponom ASC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// RÉCUPÈRE LISTE SPONSOR

module.exports.getSponsors = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT sponum, sponom FROM sponsor ORDER BY sponom ASC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// VÉRIFIE QUE LA FINANCE N'EXISTE PAS

module.exports.verifyFinance = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT sponum, ecunum FROM finance WHERE sponum = " + data.sponum + " AND ecunum = " + data.ecunum;
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// INSÉRER UNE FINANCE

module.exports.addNewFinance = function (formulaire, callback) {

	db.getConnection(function(err, connexion){
      if(!err){
            
         let sql = "INSERT INTO finance SET ecunum = " + formulaire.ecunum + ", sponum = " + formulaire.sponum;

         connexion.query(sql, callback); 

         connexion.release();
      }
   });
};

//////////////////////////////////// SUPPRIMER UNE FINANCE ENTRE ECURIE ET SPONSOR CHOISIS

module.exports.suppLienFinance = function (idSponsor, idEcurie, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="DELETE FROM finance WHERE sponum = " + idSponsor + " AND ecunum = " + idEcurie;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};