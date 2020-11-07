# Projet d’application web Sortir.com

## A propos de ce projet

### Cursus
ENI | Projet – Le développement d’une application web

### [Documentation](https://github.com/Dyrits/SORTIR.COM/tree/master/documentation)

### Technologies | Outils
**Stack : WAMP**
- PHP
    - Composer
    - Symfony
        - Twig
    - Doctrine
- JavaScript
    - React
        - JSX
    - Babel

### Détails | Commentaires
Ce projet a été réalisé en collaboration avec [Stéphane M.](https://github.com/stefROM-dev/).

La logique et l'hydratation des propriétés des *components* React doit être revu (via des *components* séparés).

De nombreux dysfonctionnements sont toujours présents et restent à corriger dans de futures mises à jour.

### Contribution
Les *pull requests* sont les bienvenues. Pour les changements majeurs, merci d'ouvrir une *issue* pour en discuter.

### Installation | Utilisation
**Requiert un environnement Apache/MySQL/PHP fonctionnel.**
- 1/ Placez le projet au sein de votre répertoire projet /www
- 2/ Exécutez le fichier *install.bat* ou exécutez manuellement les commandes suivantes :
    - `composer install`
    - `php bin/console doctrine:database:create`
    - `php bin/console make:migration`
    - `php bin/console doctrine:migrations:migrate`

Le projet est accessible en local via l'URL [http://localhost/sortir.com/public/](http://localhost/sortir.com/public/).

Afin d'accéder au site, il est nécessaire de créer un utilisateur (Participant) en base de données, en tant qu'administrateur de préférence.

### Statut
En cours de développement (~61%)
- ~~1001 / Se connecter~~
- ~~1002 / Se souvenir de moi~~
- ~~1003/ Gérer son profil~~
- 1004 / Photo pour le profil
- 1005 / Mot de passe oublié
- 1006 / Inscrire des utilisateurs par intégration d'un fichier
- ~~1007 / Inscrire un utilisateur manuellement~~
- ~~1008 / Désactiver des utilisateurs~~
- 1009 / Supprimer des utilisateurs
- ~~2001/Afficher les  sorties par campus~~
- ~~2002 / Créer une sortie~~
- ~~2003 / S’inscrire~~
- ~~2004 / Se désister~~
- ~~2005 / Clôture des inscriptions~~
- ~~2006 / Annuler une sortie~~
- 2007 / Archiver les sorties
- ~~2008 / Afficher le profil des autres participants~~
- 2009 / Utilisation smartphone
- 2011 / Utilisation tablette
- 2012 / Annuler une sortie en tant qu'administrateur
- ~~2013 / Gérer les villes~~
- ~~2014 / Gérer les lieux~~
- 4001 / Gérer des groupes privés


#### Dernière mise à jour
07/11/2020
(README | 07/11/2020)

