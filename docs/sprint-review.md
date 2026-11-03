# Sprint Review — AzurRenoPro MVP Finalization

## 1. Objectif du sprint

Finaliser le MVP AzurRenoPro, intégrer les fonctionnalités publiques et l'espace artisan sécurisé, vérifier le fonctionnement global de l'application et préparer sa livraison sur la branche `main`.

## 2. Fonctionnalités terminées

### Backend

- API REST développée avec FastAPI.
- Gestion des services.
- Gestion des demandes de devis.
- Gestion des rendez-vous.
- Authentification artisan avec JWT.
- Hachage des mots de passe avec Argon2.
- Protection des endpoints privés.
- Contrôle des autorisations selon le rôle utilisateur.
- Validation des données avec Pydantic.
- Persistance avec SQLAlchemy et PostgreSQL.

### Frontend

- Interface Next.js avec TypeScript et Tailwind CSS.
- Page d'accueil.
- Catalogue des services.
- Formulaire de demande de devis.
- Formulaire de prise de rendez-vous.
- Page de connexion artisan.
- Tableau de bord d'administration.
- Gestion des demandes de devis et de leurs statuts.
- Gestion des rendez-vous et de leurs statuts.
- Création, modification et activation/désactivation des services.
- Interface responsive.
- Communication avec l'API FastAPI.

### Tests et QA

- 23 tests backend Pytest réussis.
- Aucun test backend en échec.
- Build Next.js de production réussi.
- Vérifications GitHub Actions réussies.
- Vérifications fonctionnelles des parcours principaux.
- Validation des opérations de lecture et d'écriture dans PostgreSQL.

### DevOps

- PostgreSQL exécuté avec Docker Compose.
- Gestion du code avec Git et GitHub.
- Intégration continue avec GitHub Actions.
- Vérification automatique du backend et du frontend.
- Intégration des fonctionnalités par Pull Requests.

### Documentation

- README finalisé.
- Architecture technique documentée.
- Schéma de base de données documenté.
- Endpoints REST documentés.
- Documentation de l'authentification et des autorisations.
- Suivi Agile sur Trello.

## 3. Démonstration du MVP

Le parcours fonctionnel du MVP comprend :

1. Consultation de la page d'accueil.
2. Consultation des services proposés.
3. Envoi d'une demande de devis.
4. Prise de rendez-vous.
5. Connexion à l'espace artisan.
6. Consultation du tableau de bord.
7. Gestion des demandes de devis.
8. Gestion des rendez-vous.
9. Gestion des services.

Les données sont transmises du frontend Next.js vers FastAPI, puis enregistrées dans PostgreSQL.

## 4. Résultats de la validation

| Vérification | Résultat |
|---|---|
| Tests backend Pytest | 23 réussis |
| Compilation Next.js | Réussie |
| Vérifications GitHub Actions | Réussies |
| Intégration frontend/backend | Validée pendant le développement |
| Persistance PostgreSQL | Validée pendant le développement |
| Authentification artisan | Implémentée et testée |
| Protection des routes privées | Implémentée et testée |
| Intégration GitHub | Pull Request #7 fusionnée |

## 5. Livrables du sprint

- Code source du MVP.
- Frontend Next.js.
- Backend FastAPI.
- Base PostgreSQL.
- Tests automatisés.
- Workflow GitHub Actions.
- Documentation technique.
- Tableau Trello actualisé.

Dépôt GitHub :

https://github.com/adib-commits/AzurRenoPro

Tableau Trello :

https://trello.com/b/rSRIF4Qe/artisan-platform

## 6. Bilan du sprint

Les fonctionnalités prévues pour la finalisation du MVP ont été intégrées.

Le projet dispose désormais d'une interface publique, d'une API REST, d'une base de données persistante et d'un espace artisan sécurisé.

Les tests backend et les vérifications de compilation ont été réalisés avec succès.

## 7. État du sprint

**Sprint validé — MVP finalisé et intégré à `main`.**

Le déploiement en production n'est pas requis pour ce rendu.

Le projet est prêt pour la revue technique du Stage 4.
