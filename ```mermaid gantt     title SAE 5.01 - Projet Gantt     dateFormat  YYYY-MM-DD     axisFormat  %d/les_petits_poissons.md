```mermaid
gantt
    title SAE 5.01 - Projet Gantt
    dateFormat  YYYY-MM-DD
    axisFormat  %d/%m

    section Création et préparation
    creation d'un git partager    :s0, 2025-12-01, 1d
    diagramme topologie           :s1, 2025-12-01, 1d

    section Mise en place et développement
    mise en place RADIUS          :s2, 2025-12-02, 14d
    Wazuh                         :s3, 2025-12-16, 10d

    section Sécurisation et tests
    hardening linux               :s4, 2025-12-26, 12d
    segmentation WI-FI            :s5, 2025-12-16, 10d
    obtenir une borne             :s6, 2025-12-15, 1d

    section Finalisation
    nettoyage du GitLab           :s7, 2026-01-07, 2d
```
