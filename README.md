# Sortir.com

A web application for organizing outings, built with Symfony and React, as an ENI course project.

## About The Project

Final project of the ENI course "Projet - Le développement d'une application web". The documentation, including the original assignment (in French), is available in the repository: [documentation](https://github.com/Dyrits/SORTIR.COM/tree/master/documentation).

From the assignments: the application manages outings ("sorties") organized by campus - users can sign in, manage their profile, register for or withdraw from outings, and administrators can manage users, cities and venues.

From the author's notes: the project was made in collaboration with [Stéphane M.](https://github.com/stefROM-dev/). The logic and hydration of the React components' properties should be reworked (through separate components), and many malfunctions are still present and remain to be fixed in future updates.

### Status

In development, per the original README, with the following feature tracking:

<details markdown="block">
<summary>Feature list (from the original README, in French)</summary>

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

</details>

## Built With

- PHP / Symfony (Twig, Doctrine, Composer)
- JavaScript / React (JSX, Babel)
- WAMP stack

## Getting Started

From the original README: a working Apache/MySQL/PHP environment is required. Place the project in the `/www` directory and run `install.bat`, or run manually:

```sh
composer install
php bin/console doctrine:database:create
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

The project is then accessible locally at http://localhost/sortir.com/public/. A user (Participant) must be created in the database, as an administrator, to access the site.

## License

No license file is present in this repository.

## Contact

Dylan J. Gerrits - [GitHub](https://github.com/Dyrits)
