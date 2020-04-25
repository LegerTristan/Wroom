let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let SponsorController = require('./../controllers/SponsorController');
let FinanceController = require('./../controllers/FinanceController');
let SponsorisationController = require('./../controllers/SponsorisationController');
let VoitureController = require('./../controllers/VoitureController');

// Routes
module.exports = function(app){

// Main Routes
   app.get('/', HomeController.Connexion);
   app.get('/connexion', HomeController.Connexion);

   app.post('/connexion', HomeController.Verification);

// Pilotes
   app.get('/gestPilotes', PiloteController.Gestion);
   app.get('/addPilote', PiloteController.Ajouter);
   app.get('/editPilote/:pilnum', PiloteController.Modifier);
   app.get('/suppPilote/:pilnum', PiloteController.Supprimer);

   app.post('/gestPilotes', PiloteController.AjoutSQL);
   app.post('/editPilote', PiloteController.ModifierSQL);

   // Circuits
   app.get('/gestCircuits', CircuitController.Gestion);
   app.get('/addCircuit', CircuitController.Ajouter);
   app.get('/editCircuit/:cirnum', CircuitController.Modifier);
   app.get('/suppCircuit/:cirnum', CircuitController.Supprimer);

   app.post('/gestCircuits', CircuitController.AjoutSQL);
   app.post('/editCircuit', CircuitController.ModifierSQL);

   // Ecuries
   app.get('/gestEcuries', EcurieController.Gestion);
   app.get('/addEcurie', EcurieController.Ajouter);
   app.get('/editEcurie/:ecunum', EcurieController.Modifier);
   app.get('/suppEcurie/:ecunum', EcurieController.Supprimer);

   app.post('/gestEcuries', EcurieController.AjoutSQL);
   app.post('/editEcurie', EcurieController.ModifierSQL);

   //Résultats
   app.get('/selectionGP', ResultatController.SelectionGrandPrix);
   app.get('/saisieResultat/:pilnum', ResultatController.SupprimerPilote);


   app.post('/ajoutResultat', ResultatController.AjouterPilote);
   app.post('/selectionGP', ResultatController.AffichageSaisie);

   // Sponsors
   app.get('/gestSponsors', SponsorController.Gestion);
   app.get('/addSponsor', SponsorController.Ajouter);
   app.get('/editSponsor/:sponum', SponsorController.Modifier);
   app.get('/suppSponsor/:sponum', SponsorController.Supprimer);

   app.post('/gestSponsors', SponsorController.AjoutSQL);
   app.post('/editSponsor', SponsorController.ModifierSQL);

   // Finances
   app.get('/gestFinances', FinanceController.Gestion);
   app.get('/addFinance', FinanceController.Ajouter);
   app.get('/suppFinance/:sponum/:ecunum', FinanceController.Supprimer);

   app.post('/gestFinances', FinanceController.AjoutSQL);

   // Sponsorisation
   app.get('/gestSponsorisations', SponsorisationController.Gestion);
   app.get('/addSponsorisation', SponsorisationController.Ajouter);
   app.get('/suppSponsorisation/:sponum/:pilnum', SponsorisationController.Supprimer);

   app.post('/gestSponsorisations', SponsorisationController.AjoutSQL);

   // Voitures
   app.get('/gestVoitures', VoitureController.Gestion);
   app.get('/addVoiture', VoitureController.Ajouter);
   app.get('/suppVoiture/:ecunum/:voinum', VoitureController.Supprimer);

   app.post('/gestVoitures', VoitureController.AjoutSQL);

// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
