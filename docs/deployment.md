# Deployment Strategy

## Objectif

Cette stratégie décrit le déploiement du MVP Artisan Platform dans un environnement accessible en ligne.

## Architecture de déploiement

Utilisateur
↓
Vercel
↓
Frontend Next.js
↓
Render Web Service
↓
Backend FastAPI
↓
Render PostgreSQL

Le dépôt GitHub reste la source principale du projet et GitHub Actions assure les vérifications automatiques avant le déploiement.

## Frontend

Le frontend Next.js sera déployé sur Vercel.

Variable d'environnement :

NEXT_PUBLIC_API_URL=<URL_BACKEND_RENDER>

Cette variable permet au frontend de communiquer avec l'API FastAPI déployée.

## Backend

Le backend FastAPI sera déployé comme Web Service sur Render.

Commande de démarrage :

uvicorn app.main:app --host 0.0.0.0 --port $PORT

Variable d'environnement principale :

DATABASE_URL=<URL_POSTGRESQL_RENDER>

## Base de données

PostgreSQL sera hébergé sur Render PostgreSQL.

Le backend utilisera la variable DATABASE_URL fournie par l'environnement de production afin de se connecter à la base de données.

## CORS

Le backend doit autoriser le domaine du frontend Vercel afin que le navigateur puisse communiquer avec l'API.

En développement :

http://localhost:3000

En production :

https://<domaine-vercel>

## CI/CD

GitHub Actions vérifie automatiquement le projet avec notamment :

- les tests backend ;
- les vérifications frontend ;
- le lint ;
- le build de production.

Le déploiement ne doit être effectué qu'après validation des vérifications CI.

## Workflow

Developer
↓
Feature branch
↓
Pull Request
↓
GitHub Actions
↓
Tests / Lint / Build
↓
Merge
↓
Deployment

## Services retenus

- GitHub : gestion du code source et Pull Requests
- GitHub Actions : intégration continue
- Vercel : hébergement du frontend Next.js
- Render : hébergement de l'API FastAPI
- Render PostgreSQL : base de données

## État

La stratégie de déploiement du MVP est définie.

Le déploiement effectif et la configuration des variables d'environnement de production constituent les prochaines étapes.
