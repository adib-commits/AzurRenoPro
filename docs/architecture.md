# Architecture du MVP

## Architecture générale

```mermaid
flowchart TD
    U[Utilisateur]

    subgraph Frontend
        N[Next.js / React]
        UI[Pages et composants]
        API_CLIENT[Services API TypeScript]
    end

    subgraph Backend
        F[FastAPI]
        R[Routes API]
        S[Pydantic Schemas]
        O[SQLAlchemy ORM]
    end

    subgraph Database
        P[(PostgreSQL)]
    end

    U -->|Navigateur| N
    N --> UI
    UI --> API_CLIENT

    API_CLIENT -->|HTTP / REST| F
    F --> R
    R --> S
    R --> O

    O -->|SQL| P
```

## Flux principal

L'utilisateur interagit avec l'interface développée avec **Next.js, React et TypeScript**.

Le frontend communique avec **FastAPI** via une API REST. FastAPI valide les données avec **Pydantic**, puis utilise **SQLAlchemy** pour communiquer avec la base **PostgreSQL**.

Le flux général est donc :

```text
Utilisateur
    ↓
Next.js / React
    ↓
Services API TypeScript
    ↓ HTTP
FastAPI
    ↓
Pydantic / SQLAlchemy
    ↓
PostgreSQL
```
