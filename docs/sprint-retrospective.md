# Sprint Retrospective - MVP Finalization

## Ce qui s'est bien passé

- Le backend FastAPI est fonctionnel et correctement connecté à PostgreSQL.
- Les fonctionnalités principales du MVP ont été développées.
- Le frontend Next.js communique correctement avec l'API.
- Les demandes de devis et les rendez-vous sont enregistrés dans la base de données.
- Les 18 tests backend passent avec succès.
- ESLint et le build Next.js passent sans erreur.
- GitHub Actions permet maintenant de vérifier automatiquement le projet.
- Le workflow Git avec les branches `feature`, `develop` et `main` a permis de structurer le développement.
- Trello a permis de suivre les différentes tâches du projet.

## Difficultés rencontrées

- Configuration initiale de l'environnement Python et du virtual environment.
- Mise en place et connexion de PostgreSQL avec Docker.
- Quelques erreurs d'import et de structure pendant le développement du backend.
- Configuration de la communication entre Next.js et FastAPI.
- Problèmes de serveur Next.js lors de certains tests locaux.
- Problèmes de prerendering pendant le build Next.js.
- Configuration du Personal Access Token pour pouvoir ajouter le workflow GitHub Actions.

## Solutions apportées

- Utilisation d'un environnement virtuel Python dédié au backend.
- Utilisation de Docker Compose pour PostgreSQL.
- Séparation du backend en modèles, schemas, routes et configuration.
- Ajout de CORS pour permettre la communication frontend/backend.
- Utilisation d'une variable d'environnement pour l'adresse de l'API.
- Validation du frontend avec ESLint et le build de production.
- Ajout de tests Pytest pour les principales routes API.
- Mise en place d'une CI GitHub Actions.

## Améliorations possibles

- Ajouter une authentification pour l'artisan.
- Ajouter un véritable back-office de gestion.
- Améliorer la gestion des erreurs côté frontend.
- Ajouter davantage de tests frontend.
- Ajouter des migrations de base de données.
- Améliorer la sécurité et la gestion des secrets.
- Mettre en place le déploiement en production.

## Conclusion

Le sprint a permis d'obtenir un MVP fonctionnel, testé et documenté.

Les principales fonctionnalités prévues pour cette première version sont opérationnelles. Le projet dispose également d'une base technique permettant de poursuivre son évolution avec de nouvelles fonctionnalités.
