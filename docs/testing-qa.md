# Tests et assurance qualité — AzurRenoPro

## 1. Présentation

Ce document présente la stratégie de tests et les résultats des vérifications techniques réalisées sur le MVP AzurRenoPro.

L'objectif est de vérifier la qualité du code, le bon fonctionnement des fonctionnalités principales et la capacité du projet à être exécuté dans un environnement local.

Technologies utilisées :

- Backend : Python, FastAPI, SQLAlchemy et PostgreSQL
- Frontend : Next.js, React, TypeScript et Tailwind CSS
- Tests backend : Pytest
- Analyse statique frontend : ESLint
- Vérification des types : TypeScript
- Build frontend : Next.js
- Intégration continue : GitHub Actions

## 2. Stratégie de tests

La stratégie QA repose sur plusieurs niveaux de vérification :

1. Tests automatisés des routes API.
2. Tests d'authentification et d'autorisation.
3. Vérification de la qualité du code frontend.
4. Vérification des types TypeScript.
5. Compilation du frontend pour la production.
6. Vérification de l'intégration entre les composants.
7. Exécution des contrôles automatisés dans GitHub Actions.

Les résultats présentés ci-dessous correspondent aux commandes exécutées localement.

## 3. Tests backend avec Pytest

### 3.1 Commandes utilisées

Depuis le répertoire `backend` :

```bash
source .venv/bin/activate
python -m pytest -v
```

### 3.2 Résultats

| Module | Tests réussis | Résultat |
|---|---:|---|
| Rendez-vous | 6 | Validé |
| Authentification | 5 | Validé |
| Demandes de devis | 6 | Validé |
| Services | 5 | Validé |
| Health check | 1 | Validé |
| **Total** | **23** | **Validé** |

Résultat Pytest :

```text
23 passed, 11 warnings in 2.88s
```

Tous les tests exécutés ont réussi.

### 3.3 Fonctionnalités vérifiées

**Services**

- Création d'un service.
- Consultation des services.
- Consultation d'un service par identifiant.
- Gestion d'un service inexistant.
- Modification d'un service.

**Demandes de devis**

- Création d'une demande de devis.
- Consultation des demandes.
- Consultation par identifiant.
- Gestion d'une demande inexistante.
- Modification du statut.
- Rejet d'un statut invalide.

**Rendez-vous**

- Création d'un rendez-vous.
- Consultation des rendez-vous.
- Consultation par identifiant.
- Gestion d'un rendez-vous inexistant.
- Modification du statut.
- Rejet d'un statut invalide.

**Authentification et autorisation**

- Connexion avec des identifiants valides.
- Rejet d'un mot de passe incorrect.
- Rejet d'un utilisateur inexistant.
- Protection d'une route sans jeton d'authentification.
- Refus d'accès à un utilisateur ne disposant pas du rôle artisan.

**Health check**

- Vérification de la disponibilité de l'API.

### 3.4 Avertissements

L'exécution a produit 11 avertissements :

- Un avertissement de dépréciation lié à Starlette TestClient et HTTPX.
- Dix avertissements liés à l'utilisation de `datetime.utcnow()` dans les modèles SQLAlchemy.

Ces avertissements n'ont entraîné aucun échec de test.

Ils constituent des points d'amélioration technique pour les prochaines versions.

## 4. Vérifications frontend

### 4.1 ESLint

Commande exécutée :

```bash
cd frontend
npm run lint
```

Résultat :

```text
> frontend@0.1.0 lint
> eslint
```

La commande s'est terminée sans erreur signalée.

**Statut : validé.**

### 4.2 Build Next.js

Commande exécutée :

```bash
npm run build
```

Environnement :

- Next.js 16.4.0
- Turbopack
- TypeScript
- Variables d'environnement chargées depuis `.env.local`

Résultats observés :

```text
Compiled successfully in 3.0s
Finished TypeScript in 11.7s
Generating static pages (12/12)
Finalizing page optimization
```

Le build de production s'est terminé avec succès.

**Statut : validé.**

### 4.3 Routes générées

Les routes suivantes figurent dans le résultat du build :

| Route | Fonction |
|---|---|
| `/` | Page d'accueil |
| `/appointment` | Demande de rendez-vous |
| `/dashboard` | Tableau de bord artisan |
| `/dashboard/appointments` | Gestion des rendez-vous |
| `/dashboard/quotes` | Gestion des devis |
| `/dashboard/services` | Gestion des services |
| `/login` | Connexion artisan |
| `/quote` | Demande de devis |
| `/services` | Consultation des services |

Next.js génère les pages statiques et prépare la route dynamique `/services` pour un rendu côté serveur à la demande.

## 5. Sécurité et contrôle d'accès

Le MVP intègre les mécanismes suivants :

- Authentification artisan avec JWT.
- Hachage des mots de passe avec Argon2.
- Vérification des jetons sur les routes privées.
- Contrôle d'autorisation selon le rôle utilisateur.
- Séparation des fonctionnalités publiques et privées.

Les tests automatisés confirment notamment le rejet des connexions invalides et des accès non autorisés.

Ces contrôles ne constituent pas un audit de sécurité complet.

## 6. Intégration frontend, backend et base de données

L'architecture du projet repose sur le flux suivant :

```text
Utilisateur
    |
    v
Frontend Next.js
    |
    | Requêtes HTTP
    v
API FastAPI
    |
    | SQLAlchemy / Psycopg
    v
PostgreSQL
```

Les principaux parcours fonctionnels à vérifier sont :

- Consultation des services disponibles.
- Envoi d'une demande de devis.
- Demande de rendez-vous.
- Connexion de l'artisan.
- Consultation du tableau de bord.
- Gestion des demandes de devis.
- Gestion des rendez-vous.
- Gestion des services.

Les résultats Pytest et du build ne suffisent pas, à eux seuls, à confirmer l'exécution complète de ces parcours dans un navigateur avec PostgreSQL.

Les validations manuelles doivent être consignées séparément avec leurs résultats et, si possible, des captures d'écran.

## 7. Intégration continue — GitHub Actions

Le projet possède un workflow GitHub Actions destiné à automatiser les contrôles qualité.

Les vérifications prévues comprennent :

- Tests backend avec Pytest.
- Analyse du code frontend avec ESLint.
- Compilation du frontend Next.js.

Les résultats de chaque exécution sont consultables dans l'onglet **Actions** du dépôt GitHub.

Une exécution réussie sur la branche `main` doit être vérifiée pour confirmer le statut de la CI après les dernières modifications.

## 8. Suivi des anomalies

Le suivi des tâches et des anomalies est organisé dans Trello.

Tableau du projet :

https://trello.com/b/rSRIF4Qe/artisan-platform

Les colonnes utilisées comprennent notamment :

- Backlogs
- To Do
- In Progress
- Code Review
- Testing/QA
- Done
- Bugs

Les anomalies identifiées peuvent être documentées, corrigées puis validées avant le passage des tâches dans la colonne Done.

## 9. Limites et améliorations possibles

Les améliorations envisagées sont :

- Ajouter des tests automatisés frontend.
- Mettre en place des tests end-to-end avec Playwright.
- Ajouter des tests d'intégration avec une base PostgreSQL dédiée.
- Mesurer la couverture du code.
- Corriger les avertissements de dépréciation.
- Renforcer les tests de sécurité.
- Automatiser davantage les vérifications des parcours utilisateurs.

## 10. Bilan QA

| Vérification | Résultat |
|---|---|
| Tests backend Pytest | 23/23 réussis |
| Authentification et autorisation | Tests réussis |
| ESLint frontend | Validé |
| Vérification TypeScript | Validé |
| Build Next.js | Validé |
| Génération des pages | 12/12 |
| Tests end-to-end automatisés | Non réalisés |
| CI sur la dernière version de `main` | À confirmer |

**Conclusion :**

Les 23 tests backend ont réussi et les vérifications techniques frontend se sont terminées sans erreur.

Ces résultats apportent des preuves de qualité technique pour le MVP AzurRenoPro et sa documentation Stage 4.

La validation complète des parcours fonctionnels et la confirmation de la dernière exécution CI restent à documenter.
