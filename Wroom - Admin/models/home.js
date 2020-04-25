let db = require('../configDb');

//////////////////////////////////// RÉCUPÉRER RÉSULTATS DERNIER GRAND PRIX

module.exports.getDernierGP = function(callback) {

	db.getConnection(function(err, connexion){
        if(!err){

                  let sql ="SELECT gpnum, gpnom, gpdate, gpdatemaj, payadrdrap " +
                  " FROM grandprix g inner join circuit c on c.cirnum=g.cirnum inner join pays pa on pa.paynum = c.paynum " +
                  " WHERE gpdatemaj = (select max(gpdatemaj) from grandprix) ORDER BY gpnom";
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

//////////////////////////////////// RÉCUPÉRER MDP DU LOGIN EN PARAMÈTRE

module.exports.getLogin = function(login, callback) {

	db.getConnection(function(err, connexion){
        if(!err){

            let sql ="SELECT passwd FROM login WHERE login = '" + login + "'";
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};
