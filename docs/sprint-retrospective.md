# Sprint Retrospective — AzurRenoPro MVP Finalization

## 1. Objectif de la rétrospective

Analyser le déroulement du développement du MVP AzurRenoPro, identifier les réussites, les difficultés rencontrées, les solutions apportées et les améliorations possibles pour les prochaines versions.

## 2. Ce qui s'est bien passé

### Développement backend

- L'API FastAPI est fonctionnelle et connectée à PostgreSQL.
- Les services, les demandes de devis et les rendez-vous sont gérés par l'API.
- L'authentification artisan avec JWT a été implémentée.
- Les mots de passe sont hachés avec Argon2.
- Les endpoints privés sont protégés par des vérifications d'authentification et d'autorisation.
- Le backend est organisé en routes, modèles, schémas et modules de configuration.

### Développement frontend

- Le frontend Next.js communique avec l'API FastAPI.
- Les pages publiques sont fonctionnelles.
- Les formulaires de devis et de rendez-vous transmettent les données au backend.
- Une page de connexion artisan a été créée.
- Un tableau de bord permet de gérer les services, les devis et les rendez-vous.
- L'interface est adaptée aux ordinateurs et aux mobiles.

### Tests et qualité

- 23 tests backend ont été exécutés avec succès.
- Aucun test backend n'a échoué.
- Le build de production Next.js a réussi.
- Les vérifications GitHub Actions ont été validées.
- Les parcours fonctionnels principaux ont été vérifiés pendant le développement.

### Organisation et gestion de projet

- Trello a facilité le suivi des tâches.
- Les branches Git ont permis de séparer les fonctionnalités.
- Les Pull Requests ont facilité l'intégration du code.
- La Pull Request #7 a permis de finaliser l'intégration du MVP dans `main`.
- La documentation technique a été mise à jour.

## 3. Difficultés rencontrées

### Environnement de développement

- Configuration initiale de Python et de l'environnement virtuel.
- Installation et configuration des dépendances.
- Configuration de PostgreSQL avec Docker Compose.
- Gestion des variables d'environnement.

### Backend

- Erreurs d'importation et d'organisation des modules Python.
- Configuration de la connexion à PostgreSQL.
- Intégration de l'authentification JWT.
- Protection des routes privées.
- Gestion des autorisations de l'artisan.

### Frontend

- Configuration de la communication entre Next.js et FastAPI.
- Problèmes de serveur Next.js pendant certains tests locaux.
- Difficultés liées au prerendering lors du build.
- Intégration du formulaire de connexion et des pages protégées.

### Git et intégration continue

- Configuration des permissions nécessaires aux workflows GitHub Actions.
- Gestion des branches et des Pull Requests.
- Résolution de conflits Git pendant l'intégration.
- Synchronisation de la branche locale `main` avec GitHub.

## 4. Solutions apportées

| Difficulté | Solution |
|---|---|
| Environnement Python | Utilisation d'un environnement virtuel dédié |
| Configuration PostgreSQL | Utilisation de Docker Compose |
| Organisation du backend | Séparation en routes, modèles, schémas et configuration |
| Communication frontend/backend | Configuration CORS et variable `NEXT_PUBLIC_API_URL` |
| Authentification | Utilisation de JWT et Argon2 |
| Autorisations | Vérification des tokens et du rôle `artisan` côté backend |
| Erreurs de compilation | Corrections du frontend et validation avec `npm run build` |
| Qualité du backend | Ajout de tests automatisés Pytest |
| Intégration continue | Configuration de GitHub Actions |
| Conflits Git | Résolution des conflits et utilisation du rebase |
| Suivi du projet | Organisation des tâches avec Trello |

## 5. Améliorations possibles

### Qualité et maintenance

- Ajouter des tests automatisés pour les composants frontend.
- Développer des tests de bout en bout avec Playwright.
- Améliorer la gestion des erreurs et les messages utilisateur.
- Ajouter des migrations de base de données avec Alembic.
- Renforcer la gestion des secrets et la configuration des environnements.
- Améliorer la journalisation et la surveillance de l'application.

### Fonctionnalités futures

- Création de comptes clients.
- Génération de devis PDF.
- Notifications automatiques par email.
- Stockage de photos des réalisations.
- Signature électronique des devis.
- Paiement en ligne.
- Gestion des factures.
- Notifications SMS.
- Statistiques avancées.
- Application mobile.
- Assistant IA.

Ces fonctionnalités restent dans le backlog et ne font pas partie du MVP livré.

### Déploiement

- Préparer un environnement de production.
- Configurer HTTPS.
- Sécuriser les variables d'environnement.
- Automatiser les migrations et les sauvegardes.

Le déploiement en production n'est pas requis pour le rendu actuel.

## 6. Enseignements retenus

Le développement d'AzurRenoPro a permis de renforcer plusieurs compétences :

- Concevoir une architecture frontend/backend séparée.
- Développer une API REST avec FastAPI.
- Gérer une base de données relationnelle avec PostgreSQL.
- Mettre en place une authentification sécurisée.
- Intégrer un frontend Next.js avec une API.
- Automatiser les tests avec GitHub Actions.
- Utiliser Git et les Pull Requests pour intégrer les fonctionnalités.
- Organiser le développement avec une méthode Agile et Trello.
- Documenter et valider un MVP avant sa livraison.

## 7. Conclusion

Le sprint de finalisation a permis de livrer un MVP AzurRenoPro comprenant :

- Une interface publique.
- Un catalogue de services.
- Des formulaires de devis et de rendez-vous.
- Une API REST FastAPI.
- Une base de données PostgreSQL.
- Une authentification artisan.
- Un tableau de bord sécurisé.
- Des fonctionnalités de gestion des devis, rendez-vous et services.

**Résultats techniques :**

- 23 tests backend réussis.
- Build Next.js réussi.
- Vérifications GitHub Actions réussies.
- MVP intégré à la branche `main`.

Le projet dispose d'une base technique fonctionnelle, testée et documentée.

**État final : Sprint validé — MVP prêt pour la revue technique du Stage 4.**
