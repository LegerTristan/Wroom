let db = require('../configDb');

//////////////////////////////////// RÉCUPÉRER LISTE GRAND PRIX
module.exports.getListeGrandPrix = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="SELECT gpnum, payadrdrap, gpnom FROM " +
                            "grandprix gp INNER JOIN circuit c ";
						sql= sql + "ON c.cirnum=gp.cirnum  INNER JOIN pays p ON p.paynum = c.paynum ORDER BY gpnom";

            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//////////////////////////////////// RÉCUPÉRER INFO POUR LA FICHE RESULTAT

module.exports.getInfoFicheGP = function (data, callback) {
	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT gpnom, gpdate, gpcommentaire FROM grandprix gp WHERE gp.gpnum = " + data;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// RÉCUPÉRER PILOTE DE LA COURSE POUR LA FICHE RESULTAT

module.exports.getPiloteCourse = function (data, callback) {
	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT tempscourse, pilnom, pilprenom FROM course c INNER JOIN pilote p ON c.pilnum = p.pilnum WHERE gpnum = " + data + " ORDER BY tempscourse LIMIT 10";
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// RÉCUPÉRER NOMBRE DE PILOTES PARTICIPANT AU GRAND PRIX (MAX 10)

module.exports.getNbPilotes = function (id, callback) {
	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT COUNT(c.pilnum) AS nb FROM course c INNER JOIN pilote p ON c.pilnum = p.pilnum WHERE gpnum = " + id + " LIMIT 10";
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// RÉCUPÉRER POINTS POUR LA FICHE RESULTAT

module.exports.getPoints = function (nb, callback) {
	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT ptplace, ptnbpointsplace FROM points LIMIT " + nb;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};