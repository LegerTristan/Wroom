let db = require('../configDb');

//////////////////////////////////// RÉCUPÉRER LISTE GRAND PRIX
module.exports.getListeGrandPrix = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){

				let sql ="SELECT gpnum, gpnom FROM grandprix ORDER BY gpnom";

            connexion.query(sql, callback);
            connexion.release();
         }
      });
};

//////////////////////////////////// RÉCUPÉRER PILOTE DE LA COURSE POUR LA FICHE RESULTAT

module.exports.getPiloteCourse = function (id, callback) {
	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT c.pilnum, tempscourse, pilnom, pilprenom FROM course c INNER JOIN pilote p ON c.pilnum = p.pilnum WHERE gpnum = " + id + " ORDER BY tempscourse LIMIT 10";
           
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

//////////////////////////////////// RÉCUPÈRE TOUT LES AUTRES PILOTES NON PRÉSENTS DANS LE GRAND PRIX

module.exports.getAllOtherPilotes = function (id, callback) {
	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT pilnum, pilnom FROM pilote WHERE pilnum NOT IN (SELECT pilnum FROM course";
            sql = sql + " WHERE gpnum = " + id + ") ORDER BY pilnom";
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// SUPPRIME UN PILOTE D'UN GRAND PRIX

module.exports.addPiloteGP = function (id, data, callback) {
	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="INSERT INTO course SET gpnum = " + id + ", pilnum = " + data.pilnum + ", tempscourse = '" + data.tempscourse + "'";

            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// SUPPRIME UN PILOTE D'UN GRAND PRIX

module.exports.suppPiloteGP = function (idPilote, idGP, callback) {
	db.getConnection(function(err, connexion){
        if(!err){

            let sql ="DELETE FROM course WHERE gpnum = " + idGP + " AND pilnum = " + idPilote;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// RÉCUPÈRE LE SCORE DE CHAQUE PILOTE POUR UN GRAND PRIX DONNÉ

module.exports.getGPScoreForEachPilote = function (idGP, callback) {
	db.getConnection(function(err, connexion){
        if(!err){

            let sql = "SELECT position, pilnum, COALESCE(pilpoints, 0) AS pilpoints, ptnbpointsplace, ecunum, COALESCE(ecupoints, 0) AS ecupoints FROM "
            sql = sql + "(SELECT @ROW_NUMBER := @ROW_NUMBER + 1 AS position, c.pilnum, pilpoints, e.ecunum, ecupoints FROM course c "
            sql = sql + "INNER JOIN pilote p ON c.pilnum = p.pilnum INNER JOIN ecurie e ON p.ecunum = e.ecunum INNER JOIN (SELECT @ROW_NUMBER := 0 FROM DUAL) AS sub "
            sql = sql + "WHERE c.gpnum = " + idGP + " ORDER BY tempscourse ASC LIMIT 10) t INNER JOIN points pt ON "
            sql = sql + "pt.ptplace = t.position ORDER BY pilnum";
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// ÉDITE LE SCORE DES PILOTES

module.exports.editerPointPilote = function (idPilote, score, callback) {
	db.getConnection(function(err, connexion){
        if(!err){

            let sql = "UPDATE pilote SET pilpoints = " + score + " WHERE pilnum = " + idPilote;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// ÉDITE LE SCORE DES ECURIES

module.exports.editerPointEcurie = function (idEcurie, score, callback) {
	db.getConnection(function(err, connexion){
        if(!err){

            let sql = "UPDATE ecurie SET ecupoints = " + score + " WHERE ecunum = " + idEcurie;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};