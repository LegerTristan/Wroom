let db = require('../configDb');
//////////////////////////////////// RÉCUPÉRER NOM, LONGUEUR, NB SPECTATEURS DU CIRCUIT

module.exports.getMainInfoCircuit = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT cirnum, cirnom, cirlongueur, cirnbspectateurs FROM circuit ORDER BY cirnom ASC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// RÉCUPÉRER TOUT LES PAYS

module.exports.getPays = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT paynum, paynom FROM pays ORDER BY 1 ASC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// INSÉRER UN CIRCUIT

module.exports.addNewCircuit = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            
            connexion.query('INSERT INTO circuit SET ?', data, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// MODIFIER UN CIRCUIT

module.exports.modifyCircuit = function (data, id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="UPDATE circuit SET cirnom = '" + data.cirnom + "', cirlongueur = " + data.cirlongueur;
            sql = sql + ", paynum = " + data.paynum + ", ciradresseimage = '" + data.ciradresseimage;
            sql = sql + "', cirnbspectateurs = " + data.cirnbspectateurs + ", cirtext = '" + data.cirtext;
            sql = sql + "' WHERE cirnum = " + id;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// SUPPRIMER UN CIRCUIT

module.exports.suppCircuit = function (id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="DELETE FROM circuit WHERE cirnum = " + id;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// RÉCUPÉRER TOUTES LES INFOS D'UN PILOTE

module.exports.getInfoOfACircuit = function (id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT cirnom, cirlongueur, cirnbspectateurs, cirtext FROM circuit WHERE cirnum = " + id;
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};