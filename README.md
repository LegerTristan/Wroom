# Wroom

![Image](https://legertristan.github.io/Site/images/wroom_visuel.png)

## Présentation

Projet scolaire réalisé durant ma deuxième année de DUT Informatique avec les bibliothèques JS suivantes : Express &amp; Handlebars

Logiciels utilisés : VS Code, Wamp 

## Lancer Wroom

Pour lancer Wroom, il vous faudra posséder au préalable :

* Wamp
* NodeJS
* NPM

Il vous faut ensuite **cloner le dépôt** sur votre pc via **Git**, ou **télécharger l'archive ZIP** à partir du *Download* en vert se situant en haut à droite du dépôt.  
Une fois le projet en votre possession, dézipper-le si ce n'est pas déjà fait et ouvrez un terminal de commande.  
Rendez-vous dans le dossier **Wroom** via la commande **cd** (sur Windows).  
Une fois dans le dossier, téléchargez les modules externes (appelé *nodes-modules*) via la commande : **npm update --save**.  
Après, lancez l'application via la commande : **nodemon app.js**, vous pourrez accéder au site via l'adresse par défaut : *localhost:6800*.
Enfin, lancez **Wamp**.

Le processus est exactement le même pour lancer la partie admin du projet, **Wroom - Admin**.


## Fonctionnement de l'application

L'application possède express pour gérer les sessions, les routes et d'autres éléments.
Il n'y a donc qu'un seul fichier html, et grâce à express et handlebars lorsqu'on change de page, on appel une route dans le fichier router.js qui redirige vers le contrôleur correspondant au chemin demandé.  
Il y a un contrôleur pour chaque catégorie qui s'occupe d'exécuter le *module* lié à la page demandée et d'appeler les *models* pour assurer le bon fonctionnement de la page.  

Un model contient les requêtes SQL qui sont exécutés pour récupérer les données attendues dans la base.  
Les données sont renvoyées sous la forme d'un résultat qui est attribué à une variable dans le contrôleur.  
Cette/Ces variable.s est/sont envoyé.s au handlebars qui charge la page avec la syntaxe HTML5 + des éléments spécifiques telle que le *for each* pour afficher toutes les données d'un tableau à la suite.

## État du projet

Terminé.
