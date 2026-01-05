# Analyse de risques — EBIOS ANSSI (simplifiée)

---

## VERSION AVANT MANIPS

### 1. Contexte

Le projet concerne une chaîne de salles de sport disposant de plusieurs sites géographiques.  
Chaque site est équipé d’un routeur 4G **TP-Link TL-MR100** fournissant l’accès Internet et la diffusion de deux réseaux Wi-Fi :

- un Wi-Fi **Entreprise** sécurisé en **WPA2-Enterprise (PEAP-MSCHAPv2)** ;
- un Wi-Fi **Invités**, destiné au public et isolé du réseau interne.

L’authentification, la supervision et la journalisation sont centralisées sur un **serveur Linux unique** hébergeant :
- FreeRADIUS ;
- MariaDB ;
- une interface Web PHP minimale ;
- la solution de supervision **Wazuh**.

Cette analyse est réalisée en phase de conception, avant le déploiement complet de l’infrastructure.

---

### 2. Actifs essentiels

| Actif | Description | Criticité |
|------|-------------|-----------|
| Identités RADIUS | Comptes du personnel | Élevée |
| Serveur Linux central | Authentification et supervision | Élevée |
| Base MariaDB | Identifiants et secrets | Élevée |
| Wi-Fi Entreprise | Accès au SI interne | Élevée |
| Wi-Fi Invités | Accès Internet public | Moyenne |
| Journaux Wazuh | Détection d’incidents | Élevée |

---

### 3. Sources de menaces

- Attaquant externe tentant d’accéder au Wi-Fi Entreprise  
- Utilisateur malveillant connecté au Wi-Fi Invités  
- Compromission d’identifiants utilisateurs  
- Mauvaise configuration du routeur TL-MR100  
- Absence ou défaut de supervision  
- Exploitation d’un service exposé sur le serveur Linux  

---

### 4. Scénarios de menace

**Scénario 1 : Vol d’identifiants Wi-Fi**  
Un attaquant tente d’intercepter ou de deviner des identifiants afin d’accéder au Wi-Fi Entreprise.

**Scénario 2 : Accès au LAN depuis le Wi-Fi Invités**  
Un utilisateur cherche à atteindre des ressources internes depuis le réseau invité.

**Scénario 3 : Force brute sur le service RADIUS**  
Un attaquant multiplie les tentatives d’authentification pour compromettre des comptes.

**Scénario 4 : Compromission du serveur central**  
L’exploitation d’un service inutile ou mal sécurisé permet un accès non autorisé.

---

### 5. Mesures de sécurité retenues

- Authentification **WPA2-Enterprise (PEAP-MSCHAPv2)**  
- Tunnel TLS basé sur un certificat serveur FreeRADIUS  
- Séparation des SSID Entreprise et Invités  
- Isolement du réseau invité via le TL-MR100  
- Centralisation des comptes dans MariaDB  
- Supervision et journalisation via Wazuh  
- Durcissement du serveur Linux (SSH, pare-feu, services)  
- Interface PHP minimale avec requêtes SQL paramétrées  

---

### 6. Conclusion

Les risques identifiés concernent principalement l’authentification Wi-Fi, l’isolement du réseau invité et la protection du serveur central.  
Les mesures retenues permettent de réduire ces risques à un niveau acceptable dans le contexte du projet.

---
