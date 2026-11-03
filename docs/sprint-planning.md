# Sprint Planning — AzurRenoPro

## 1. Présentation

Ce document présente l'organisation du développement du MVP AzurRenoPro dans le cadre du Stage 4 — MVP Development and Execution du programme Holberton School.

AzurRenoPro est une plateforme web permettant aux artisans de présenter leurs services, recevoir des demandes de devis, gérer les rendez-vous et administrer leur activité depuis un espace sécurisé.

Le développement a été organisé autour de quatre sprints fonctionnels.

Ce document récapitule les objectifs, les tâches et les résultats du projet. Il ne constitue pas un historique daté des réunions de planification.

## 2. Méthodologie Agile

Le projet utilise une organisation inspirée de Scrum et de Kanban.

Les tâches sont suivies sur Trello et le code source est versionné avec Git et GitHub.

### Tableau Trello

[Artisan Platform — Trello](https://trello.com/b/rSRIF4Qe/artisan-platform)

Le tableau comporte les colonnes suivantes :

- Backlogs
- To Do
- In Progress
- Code Review
- Testing/QA
- Done
- Bugs

### Gestion des tâches

Chaque tâche peut être suivie à travers les différentes étapes de développement :

1. Définition du besoin.
2. Planification de la tâche.
3. Développement.
4. Vérification du code.
5. Tests et assurance qualité.
6. Validation et clôture.

## 3. Sprint 1 — Initialisation et architecture

### Objectif

Mettre en place les fondations techniques du projet AzurRenoPro.

### Tâches

- Initialiser le dépôt GitHub.
- Définir la structure frontend/backend.
- Configurer FastAPI.
- Initialiser Next.js avec TypeScript.
- Configurer Tailwind CSS.
- Préparer PostgreSQL avec Docker Compose.
- Configurer SQLAlchemy et Psycopg.
- Définir les modèles de données principaux.
- Documenter l'architecture générale.

### Livrables

- Structure initiale du dépôt.
- Backend FastAPI.
- Frontend Next.js.
- Base PostgreSQL.
- Documentation d'architecture.

### Critères de validation

- Le backend démarre correctement.
- Le frontend démarre correctement.
- PostgreSQL est accessible.
- Les composants techniques peuvent communiquer.

### Résultat

Les fondations du projet ont été mises en place et ont permis de commencer le développement des fonctionnalités métier.

## 4. Sprint 2 — Fonctionnalités publiques

### Objectif

Permettre aux visiteurs de consulter les services et d'envoyer des demandes à l'artisan.

### Tâches

#### Backend

- Développer les endpoints des services.
- Développer les endpoints des demandes de devis.
- Développer les endpoints des rendez-vous.
- Ajouter les schémas de validation Pydantic.
- Enregistrer les données dans PostgreSQL.
- Gérer les erreurs et les validations.

#### Frontend

- Créer la page d'accueil.
- Créer la page des services.
- Créer le formulaire de demande de devis.
- Créer le formulaire de rendez-vous.
- Connecter les formulaires à FastAPI.
- Adapter l'interface aux écrans mobiles.

### Livrables

- Catalogue des services.
- Formulaire de devis.
- Formulaire de rendez-vous.
- API REST fonctionnelle.
- Enregistrement des données dans PostgreSQL.

### Critères de validation

- Les services sont consultables.
- Les formulaires transmettent les données à l'API.
- Les données sont enregistrées dans PostgreSQL.
- Les erreurs de validation sont prises en charge.

### Résultat

Les fonctionnalités publiques du MVP ont été développées et intégrées.

## 5. Sprint 3 — Authentification et back-office

### Objectif

Créer un espace sécurisé permettant à l'artisan d'administrer son activité.

### Tâches

#### Authentification

- Ajouter le modèle `User`.
- Implémenter le hachage des mots de passe avec Argon2.
- Développer l'endpoint `/auth/login`.
- Développer l'endpoint `/auth/me`.
- Implémenter l'authentification JWT.
- Vérifier le rôle `artisan`.
- Protéger les endpoints privés.

#### Back-office

- Créer la page de connexion.
- Créer le tableau de bord artisan.
- Afficher les informations de suivi.
- Développer la gestion des demandes de devis.
- Développer la gestion des rendez-vous.
- Développer la gestion des services.
- Permettre la modification des statuts.
- Permettre l'activation et la désactivation des services.

### Livrables

- Authentification artisan.
- Routes API protégées.
- Tableau de bord.
- Gestion des devis.
- Gestion des rendez-vous.
- Gestion des services.

### Critères de validation

- Un artisan peut se connecter avec des identifiants valides.
- Les identifiants incorrects sont refusés.
- Les opérations privées nécessitent un JWT valide.
- Le backend contrôle le rôle utilisateur.
- Les modifications effectuées dans le back-office sont enregistrées.

### Résultat

L'authentification JWT et le back-office artisan ont été intégrés au MVP.

## 6. Sprint 4 — Intégration finale et QA

### Objectif

Vérifier le fonctionnement global du MVP et préparer sa livraison.

### Tâches

#### Tests

- Exécuter les tests backend Pytest.
- Vérifier les endpoints publics.
- Vérifier l'authentification et les autorisations.
- Tester les erreurs HTTP.
- Vérifier les validations des statuts.
- Exécuter ESLint.
- Vérifier le build Next.js.
- Contrôler la communication frontend/backend.

#### Intégration continue

- Configurer GitHub Actions.
- Automatiser les tests backend.
- Automatiser les vérifications frontend.
- Vérifier les Pull Requests avant intégration.

#### Documentation

- Finaliser le README.
- Documenter l'architecture.
- Documenter la base de données.
- Compléter les Sprint Reviews.
- Compléter les Sprint Retrospectives.
- Préparer les livrables du Stage 4.

#### Gestion du projet

- Vérifier les tâches Trello.
- Clôturer les tâches terminées.
- Conserver les fonctionnalités futures dans le backlog.
- Intégrer les fonctionnalités finales à la branche `main`.

### Livrables

- MVP intégré à `main`.
- Tests automatisés.
- Workflow GitHub Actions.
- Documentation technique.
- Tableau Trello actualisé.

### Critères de validation

- Les tests backend passent.
- Le frontend compile en production.
- Les vérifications GitHub Actions réussissent.
- Les fonctionnalités principales sont intégrées.
- La documentation correspond au MVP livré.
- Le dépôt GitHub est synchronisé.

### Résultat

Les vérifications effectuées ont confirmé :

- 23 tests backend réussis.
- Build Next.js de production réussi.
- Vérifications GitHub Actions réussies lors de l'intégration finale.
- Fonctionnalités intégrées dans `main`.
- Documentation du projet actualisée.

## 7. Répartition des responsabilités

Le développement du MVP a été réalisé individuellement.

Les responsabilités couvertes comprennent :

| Rôle | Responsabilités |
|---|---|
| Project Manager | Planification et suivi des tâches |
| Frontend Developer | Interface Next.js et intégration API |
| Backend Developer | API FastAPI et logique métier |
| Database Developer | Modèles SQLAlchemy et PostgreSQL |
| QA | Tests et validation des fonctionnalités |
| SCM | Branches Git, commits et Pull Requests |
| DevOps | Docker Compose et GitHub Actions |

## 8. Suivi des risques

| Risque | Mesure prévue ou appliquée |
|---|---|
| Erreurs de configuration PostgreSQL | Utilisation de Docker Compose |
| Problèmes de communication frontend/backend | Configuration CORS et URL d'API |
| Régressions après modification du code | Tests Pytest et vérifications frontend |
| Accès non autorisé au back-office | JWT et contrôle du rôle artisan |
| Problèmes d'intégration Git | Branches dédiées et Pull Requests |
| Documentation obsolète | Actualisation pendant la finalisation |

## 9. Definition of Done

Une fonctionnalité est considérée comme terminée lorsque :

- Le développement prévu est réalisé.
- Le code est intégré à la structure du projet.
- Les vérifications pertinentes ont été effectuées.
- Les erreurs bloquantes identifiées sont corrigées.
- La documentation est actualisée si nécessaire.
- La tâche est déplacée dans `Done` sur Trello.

## 10. Évolutions hors MVP

Les fonctionnalités suivantes restent dans le backlog :

- Comptes clients.
- Génération de devis PDF.
- Emails automatiques.
- Paiement en ligne.
- Signature électronique.
- Notifications SMS.
- Facturation.
- Application mobile.
- Fonctionnalités d'intelligence artificielle.

Ces éléments ne font pas partie des critères de livraison du MVP actuel.

## 11. Conclusion

L'organisation en quatre sprints a permis de structurer le développement d'AzurRenoPro depuis l'initialisation technique jusqu'à l'intégration finale.

Le MVP comprend les fonctionnalités publiques, l'authentification artisan, le back-office, la persistance PostgreSQL et les vérifications automatisées.

Le code source est disponible sur GitHub :

[AzurRenoPro](https://github.com/adib-commits/AzurRenoPro)

Le déploiement en production n'est pas requis pour ce rendu.

**État : synthèse de planification du MVP pour le Stage 4.**
