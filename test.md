**11/12/2025**

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
