# Dossier d’architecture  
**SAE 5.01 – Archi Wi-Fi sécurisée multi-sites**  
BUT Réseaux & Télécommunications – Parcours Cyber  
Année univ. 2025–2026  

---

## 1. Contexte.

La chaîne de salles de sport exploitée par l’entreprise dispose de plusieurs sites distincts.  
Chaque salle est équipée d’un accès Internet autonome reposant sur un routeur 4G **TP-Link TL-MR100**.

La direction souhaite homogénéiser et sécuriser l’infra Wi-Fi de l’ensemble des sites, tout en centralisant l’authentification, la supervision et la journalisation sur un serveur Linux unique situé au siège (ou dans un petit DC).

Le projet est conçu comme un **modèle reproductible**, applicable à l’ensemble des salles de sport.

---

## 2. Objectifs de sécu et contraintes

### 2.1 Objectifs
- Mettre en place une auth Wi-Fi sécurisée pour les employés.
- Fournir un accès Wi-Fi invité strictement isolé du réseau interne.
- Centraliser la gestion des comptes et la supervision.
- Réduire la surface d’attaque du serveur central.

### 2.2 Contraintes
- Routeur imposé : **TP-Link TL-MR100**.
- Accès Internet via 4G (NAT, pas d’IP publique fixe).
- Ne pas utiliser Active Directory, daloRADIUS ou une solution clé en main.
- Infra basée sur une install Linux standard.

---

## 3. Architecture générale multi-sites

Chaque site distant repose sur un routeur MR100 configuré de manière identique.  
L’authentification, la supervision et la journalisation sont **centralisées** sur un serveur Linux.

### 3.1 Visualisation:

Clients Wi-Fi  
├─ SSID « Entreprise » → WPA2-Enterprise (802.1X)  
└─ SSID « Invités » → Accès Internet uniq.  
  │  
Routeur TP-Link TL-MR100  
  │  
├─ RADIUS (UDP 1812/1813)  
├─ Syslog (UDP 514)  
└─ Internet 4G  
  │  
Serveur Linux central  
├─ FreeRADIUS + MariaDB  
├─ Interface PHP d’admin  
├─ Wazuh Manager  
└─ Journalisation centralisée  

---

## 4. Wi-Fi Entreprise : auth. 802.1X

### 4.1 Choix technique

Le SSID **« Entreprise »** repose sur une auth. **WPA2-Enterprise (802.1X)** avec la méthode **PEAP-MSCHAPv2**.

Ce choix permet :
- une auth. par login + MDP ;
- la protection des identifiants via un tunnel TLS ;
- l’absence de certifs côté client, ce qui facilite le déploiement multi-sites.

### 4.2 Chaîne d’auth. PEAP-MSCHAPv2

1. Le client se connecte au SSID « Entreprise ».
2. Le MR100 relaie la demande d’auth. vers le serveur RADIUS.
3. FreeRADIUS présente un certif serveur.
4. Un tunnel TLS (PEAP) est établi.
5. Les identifiants sont transmis de manière chiffrée.
6. FreeRADIUS vérifie les infos dans la base MariaDB.
7. L’accès est autorisé ou refusé.

### 4.3 Rôle du certificat serveur

Le certif serveur permet :
- d’authentifier le serveur RADIUS auprès des clients ;
- d’éviter les attaques de type *Evil Twin* ;
- de chiffrer les échanges d’authentification.

Aucun certif client n’est requis, ce qui réduit la complexité globale.

---

## 5. Gestion des comptes RADIUS

Les comptes utilisateurs sont stockés dans une base **MariaDB** centralisée.  
Une interface **PHP minimale** permet :
- l’ajout et la suppression de comptes ;
- l’affichage des users ;
- la journalisation des actions admin.

Les requêtes SQL sont paramétrées afin d’éviter les injections SQL.

---

## 6. Réseau Wi-Fi Invités et analyse du TL-MR100

### 6.1 Fonctions du réseau invité

Le routeur MR100 propose un SSID « Guest Network » permettant :
- un SSID dédié ;
- un accès Internet uniquement ;
- un isolement auto du réseau interne.

Cependant, ce mécanisme ne repose pas sur un vrai cloisonnement VLAN, mais sur des règles internes au routeur.

### 6.2 Analyse du mécanisme d’isolement

Les tests réalisés montrent que :
- les clients invités ne peuvent pas atteindre le LAN interne ;
- les requêtes ARP vers le LAN échouent ;
- les tentatives de ping, traceroute ou scan de ports sont bloquées ;
- seuls les flux vers Internet sont autorisés.

Ces résultats ont été validés via des tests réseau (tcpdump, nmap, etc.).

### 6.3 Limites identifiées

- Pas de VLAN configurables.
- Peu de visibilité sur les règles internes.
- Fonctions de filtrage assez limitées.

### 6.4 Archi retenue

Malgré ces limites, le mécanisme d’isolement du MR100 est jugé acceptable dans le cadre du projet, sous réserve :
- d’une supervision renforcée ;
- de l’absence de services internes exposés sur le routeur.

---

## 7. Supervision et journaux

Le serveur central intègre **Wazuh** afin de :
- collecter les logs du système Linux ;
- recevoir les journaux du MR100 via syslog ;
- corréler les événements de sécu ;
- générer des alertes.

Cette supervision améliore la détection d’incidents et la traçabilité.

---

## 8. Sécurisation du serveur central

Le serveur Linux est durci selon les bonnes pratiques :
- désactivation des services inutiles ;
- SSH par clé, login root désactivé ;
- pare-feu restrictif ;
- permissions strictes sur les fichiers sensibles ;
- journalisation centralisée.

Le détail du hardening est documenté dans `hardening-linux.md`.

---

## 9. Justification globale des choix

| Élément | Justification |
|-------|---------------|
| WPA2-Enterprise | Plus sécu que WPA2-PSK |
| PEAP-MSCHAPv2 | Déploiement simple sans certifs clients |
| Centralisation | Gestion multi-sites plus efficace |
| TL-MR100 conservé | Contrainte réaliste du terrain |
| Wazuh | Supervision open-source robuste |
| PHP minimal | Maîtrise et contrôle du code |

---

## 10. Conclusion

L’archi proposée répond aux objectifs de sécu, de simplicité de déploiement et de reproductibilité multi-sites.  
Elle constitue une solution réaliste pour une chaîne de salles de sport souhaitant renforcer la sécu de son Wi-Fi tout en gardant des coûts maîtrisés.
