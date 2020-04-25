let db = require('../configDb');

//////////////////////////////////// RÉCUPÉRER ID, NOM, ACTIVITE, DU SPONSOR

module.exports.getMainInfoSponsor = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT sponum, sponom, sposectactivite FROM sponsor ORDER BY sponom ASC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// INSÉRER UN SPONSOR

module.exports.addNewSponsor = function (formulaire, callback) {

	db.getConnection(function(err, connexion){
      if(!err){
            
         let sql = "INSERT INTO sponsor SET sponom= '" + formulaire.sponom + "', sposectactivite= '" + formulaire.sposectactivite + "'";

         connexion.query(sql, function(err, result){
            
            let sponum = result.insertId;

            module.exports.addNewFinance(formulaire.ecunum, sponum, callback);

         });

         connexion.release();
      }
   });
};

//////////////////////////////////// INSÉRER UNE FINANCE

module.exports.addNewFinance = function (ecunum, id, callback) {

	db.getConnection(function(err, connexion){
      if(!err){
         sql = "INSERT INTO finance SET ecunum = " + ecunum + ", sponum= " + id;
         
         connexion.query(sql, callback);

         

         connexion.release();
      }
   });
};

//////////////////////////////////// SUPPRIMER UN SPONSOR

module.exports.suppSponsor = function (id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="DELETE FROM sponsor WHERE sponum = " + id;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// SUPPRIMER UNE FINANCE EN LIEN AVEC UN SPONSOR

module.exports.suppFinance = function (id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="DELETE FROM finance WHERE sponum = " + id;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// RÉCUPÉRER SPONSOR LIEE A UN ID

module.exports.getInfoOfASponsor = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
         let sql ="SELECT sponom, sposectactivite FROM sponsor WHERE sponum = " + data ; 
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// MODIFIER UN SPONSOR

module.exports.modifySponsor = function (value, id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="UPDATE sponsor SET sponom = '" + value.sponom +"', sposectactivite = '" + value.sposectactivite;
            sql = sql + "' WHERE sponum = " + id;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};

//////////////////////////////////// MODIFIER UNE FINANCE

module.exports.modifyFinance = function (value, id, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="UPDATE finance SET ecunum = " + value.ecunum +" WHERE sponum = " + id;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};