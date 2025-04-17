# Billed – Application de gestion de notes de frais

Projet réalisé dans le cadre du parcours **Développeur Front-End** chez **OpenClassrooms**.

---

## 🎯 Objectif du projet

Suite au départ d’une développeuse, vous reprenez en main une application de gestion de notes de frais interne (SaaS). Votre mission est de :

- Corriger les bugs sur le parcours employé et administrateur
- Mettre en place des tests unitaires et d’intégration avec Jest
- Utiliser Chrome Debugger pour identifier et résoudre les erreurs
- Documenter toutes les étapes de vérification dans un fichier `tests.md`

---

## 🚀 Installation et lancement

### 🔧 Back-end (API Express + base SQLite)

```bash
cd Billed-app-FR-Back
npm install
npm run start
```

> L’API tourne sur `http://localhost:5678`

### 💻 Front-end (HTML/CSS/JS avec Jest)

```bash
cd Billed-app-FR-Front
npm install
npm run test         # Lance tous les tests Jest
```

> Utiliser Live Server ou un équivalent pour lancer le fichier `index.html`

---

## 👤 Comptes de connexion

| Rôle        | Email               | Mot de passe |
|-------------|---------------------|--------------|
| Employé     | employee@test.tld   | employee     |
| Administrateur RH | admin@test.tld       | admin        |

---

## ✅ Fonctionnalités testées

### Employé :
- Création de nouvelle note de frais
- Vérification du type de fichier justificatif (image uniquement)
- Soumission du formulaire
- Redirection vers `/bills`
- Affichage des notes soumises
- Visualisation des justificatifs via l’icône œil

### Administrateur :
- Chargement complet du dashboard
- Tri des notes par statut (en attente, acceptée, refusée)
- Dépliage des sections via les flèches
- Ouverture d’un détail de note (formulaire à droite)
- Validation / refus d’une note
- Affichage du justificatif dans une modale
- Résilience face aux erreurs API (404, 500)

> 🐞 Chrome Debugger utilisé à chaque étape de débogage

---

## 🧪 Tests Jest

- 100 % des tests fournis passent ✅
- Couverture globale : **> 80 %**
- Fichier `tests.md` mis à jour avec le détail des tests manuels

```bash
npm run test
```

---

## 📁 Structure du projet

```
Billed-app/
├── Billed-app-FR-Back         # API Express + SQLite
│   └── server.js, database, etc.
├── Billed-app-FR-Front        # Front HTML/CSS/JS
│   ├── src/
│   │   ├── app/
│   │   ├── containers/
│   │   ├── views/
│   │   ├── constants/
│   │   ├── __tests__/
│   ├── tests.md               # ✅ Plan de test manuel
│   ├── README.md              # 📘 Ce fichier
```

---

## 📝 Remarques complémentaires

- Projet testé avec Chrome Debugger (breakpoints sur chaque action clé)
- Aucun test fourni n’a été modifié, uniquement du débogage fonctionnel
- Déploiement local uniquement, aucune dépendance front à bundler

---
