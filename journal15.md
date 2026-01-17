# Journal de bord du projet — SAE 5.01 

##  Lancement et analyse (01/12 → 08/12)

**02/12/2025 **
- Création du dépôt GitLab partagé.
- Lecture de l’arborescence de base du projet.
- Lecture complète des consignes.
- Début du diagramme de topologie réseau (diagramme io).

**03/12/2025 **
- Début de l’installation Linux (VM).
- Premières recherches sur FreeRADIUS et le fonctionnement de PEAP-MSCHAPv2.

**11/12/2025** commit déjà fait
-création du gantt fini dépôt sur le git lab
- Finalisation de la réflexion sur l’architecture multi-sites.
- Début de la rédaction de `docs/analyse-ebios.md` (version brouillon).
  (je garde la doc en local pour l’instant, je push quand ce sera plus propre)


**12/12/2025**
- Début du fichier `docs/dossier-architecture.md`.
- Dépôt de l’analyse-ebios (v1)



---




## Authentification RADIUS (10/12 → 12/12)

**18/12/2025**
**19/12/2025**
**20/12/2025**

ajouter ce qu’avait fait Béatrice




 **12/12/2025 (heure de projet)**


- Installation de MariaDB.
- Installation de FreeRADIUS sur le srv Linux.
- Début de la conf RADIUS (clients, EAP, modules).
-
Objectif :  
Mettre en place l’authentification FreeRADIUS via une base MariaDB et valider le fonctionnement par un test local.

Travail réalisé :
- Installation et liaison de FreeRADIUS avec MariaDB.
- Abandon du fichier `users` au profit d’une authentification 100 % SQL.
- Dépannage de plusieurs erreurs de configuration (TLS SQL, syntaxe du module SQL, inclusions incorrectes).
- Nettoyage et correction du fichier `mods-enabled/sql`.

Tests :
- Lancement de FreeRADIUS en mode debug.
- Test d’authentification locale avec radtest.

Résultat :
- Le serveur démarre correctement.
- L’utilisateur est authentifié depuis la base MariaDB (Access-Accept).



**09/01/2025**
Recherche sur wazuh




**13/01/2025**

Objectif :
Préparer et valider l’authentification Wi-Fi Entreprise (PEAP-MSCHAPv2) en environnement simulé avant l’intégration du matériel réseau réel.

Travail réalisé :
- Consolidation SQL : Vérification finale que l’authentification repose exclusivement sur la base MariaDB (le fichier `users` est totalement ignoré).
- Configuration EAP : Activation de PEAP comme méthode EAP par défaut et vérification de la présence du module `mschap` pour la compatibilité WPA2-Entreprise.
- Gestion des Certificats :Vérification de la présence et de la validité des certificats serveurs (nécessaires au tunnel TLS/PEAP).
- Maîtrise du Débogage : Utilisation intensive de la commande `/usr/sbin/freeradius -X` pour isoler les erreurs de requêtes SQL (tables manquantes, erreurs de syntaxe) et confirmer le cheminement logique de l'authentification.

Tests :
- Lancement du serveur en mode debug pour surveiller le chargement des modules `eap`, `mschap` et `sql`.
- Analyse des logs en temps réel pour confirmer que le serveur est "Ready to process requests".

Résultat :
- La chaîne complète RADIUS + MariaDB + EAP est fonctionnelle et stable côté serveur.
- L’infrastructure logicielle est officiellement prête à recevoir la connexion d'un client Wi-Fi physique (routeur TL-MR100) lors de la prochaine phase.
- Mise à jour du document `docs/dossier-architecture.md` pour refléter le passage à l'Objectif 2 (Déploiement réseau).




**15/01/2025**

### Objectif : Finalisation de l'infrastructure logicielle et de l'interface d'administration
- **Installation du serveur Web :** Déploiement d'Apache2 et PHP 8.x pour héberger l'interface de gestion des comptes.
- **Base de données :** Mise à jour du schéma SQL (tables `radcheck`, `radreply`, `radpostauth`) pour assurer la compatibilité avec le script de gestion PHP.
- **Interface PHP :** Configuration de `config.php` avec les identifiants sécurisés de la base de données MariaDB.
- **Tests de validation :**
    - Création d'un utilisateur (`test_php`) via l'interface Web.
    - Vérification de la présence de l'utilisateur en base SQL.
    - Test d'authentification réussi avec `radtest` (obtention d'un `Access-Accept`).
- **Analyse des logs :** Observation du processus d'authentification via `freeradius -X` (validation du cycle : Requête -> SQL Select -> PAP Compare -> SQL Insert Post-Auth).


