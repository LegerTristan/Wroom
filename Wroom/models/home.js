let db = require('../configDb');

//////////////////////////////////// RÉCUPÉRER RÉSULTATS DERNIER GRAND PRIX

module.exports.getDernierGP = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){

                  let sql ="SELECT gpnum, gpnom, gpdate, gpdatemaj, payadrdrap " +
                  " from grandprix g inner join circuit c on c.cirnum=g.cirnum inner join pays pa on pa.paynum = c.paynum " +
                  " where gpdatemaj = (select max(gpdatemaj) from grandprix) ORDER BY gpnom";
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};
