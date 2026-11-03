# AzurRenoPro — Plateforme de gestion pour artisans

AzurRenoPro est une application web destinée aux artisans du bâtiment. Elle permet de présenter leurs prestations, recevoir des demandes de devis, organiser les rendez-vous et gérer leur activité depuis un espace d'administration sécurisé.

Ce projet est développé dans le cadre du **Stage 4 — MVP Development and Execution** du programme Holberton School.

## 1. Fonctionnalités du MVP

### Espace public

- Page d'accueil présentant AzurRenoPro.
- Consultation des services proposés.
- Formulaire de demande de devis.
- Formulaire de prise de rendez-vous.
- Interface responsive adaptée aux ordinateurs et mobiles.

### Espace artisan sécurisé

- Connexion avec authentification JWT.
- Tableau de bord présentant les indicateurs d'activité.
- Consultation et gestion des demandes de devis.
- Modification du statut des demandes de devis.
- Consultation et gestion des rendez-vous.
- Modification du statut des rendez-vous.
- Création et modification des services.
- Activation et désactivation des services.
- Protection des routes privées et contrôle des autorisations.

### Backend et stockage

- API REST développée avec FastAPI.
- Stockage des données dans PostgreSQL.
- Gestion des modèles avec SQLAlchemy.
- Validation des données avec Pydantic.
- Hachage des mots de passe avec Argon2.
- Authentification par tokens JWT.
- Gestion des erreurs HTTP et validation des statuts.

## 2. Technologies utilisées

### Backend

| Technologie | Utilisation |
|---|---|
| Python | Langage principal |
| FastAPI | API REST |
| SQLAlchemy | ORM et accès aux données |
| Pydantic | Validation des données |
| PostgreSQL | Base de données relationnelle |
| Psycopg | Connexion PostgreSQL |
| PyJWT | Gestion des tokens JWT |
| pwdlib[argon2] | Hachage des mots de passe |
| Uvicorn | Serveur ASGI |
| Pytest | Tests automatisés |

### Frontend

| Technologie | Utilisation |
|---|---|
| Next.js | Framework frontend |
| React | Composants d'interface |
| TypeScript | Typage du code |
| Tailwind CSS | Styles et responsive design |
| ESLint | Analyse statique du code |

### DevOps et gestion de projet

| Outil | Utilisation |
|---|---|
| Docker | Conteneurisation |
| Docker Compose | Exécution de PostgreSQL |
| Git | Gestion des versions |
| GitHub | Hébergement du code |
| GitHub Actions | Intégration continue |
| Trello | Organisation Agile |

## 3. Architecture

AzurRenoPro utilise une architecture séparant le frontend, le backend et la base de données.

```text
                  UTILISATEUR
                       |
                       v
             +------------------+
             | Next.js / React  |
             | Frontend         |
             | Port 3000        |
             +------------------+
                       |
                       | HTTP / REST API
                       v
             +------------------+
             | FastAPI          |
             | Backend          |
             | Port 8000        |
             +------------------+
                       |
                       | SQLAlchemy / Psycopg
                       v
             +------------------+
             | PostgreSQL       |
             | Base de données  |
             | Port 5432        |
             +------------------+
```

### Responsabilités

**Frontend :**
- Afficher les pages publiques.
- Gérer les formulaires.
- Communiquer avec l'API.
- Afficher l'espace artisan.
- Transmettre le token JWT aux routes protégées.

**Backend :**
- Exposer les endpoints REST.
- Valider les données.
- Appliquer les règles métier.
- Authentifier les utilisateurs.
- Contrôler les autorisations.
- Communiquer avec PostgreSQL.

**Base de données :**
- Enregistrer les services.
- Enregistrer les demandes de devis.
- Enregistrer les rendez-vous.
- Conserver les comptes utilisateurs.

### Documentation technique

- [Architecture du MVP](docs/architecture.md)
- [Schéma de la base de données](docs/database.md)

## 4. Structure du projet

```text
artisan-platform/
├── .github/
│   └── workflows/
│       └── ci.yml
│
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
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── services/
│   ├── types/
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── architecture.md
│   ├── database.md
│   ├── sprint-review.md
│   ├── sprint-retrospective.md
│   └── deployment.md
│
├── .env.example
├── .gitignore
├── compose.yaml
└── README.md
```

## 5. Base de données

Le MVP utilise quatre entités principales.

### Service

Représente les prestations proposées par l'artisan.

### QuoteRequest

Représente les demandes de devis envoyées par les clients.

Chaque demande peut être associée à un service avec `service_id`.

Statuts possibles :

- `pending`
- `accepted`
- `rejected`
- `completed`

### Appointment

Représente les rendez-vous demandés par les clients.

Statuts possibles :

- `pending`
- `confirmed`
- `cancelled`
- `completed`

### User

Représente les comptes utilisateurs autorisés à accéder au back-office.

Les informations comprennent notamment :

- Identifiant.
- Adresse email.
- Mot de passe haché.
- Rôle utilisateur.
- Date de création.

Le rôle `artisan` permet d'accéder aux fonctionnalités d'administration.

Pour consulter les relations et la structure détaillée des tables :

[Documentation de la base de données](docs/database.md)

## 6. Prérequis

Pour exécuter le projet localement :

- Git.
- Python et `venv`.
- Node.js et npm.
- Docker.
- Docker Compose.

Les ports suivants doivent être disponibles :

| Port | Service |
|---|---|
| 3000 | Frontend Next.js |
| 8000 | Backend FastAPI |
| 5432 | PostgreSQL |

## 7. Installation

### 7.1 Cloner le projet

```bash
git clone https://github.com/adib-commits/artisan-platform.git
cd artisan-platform
```

### 7.2 Configurer l'environnement

Le projet contient un fichier `.env.example` à la racine.

Créer une copie locale :

```bash
cp .env.example .env
```

Renseigner les variables nécessaires au backend et à la connexion PostgreSQL selon la configuration du projet.

La configuration de développement doit notamment permettre :

- La connexion à PostgreSQL via `DATABASE_URL`.
- La configuration d'une clé secrète pour les tokens JWT.

**Important :** ne jamais publier de véritables secrets dans Git.

### 7.3 Installer le backend

Depuis la racine :

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

Sous Windows PowerShell, l'activation de l'environnement virtuel utilise une commande différente.

### 7.4 Installer le frontend

Depuis la racine du projet :

```bash
cd frontend

npm ci
cp .env.example .env.local
```

Configurer l'adresse de l'API dans `frontend/.env.local` :

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

## 8. Lancement du projet

L'application nécessite trois composants :

1. PostgreSQL.
2. FastAPI.
3. Next.js.

### 8.1 Démarrer PostgreSQL

Depuis la racine du projet :

```bash
docker compose up -d
```

Vérifier le conteneur :

```bash
docker compose ps
```

### 8.2 Démarrer FastAPI

Dans un deuxième terminal :

```bash
cd backend
source .venv/bin/activate
python -m uvicorn app.main:app --reload
```

API :

http://127.0.0.1:8000

Documentation Swagger :

http://127.0.0.1:8000/docs

### 8.3 Démarrer Next.js

Dans un troisième terminal :

```bash
cd frontend
npm run dev
```

Application :

http://localhost:3000

### 8.4 Pages principales

| Page | URL |
|---|---|
| Accueil | `/` |
| Services | `/services` |
| Demande de devis | `/quote` |
| Rendez-vous | `/appointment` |
| Connexion artisan | `/login` |
| Tableau de bord | `/dashboard` |
| Gestion des devis | `/dashboard/quotes` |
| Gestion des rendez-vous | `/dashboard/appointments` |
| Gestion des services | `/dashboard/services` |

Les pages du tableau de bord sont destinées à l'artisan authentifié.

## 9. API REST

Le backend utilise FastAPI.

### Authentification

| Méthode | Endpoint | Description | Accès |
|---|---|---|---|
| POST | `/auth/login` | Connexion artisan | Public |
| GET | `/auth/me` | Informations du compte connecté | Artisan |

### Services

| Méthode | Endpoint | Description | Accès |
|---|---|---|---|
| GET | `/services` | Liste des services | Public |
| GET | `/services/{service_id}` | Détails d'un service | Public |
| POST | `/services` | Création d'un service | Artisan |
| PATCH | `/services/{service_id}` | Modification d'un service | Artisan |

### Demandes de devis

| Méthode | Endpoint | Description | Accès |
|---|---|---|---|
| POST | `/quote-requests` | Envoyer une demande | Public |
| GET | `/quote-requests` | Liste des demandes | Artisan |
| GET | `/quote-requests/{quote_id}` | Détails d'une demande | Artisan |
| PATCH | `/quote-requests/{quote_id}` | Modifier le statut | Artisan |

### Rendez-vous

| Méthode | Endpoint | Description | Accès |
|---|---|---|---|
| POST | `/appointments` | Demander un rendez-vous | Public |
| GET | `/appointments` | Liste des rendez-vous | Artisan |
| GET | `/appointments/{appointment_id}` | Détails d'un rendez-vous | Artisan |
| PATCH | `/appointments/{appointment_id}` | Modifier le statut | Artisan |

### Documentation interactive

Swagger permet de consulter et tester les endpoints :

http://127.0.0.1:8000/docs

## 10. Authentification et sécurité

L'authentification du back-office utilise des tokens JWT.

### Fonctionnement

1. L'artisan saisit son email et son mot de passe.
2. Le frontend transmet les identifiants à `/auth/login`.
3. Le backend vérifie le compte et le mot de passe haché.
4. Si les identifiants sont valides, l'API retourne un token JWT.
5. Le frontend utilise ce token pour les requêtes protégées.
6. Le backend vérifie le token et les autorisations de l'utilisateur.

### En-tête d'authentification

```http
Authorization: Bearer <token>
```

### Mesures de sécurité

- Mots de passe hachés avec Argon2.
- Authentification par JWT.
- Validation des entrées avec Pydantic.
- Vérification du rôle `artisan`.
- Protection des opérations d'administration côté backend.
- Configuration sensible conservée dans les variables d'environnement.

Les identifiants et clés secrètes ne doivent pas être enregistrés dans le dépôt Git.

## 11. Tests et assurance qualité

Le projet utilise des tests automatisés et des vérifications techniques.

### Backend — Pytest

Depuis `backend/` :

```bash
source .venv/bin/activate
python -m pytest -v
```

**Dernier résultat confirmé :**

```text
23 passed, 11 warnings
```

Aucun test en échec.

Les tests couvrent notamment :

- Les services.
- Les demandes de devis.
- Les rendez-vous.
- La validation des statuts.
- Les erreurs HTTP 404.
- L'authentification.
- Les identifiants invalides.
- Les routes privées.
- Les autorisations selon le rôle utilisateur.

Les avertissements observés sont des avertissements de dépréciation non bloquants.

### Frontend — Next.js

Depuis `frontend/` :

```bash
npm run lint
npm run build
```

**Dernier résultat confirmé :** compilation de production Next.js réussie, avec vérification TypeScript et génération des pages.

### Vérifications fonctionnelles

Les parcours principaux ont été vérifiés pendant le développement :

- Affichage des services.
- Création de demandes de devis.
- Prise de rendez-vous.
- Communication frontend/backend.
- Enregistrement dans PostgreSQL.
- Connexion artisan.
- Consultation du tableau de bord.
- Gestion des devis, rendez-vous et services.

## 12. Intégration continue

Le projet utilise GitHub Actions.

Workflow :

```text
.github/workflows/ci.yml
```

La CI exécute les vérifications automatisées du backend et du frontend.

```text
GitHub Actions
      |
      +-- Backend Tests
      |      |
      |      +-- Pytest
      |
      +-- Frontend Checks
             |
             +-- npm ci
             +-- ESLint
             +-- Next.js Build
```

La Pull Request #7 a été fusionnée dans `main` après la réussite des quatre vérifications affichées sur GitHub.

## 13. Workflow Git

Le développement est organisé avec des branches dédiées aux fonctionnalités.

Les modifications sont intégrées à l'aide de Pull Requests, puis vérifiées par GitHub Actions.

### Finalisation du MVP

1. Développement des fonctionnalités sur les branches dédiées.
2. Intégration des fonctionnalités sur `feature/mvp-finalization`.
3. Vérification du backend et du frontend.
4. Ouverture de la Pull Request #7.
5. Fusion de la Pull Request vers `main`.

La branche `main` contient la version finale intégrée du MVP.

Dépôt GitHub :

https://github.com/adib-commits/artisan-platform

## 14. Gestion de projet Agile

Le projet a été organisé avec Trello.

Tableau du projet :

https://trello.com/b/rSRIF4Qe/artisan-platform

### Organisation du tableau

```text
Backlog
   |
   v
To Do
   |
   v
In Progress
   |
   v
Code Review
   |
   v
Testing / QA
   |
   v
Done
```

Une liste supplémentaire permet de suivre les bugs.

### Suivi des sprints

Le développement comprend :

- Planification des tâches.
- Réalisation des fonctionnalités.
- Suivi de l'avancement.
- Revue du travail réalisé.
- Identification des difficultés.
- Amélioration du processus de développement.

### Documents Agile

- [Sprint Reviews](docs/sprint-review.md)
- [Sprint Retrospectives](docs/sprint-retrospective.md)

## 15. État du projet

**AzurRenoPro — MVP développé, testé et intégré à la branche `main`.**

### Fonctionnalités livrées

- Interface publique responsive.
- Catalogue de services.
- Formulaire de demande de devis.
- Formulaire de prise de rendez-vous.
- Authentification artisan avec JWT.
- Tableau de bord.
- Gestion des devis.
- Gestion des rendez-vous.
- Gestion des services.
- Persistance PostgreSQL.
- API REST FastAPI.
- Protection des fonctionnalités d'administration.

### Validation technique

- 23 tests backend réussis.
- Compilation de production Next.js réussie.
- Vérifications GitHub Actions réussies.
- Pull Request #7 fusionnée dans `main`.

### Livraison

Le MVP est disponible sous forme de code source sur GitHub :

https://github.com/adib-commits/artisan-platform

L'application peut être exécutée localement avec Docker Compose, FastAPI et Next.js.

Le déploiement en production n'est pas requis pour ce rendu.

## 16. Documentation complémentaire

| Document | Description |
|---|---|
| [Architecture technique](docs/architecture.md) | Architecture du MVP |
| [Base de données](docs/database.md) | Modèles et relations |
| [Sprint Reviews](docs/sprint-review.md) | Bilan des sprints |
| [Sprint Retrospectives](docs/sprint-retrospective.md) | Retours d'expérience |
| [Déploiement](docs/deployment.md) | Stratégie de déploiement |
