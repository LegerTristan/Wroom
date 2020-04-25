let db = require('../configDb');

//////////////////////////////////// RÉCUPÉRER ID, NOM, TYPE, ET NOM DE L'ÉCURIE

module.exports.getMainInfoVoiture = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT voinum, voinom, v.ecunum, ecunom, typelibelle FROM voiture v INNER JOIN ecurie e ON v.ecunum = e.ecunum INNER JOIN type_voiture tv ON v.typnum = tv.typnum ORDER BY voinom ASC";
           
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

/////////////////////////////////// RÉCUPÈRE LA LISTE DES TYPES DES VOITURES

module.exports.getTypeVoitures = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT typnum, typelibelle FROM type_voiture ORDER BY typelibelle ASC";

            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// AJOUTE UNE VOITURE

module.exports.addNewVoiture = function (formulaire, callback) {

	db.getConnection(function(err, connexion){
      if(!err){
            
         let sql = "INSERT INTO voiture SET ecunum = " + formulaire.ecunum;
         sql = sql + ", typnum = " + formulaire.typnum + ", voinom = '" + formulaire.voinom + "', voiadresseimage = '" + formulaire.voiadresseimage + "'";

         connexion.query(sql, callback); 

         connexion.release();
      }
   });
};

//////////////////////////////////// SUPPRIMER UN LIEN VOITURE/ÉCURIE

module.exports.suppLienVoiture = function (idEcurie, idVoiture, callback) {

	db.getConnection(function(err, connexion){
        if(!err){
            let sql ="DELETE FROM voiture WHERE voinum = " + idVoiture + " AND ecunum = " + idEcurie;
           
            connexion.query(sql, callback);

            connexion.release();
         }
   });
};