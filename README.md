# Artisan Platform

Artisan Platform est une application web destinée aux artisans permettant de présenter leurs services, recevoir des demandes de devis et gérer les prises de rendez-vous.

Le projet est développé dans le cadre du **Stage 4 - MVP Development and Execution**.

## Fonctionnalités du MVP

Le MVP permet actuellement de :

- consulter les services proposés ;
- envoyer une demande de devis ;
- prendre un rendez-vous ;
- enregistrer les demandes dans une base PostgreSQL ;
- consulter et modifier les données via l'API FastAPI ;
- utiliser l'application sur ordinateur et mobile grâce à une interface responsive.

## Technologies utilisées

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL
- Psycopg
- Pytest
- Uvicorn

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint

### DevOps et gestion de projet

- Docker
- Docker Compose
- Git
- GitHub
- GitHub Actions
- Trello

## Architecture

L'application utilise une architecture frontend/backend séparée.

```text
Utilisateur
    |
    v
Next.js / React
Port 3000
    |
    | HTTP / REST API
    v
FastAPI
Port 8000
    |
    | SQLAlchemy
    v
PostgreSQL
Port 5432
```

### Documentation technique

La documentation détaillée de l'architecture et de la base de données est disponible ici :

- [Architecture du MVP](docs/architecture.md)
- [Schéma de la base de données](docs/database.md)

## Structure du projet

```text
artisan-platform/
├── .github/
│   └── workflows/
│       └── ci.yml
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── main.py
│   ├── tests/
│   └── requirements.txt
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── types/
│   ├── public/
│   ├── .env.example
│   └── package.json
├── compose.yaml
└── README.md
```

## Base de données

Le MVP utilise trois entités principales :

- **Service** : représente les prestations proposées par l'artisan.
- **QuoteRequest** : représente les demandes de devis envoyées par les clients.
- **Appointment** : représente les rendez-vous demandés par les clients.

Une demande de devis est associée à un service grâce à `service_id`.

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/adib-commits/artisan-platform.git
cd artisan-platform
```

### 2. Installer le backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

### 3. Installer le frontend

```bash
cd ../frontend
npm ci
cp .env.example .env.local
```

Le frontend utilise la variable :

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

## Lancement du projet

### PostgreSQL

Depuis la racine du projet :

```bash
docker compose up -d
```

### FastAPI

Depuis `backend/` :

```bash
source .venv/bin/activate
python -m uvicorn app.main:app --reload
```

API :

```text
http://127.0.0.1:8000
```

Swagger :

```text
http://127.0.0.1:8000/docs
```

### Next.js

Depuis `frontend/` :

```bash
npm run dev
```

Application :

```text
http://localhost:3000
```

## API

Les principales ressources de l'API sont :

```text
/services
/quote-requests
/appointments
```

Elles permettent de gérer les services, les demandes de devis et les rendez-vous.

## Tests et QA

### Backend

Les tests automatisés sont exécutés avec Pytest :

```bash
cd backend
python -m pytest -v
```

État actuel :

```text
18 tests passed
```

Les tests couvrent notamment les services, les devis, les rendez-vous, les erreurs 404 et la validation des statuts.

### Frontend

Les vérifications sont exécutées avec :

```bash
cd frontend
npm run lint
npm run build
```

Le parcours complet a également été testé :

```text
Next.js → FastAPI → SQLAlchemy → PostgreSQL
```

Les demandes de devis et les rendez-vous créés depuis le frontend ont été vérifiés via Swagger.

## Intégration continue

Le projet utilise **GitHub Actions**.

Le workflow `.github/workflows/ci.yml` exécute automatiquement :

```text
Backend Tests
└── Pytest

Frontend Checks
├── npm ci
├── ESLint
└── Next.js production build
```

La CI est exécutée lors des push et Pull Requests concernés par le workflow.

## Workflow Git

Le projet utilise le workflow suivant :

```text
feature/*
    ↓
develop
    ↓
main
```

Les fonctionnalités sont développées sur des branches dédiées puis intégrées avec des Pull Requests.

## Gestion du projet

Le projet est organisé avec Trello :

```text
Backlog
   ↓
To Do
   ↓
In Progress
   ↓
Code Review
   ↓
Testing / QA
   ↓
Done
```

Le développement est organisé en sprints comprenant des Sprint Reviews et Sprint Retrospectives.

## État du projet

Le MVP permet actuellement de :

- consulter les services ;
- envoyer une demande de devis ;
- prendre un rendez-vous ;
- enregistrer les données dans PostgreSQL ;
- communiquer entre Next.js et FastAPI ;
- utiliser l'application sur desktop et mobile ;
- exécuter automatiquement les tests et vérifications avec GitHub Actions.

Le projet est actuellement en phase de **finalisation, documentation, QA et préparation au déploiement**.
