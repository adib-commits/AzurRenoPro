# Schéma de la base de données

Le MVP utilise trois entités principales : `Service`, `QuoteRequest` et `Appointment`.

```mermaid
erDiagram
    SERVICE ||--o{ QUOTE_REQUEST : concerne

    SERVICE {
        int id PK
        string name
        string description
        boolean active
    }

    QUOTE_REQUEST {
        int id PK
        int service_id FK
        string customer_name
        string email
        string phone
        string work_type
        float surface
        string description
        string status
        datetime created_at
    }

    APPOINTMENT {
        int id PK
        string customer_name
        string email
        string phone
        date appointment_date
        time appointment_time
        string status
        datetime created_at
    }
```

## Relations

Une demande de devis (`QuoteRequest`) est associée à un service (`Service`) grâce à la clé étrangère `service_id`.

Les rendez-vous (`Appointment`) sont indépendants des demandes de devis dans le MVP actuel.
