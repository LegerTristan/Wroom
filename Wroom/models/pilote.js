let db = require('../configDb');

///////////////////////////////////////// RÉCUPÉRER l'INITIAL

module.exports.getFirstNameLetter = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){

				let sql ="SELECT DISTINCT(LEFT(pilnom, 1)) AS initial FROM pilote order by initial";
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//////////////////////////////////// RÉCUPÉRER ID, NOM, PRENOM, ADRESSE PHOTO DU PILOTE

module.exports.getMainInfoPilote = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT p.pilnum, pilprenom, pilnom, phoadresse FROM pilote p INNER JOIN photo ph ON p.pilnum = ph.pilnum ";
            sql = sql + "WHERE pilnom LIKE '" + data + "%' AND phonum = 1 ORDER BY 1 DESC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// RÉCUPÉRER INFO POUR LA FICHE PILOTE

module.exports.getInfoFichePilote = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT pilprenom, pilnom, pildatenais, pilpoids, piltaille, paynom, ecunom, phoadresse FROM pilote p INNER JOIN pays pa ";
            sql = sql + "ON p.paynum = pa.paynum  LEFT JOIN ecurie e ON p.ecunum = e.ecunum INNER JOIN photo ph ON p.pilnum = ph.pilnum ";
            sql = sql + "WHERE p.pilnum = " + data + " AND phonum = 1";
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// RÉCUPÉRER SPONSOR POUR LA FICHE PILOTE

module.exports.getSponsorPilote = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT sponom, sposectactivite FROM sponsorise sp INNER JOIN sponsor spo ";
            sql = sql + "ON sp.sponum = spo.sponum WHERE pilnum = " + data;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// RÉCUPÉRER TEXTE POUR LA FICHE PILOTE

module.exports.getTextPilote = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT piltexte FROM pilote WHERE pilnum = " + data;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// RÉCUPÉRER PHOTOS POUR LA FICHE PILOTE

module.exports.getPhotoPilote = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT phoadresse, phosujet, phocommentaire FROM photo WHERE pilnum = " + data + " AND phonum <> 1";
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};
