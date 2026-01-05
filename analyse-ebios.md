# Analyse de risques – EBIOS (version simplifiée)  
**SAE 5.01 – Architecture Wi-Fi sécurisée multi-sites**  
BUT Réseaux & Télécommunications – Parcours Cyber / ROM  
Année univ. 2025–2026  

---

## 1. Objectif de l’analyse EBIOS

Cette analyse de risques a pour objectif d’identifier les risques de sécurité liés au déploiement d’une infrastructure Wi-Fi sécurisée multi-sites pour une chaîne de salles de sport.

La méthode **EBIOS ANSSI** est appliquée ici dans une **version simplifiée**, adaptée au périmètre du projet, afin de :
- identifier les actifs critiques ;
- analyser les menaces crédibles ;
- définir des scénarios de risques réalistes ;
- proposer des mesures de sécurité adaptées.

---

## 2. Périmètre de l’étude

Le périmètre couvert par cette analyse comprend :
- les réseaux Wi-Fi « Entreprise » et « Invités » ;
- le routeur 4G TP-Link TL-MR100 ;
- le serveur Linux central ;
- les services FreeRADIUS, MariaDB, PHP et Wazuh ;
- les données d’authentification des utilisateurs.

Les postes clients et terminaux utilisateurs ne sont pas analysés en détail.

---

## 3. Actifs essentiels

### 3.1 Actifs primaires

| Actif | Description |
|-----|-------------|
| Accès Wi-Fi Entreprise | Accès réseau interne réservé aux employés |
| Données d’authentification | Logins et mots de passe RADIUS |
| Disponibilité du Wi-Fi | Accès Internet et services pour les salles |
| Journaux de sécurité | Logs système, RADIUS et réseau |

### 3.2 Actifs supports

| Actif | Description |
|------|-------------|
| Serveur Linux central | Héberge RADIUS, Wazuh, PHP, DB |
| Routeur TL-MR100 | Point d’accès Wi-Fi et accès Internet |
| Base MariaDB | Stockage des comptes utilisateurs |
| Infrastructure 4G | Lien Internet des sites distants |

---

## 4. Sources de menaces

Les principales sources de menaces identifiées sont :
- un attaquant externe à proximité physique du Wi-Fi ;
- un utilisateur invité malveillant ;
- un employé avec des droits excessifs ;
- un attaquant distant exploitant une faille serveur ;
- une mauvaise configuration ou une erreur humaine.

---

## 5. Menaces principales

| Menace | Description |
|------|-------------|
| Accès Wi-Fi non autorisé | Connexion frauduleuse au réseau Entreprise |
| Interception d’identifiants | Vol de login/mot de passe |
| Compromission du serveur | Accès non autorisé au serveur central |
| Déni de service | Saturation du Wi-Fi ou du RADIUS |
| Accès invité vers le LAN | Rupture de l’isolement réseau |

---

## 6. Scénarios de risques crédibles

### Scénario 1 – Accès frauduleux au Wi-Fi Entreprise

**Description :**  
Un attaquant tente de se connecter au SSID « Entreprise » afin d’accéder au réseau interne.

**Impacts :**
- accès non autorisé au réseau ;
- compromission potentielle des ressources internes.

**Vraisemblance :** moyenne  
**Gravité :** élevée  

**Mesures retenues :**
- WPA2-Enterprise (802.1X) ;
- authentification PEAP-MSCHAPv2 ;
- comptes individuels RADIUS ;
- journalisation des tentatives.

---

### Scénario 2 – Vol d’identifiants Wi-Fi

**Description :**  
Un attaquant met en place un faux point d’accès (Evil Twin) afin de récupérer des identifiants.

**Impacts :**
- compromission de comptes utilisateurs ;
- accès réseau non autorisé.

**Vraisemblance :** moyenne  
**Gravité :** élevée  

**Mesures retenues :**
- certificat serveur RADIUS ;
- tunnel TLS via PEAP ;
- sensibilisation à la validation du certificat.

---

### Scénario 3 – Accès invité vers le réseau interne

**Description :**  
Un client connecté au SSID « Invités » tente d’atteindre le réseau interne.

**Impacts :**
- exposition du LAN interne ;
- fuite d’informations.

**Vraisemblance :** faible  
**Gravité :** moyenne  

**Mesures retenues :**
- isolement réseau du SSID invité ;
- absence de services internes exposés ;
- tests d’isolement documentés.

---

### Scénario 4 – Compromission du serveur central

**Description :**  
Un attaquant exploite une faille du serveur Linux (SSH, PHP, service exposé).

**Impacts :**
- compromission complète de l’infrastructure ;
- perte de confidentialité et d’intégrité des données.

**Vraisemblance :** faible à moyenne  
**Gravité :** critique  

**Mesures retenues :**
- hardening Linux ;
- SSH par clé uniquement ;
- pare-feu restrictif ;
- supervision Wazuh.

---

## 7. Mesures de sécurité synthétiques

| Risque | Mesures principales |
|------|--------------------|
| Accès non autorisé | WPA2-Enterprise, RADIUS |
| Vol d’identifiants | PEAP, TLS, certif serveur |
| Rupture isolement invité | Guest Network + tests |
| Attaque serveur | Hardening + firewall |
| Manque de visibilité | Logs centralisés, Wazuh |

---

## 8. Risques résiduels

Malgré les mesures mises en place, certains risques résiduels subsistent :
- limites fonctionnelles du routeur TL-MR100 ;
- dépendance à la connectivité 4G ;
- erreurs humaines possibles (mauvaises configs).

Ces risques sont jugés **acceptables** au regard du contexte et des contraintes du projet.

---

## 9. Conclusion

Cette analyse EBIOS simplifiée montre que les principaux risques liés à l’infrastructure Wi-Fi sont correctement identifiés et traités par des mesures techniques adaptées.

L’architecture retenue permet d’atteindre un niveau de sécurité cohérent avec les besoins d’une chaîne de salles de sport multi-sites, tout en respectant les contraintes matérielles et organisationnelles du projet.
