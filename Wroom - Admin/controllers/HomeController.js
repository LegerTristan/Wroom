let model = require('../models/home.js');
let crypto = new Cryptr('MaSuperCléDeChiffrementDeouF');

////////////////////////////////////////////////// CONNEXION
module.exports.Connexion = function(request, response){
    response.title = "Connexion - WROOM";

    request.session.connecte = false;

    response.render('connexion', response);
  };

  ////////////////////////////////////////////////// VERIFICATION CONNEXION

module.exports.Verification = function(request, response){

  let formulaire = request.body;

  model.getLogin(formulaire.login, function (err, result) {
    if (err) {

      console.log(err);
      return;
    }

    let mdp = result[0];
    if(mdp == null){;
      response.redirect('/connexion');
    }
    else{
      let mdpDechiffre = crypto.decrypt(mdp.passwd);
      
      if(formulaire.passwd == mdpDechiffre){

        request.session.connecte = true;
        response.redirect('/gestPilotes');
      }
      else{
        response.redirect('/connexion');
      }
    }    
  });
};

////////////////////////////////////////////////// ERREUR 404

module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};
