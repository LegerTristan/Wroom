let db = require('../configDb');

//////////////////////////////////// RÉCUPÉRER ID, NOM, PRENOM, DATE NAISSANCE DU PILOTE

module.exports.getMainInfoPilote = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT pilnum, pilprenom, pilnom, pildatenais FROM pilote ORDER BY pilnom ASC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// RÉCUPÉRER NATIONALITE POUR L'AJOUT D'UN PILOTE

module.exports.getNationalites = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT paynum, paynat FROM pays ORDER BY 1 ASC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// RÉCUPÈRE NOM ECURIES POUR L'AJOUT D'UN PILOTE

module.exports.getEcuries = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT ecunum, ecunom FROM ecurie ORDER BY 1 ASC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// INSÉRER UN PILOTE

module.exports.addNewPilote = function (value, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            
            sql = "INSERT INTO pilote SET paynum = " + value.paynum + ", pilnom = '" + value.pilnom + "', pilprenom = '" + value.pilprenom;
            sql = sql + "', pildatenais = '" + value.pildatenais + "', pilpoints = " + value.pilpoints + ", pilpoids = ";
            sql = sql + value.pilpoids + ", piltaille = " + value.piltaille + ", piltexte = '" + value.piltexte + "', ecunum = ";
            sql = sql + value.ecunum;

            connexion.query(sql, function(err, result){
            
               let pilnum = result.insertId;
   
               module.exports.addNewPhoto(value, pilnum, callback);
   
            });

            connexion.release();
         }
   });
};

//////////////////////////////////// INSÉRER UNE PHOTO D'UN PILOTE

module.exports.addNewPhoto = function (value, pilnum, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            
            sql = "INSERT INTO photo SET phonum = 1, pilnum = " + pilnum + ", phosujet = '" + value.phosujet;
            sql = sql + "', phocommentaire = '" + value.phocommentaire + "', phoadresse = '" + value.phoadresse + "'";

            console.log(sql);
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// MODIFIER UN PILOTE

module.exports.modifyPilote = function (data, id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="UPDATE pilote SET paynum = " + data.paynum + ", pilnom = '" + data.pilnom +"', pilprenom = '" + data.pilprenom;
            sql = sql + "', pildatenais = '" + data.pildatenais + "', pilpoints = " + data.pilpoints + ", pilpoids = ";
            sql = sql + data.pilpoids + ", piltaille = " + data.piltaille + ", piltexte = '" + data.piltexte;
            sql = sql + "', ecunum = " + data.ecunum + " WHERE pilnum = " + id;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// MODIFIER UNE PHOTO

module.exports.modifyPhoto = function (data, id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="UPDATE photo SET phosujet = '" + data.phosujet + "', phocommentaire = '" + data.phocommentaire;
            sql = sql + "', phoadresse = '" + data.phoadresse + "' WHERE pilnum = " + id;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// SUPPRIMER UN PILOTE

module.exports.suppPilote = function (id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="DELETE FROM pilote WHERE pilnum = " + id;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// SUPPRIMER UNE PHOTO

module.exports.suppPhoto = function (id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="DELETE FROM photo WHERE pilnum = " + id;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// RÉCUPÉRER TOUTES LES INFOS D'UN PILOTE

module.exports.getInfoOfAPilote = function (id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT pilprenom, pilnom, pildatenais, pilpoints, piltaille, pilpoids, piltexte FROM pilote WHERE pilnum = " + id;
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// RÉCUPÉRER TOUTES LES INFOS D'UNE PHOTO D'UN PILOTE

module.exports.getInfoOfAPhoto = function (id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT phonum, phosujet, phocommentaire, phoadresse FROM photo WHERE pilnum = " + id;
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};