
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// pilotes
    app.get('/repertoirePilote', PiloteController.Repertoire);
    app.get('/nomPilote/:initial', PiloteController.PrenomNomPilote); // Q : route Pilote
    app.get('/detailPilote/:pilnum', PiloteController.FichePilote);

 // circuits
   app.get('/circuits', CircuitController.ListerCircuit);
   app.get('/detailCircuit/:cirnum', CircuitController.FicheCircuit);

// Ecuries
   app.get('/ecuries', EcurieController.ListerEcurie);
   app.get('/detailEcurie/:ecunum', EcurieController.FicheEcurie);

 //Résultats
   app.get('/resultats', ResultatController.ListerGrandPrix);
   app.get('/detailGP/:gpnum', ResultatController.FicheGP);


// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
