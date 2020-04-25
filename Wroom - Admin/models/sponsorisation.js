let db = require('../configDb');

//////////////////////////////////// RÉCUPÈRE SPONSORISE

module.exports.getInfoSponsorisation = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT sp.sponum, sp.pilnum, sponom, pilnom FROM sponsorise sp INNER JOIN sponsor s ON sp.sponum = s.sponum ";
            sql = sql + "INNER JOIN pilote p ON sp.pilnum = p.pilnum ORDER BY pilnom ASC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// RÉCUPÈRE LISTE PILOTES

module.exports.getPilotes = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT pilnum, pilnom FROM pilote ORDER BY pilnom ASC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// VÉRIFIE QUE LA SPONSO N'EXISTE PAS

module.exports.verifySponso = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT sponum, pilnum FROM sponsorise WHERE sponum = " + data.sponum + " AND pilnum = " + data.pilnum;
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// INSÉRER UNE SPONSO

module.exports.addNewSponso = function (formulaire, callback) {

	db.getConnection(function(err, connexion){
      if(!err){
            
         let sql = "INSERT INTO sponsorise SET pilnum = " + formulaire.pilnum + ", sponum = " + formulaire.sponum;

         connexion.query(sql, callback); 

         connexion.release();
      }
   });
};

//////////////////////////////////// SUPPRIMER UNE SPONSO

module.exports.suppLienSponso = function (idSponsor, idPilote, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="DELETE FROM sponsorise WHERE pilnum = " + idPilote + " AND sponum = " + idSponsor;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};