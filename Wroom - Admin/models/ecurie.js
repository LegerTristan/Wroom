let db = require('../configDb');

//////////////////////////////////// RÉCUPÉRER ID, NOM, DIRECTEUR, POINTS DE L'ECURIE

module.exports.getMainInfoEcurie = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT ecunum, ecunom, ecunomdir, ecupoints FROM ecurie ORDER BY ecunom ASC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// RÉCUPÉRER LES FOURNISSEURS DE PNEU

module.exports.getFPneu = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT fpnum, fpnom FROM fourn_pneu ORDER BY fpnom ASC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// RÉCUPÉRER LES FOURNISSEURS DE PNEU

module.exports.getTypeVoiture = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT typnum, typelibelle FROM type_voiture ORDER BY typelibelle ASC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// INSÉRER UNE ECURIE

module.exports.addNewEcurie = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            
            sql = "INSERT INTO ecurie SET fpnum = " + data.fpnum + ", ecunom = '" + data.ecunom + "', ecunomdir = '" + data.ecunomdir;
            sql = sql + "', ecuadrsiege = '" + data.ecuadrsiege + "', ecupoints = " + data.ecupoints + ", paynum = ";
            sql = sql + data.paynum + ", ecuadresseimage = '" + data.ecuadresseimage + "'";

            console.log(sql);

            connexion.query(sql, function(err, result){
            
               let ecunum = result.insertId;
   
               module.exports.addNewVoiture(data, ecunum, callback);
   
            });

            connexion.release();
         }
   });
};

//////////////////////////////////// INSÉRER UNE VOITURE D'UNE ECURIE

module.exports.addNewVoiture = function (data, ecunum, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            
            sql = "INSERT INTO voiture SET ecunum = " + ecunum + ", typnum = " + data.typnum;
            sql = sql + ", voinom = '" + data.voinom + "', voiadresseimage = '" + data.voiadresseimage + "'";

            console.log(sql);
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// MODIFIER UNE ECURIE

module.exports.modifyEcurie = function (data, id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="UPDATE ecurie SET fpnum = " + data.fpnum + ", ecunom = '" + data.ecunom +"', ecunomdir = '" + data.ecunomdir;
            sql = sql + "', ecuadrsiege = '" + data.ecuadrsiege + "', ecupoints = " + data.ecupoints + ", paynum = ";
            sql = sql + data.paynum + ", ecuadresseimage = '" + data.ecuadresseimage + "' WHERE ecunum = " + id;

            console.log(sql);
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// MODIFIER UNE VOITURE

module.exports.modifyVoiture = function (data, id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="UPDATE voiture SET typnum = " + data.typnum + ", voinom = '" + data.voinom;
            sql = sql + "', voiadresseimage = '" + data.voiadresseimage + "' WHERE ecunum = " + id;
           
            console.log(sql);
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// SUPPRIMER UNE ECURIE

module.exports.suppEcurie = function (id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="DELETE FROM ecurie WHERE ecunum = " + id;
           
            console.log(sql);
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// SUPPRIMER UNE VOITURE D'UNE ECURIE

module.exports.suppVoiture = function (id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="DELETE FROM voiture WHERE ecunum = " + id;
           
            console.log(sql);
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// RÉCUPÉRER DES INFOS D'UNE ECURIE

module.exports.getInfoOfAnEcurie = function (id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT ecunom, ecunomdir, ecuadrsiege FROM ecurie WHERE ecunum = " + id;
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// RÉCUPÉRER DES INFOS D'UNE VOITURE D'UNE ECURIE

module.exports.getInfoOfAVoiture = function (id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT voinom FROM voiture WHERE ecunum = " + id;
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};