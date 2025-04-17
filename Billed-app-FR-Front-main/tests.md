## 🧪 Plan de tests - Projet Billed

Ce document regroupe tous les tests implémentés dans le projet Billed, accompagnés de leur objectif fonctionnel, leur contexte et leur portée. Il est mis à jour au fur et à mesure de l'avancement.

---

### ✅ Parcours Employé

#### 1. Affichage du formulaire NewBill
- **Fichier :** `NewBill.js`
- **Composant testé :** `NewBillUI`
- **Objectif :** S'assurer que le formulaire de création d'une note de frais s'affiche correctement lorsque l'utilisateur est sur la page `/new-bill`.
- **Vérification :** Le formulaire contenant l'attribut `data-testid="form-new-bill"` est présent dans le DOM.

#### 2. Soumission du formulaire appelle updateBill()
- **Fichier :** `NewBill.js`
- **Composant testé :** `NewBill`
- **Objectif :** Vérifier que la méthode `updateBill()` est bien appelée lors de la soumission du formulaire.
- **Contexte :** L'utilisateur a rempli le formulaire avec des données valides, un fichier image est déjà présent.
- **Moyen :** `jest.spyOn()` sur la méthode `updateBill` + `fireEvent.submit()` sur le formulaire.

#### 3. Blocage des fichiers non image
- **Fichier :** `NewBill.js`
- **Composant testé :** `NewBill`
- **Objectif :** Empêcher l'utilisateur de téléverser un fichier qui n'est pas une image (type `.pdf`, `.txt`, etc.)
- **Contexte :** L'utilisateur sélectionne un fichier via le champ `input[type="file"]`.
- **Vérifications :**
  - Si le fichier est une image, il est accepté (le champ contient le fichier).
  - Si le fichier n'est pas une image, le champ est vidé et `window.alert()` est appelée.

#### 4. Redirection vers la page Bills après soumission
- **Fichier :** `NewBill.js`
- **Composant testé :** `NewBill`
- **Objectif :** S'assurer que l'utilisateur est redirigé vers la page `/bills` après avoir soumis une note valide.
- **Approche :**
  - Utilisation d'un mock de `onNavigate`
  - Vérification que `onNavigate(ROUTES_PATH.Bills)` a été appelé via `jest.fn()`

---

### 🧪 Utilisation de Chrome Debugger

L'outil Chrome Debugger a été utilisé de manière intensive tout au long du projet pour identifier, comprendre et corriger les problèmes de comportement dans le parcours employé.

#### 🔍 Objectifs du debugger :
- Inspecter l'état du DOM et vérifier la présence ou l'absence d'éléments 
- Suivre l'exécution pas à pas des méthodes JavaScript
- Comprendre les interactions entre les fichiers `NewBill.js`, `store.js`, `Router.js` et le backend

#### 🧷 Points d'arrêt placés dans les fichiers suivants :

- **`NewBill.js`**
  - Ligne `handleSubmit()` : pour vérifier la construction de l'objet `bill` avant envoi
  - Ligne `updateBill()` : pour inspecter l'appel au `store.bills().update()`
  - Ligne `handleChangeFile()` : pour comprendre la validation du fichier uploadé

- **`Router.js`**
  - Ligne de redirection `root.innerHTML = BillsUI(...)` pour observer la navigation

- **`Bills.js`**
  - Ligne `this.store.bills().list()` : utile pour vérifier les appels backend et la récupération des données (test de redirection)

#### 🧰 Mode de test :
- Les tests Jest ne permettent pas l'utilisation directe du debugger dans la console
- Chrome Debugger a donc été utilisé dans le navigateur via `npm run start` et navigation manuelle sur `/new-bill`
- La console JS et les breakpoints ont permis de corriger les problèmes avant d'écrire les tests
- Les tests ont ensuite été exécutés via `npm run test` pour valider les modifications apportées
- Les tests de Jest ont été exécutés dans le terminal pour vérifier la couverture de code et les erreurs potentielles



### Parcours Admin


### ✅ Test manuel : Connexion Administrateur

- **Page testée** : `/login`
- **But** : Vérifier que le login admin fonctionne correctement (redirection + stockage utilisateur)
- **Procédure** :
  1. Aller sur la page `http://127.0.0.1:8080`
  2. Dans le bloc "Administration", entrer :
     - Email : `admin@test.tld`
     - Mot de passe : admin
  3. Cliquer sur "Se connecter"

- **Comportement attendu** :
  - Redirection vers la page Dashboard (`/dashboard`)
  - La variable `localStorage.getItem("user")` doit contenir un objet avec :
    ```json
    {
      "type": "Admin",
      "email": "admin@test.tld",
      "status": "connected"
    }
    ```

- **Bug détecté au départ** :
  - Les champs de formulaire utilisaient `employee-email-input` et `employee-password-input` au lieu de `admin-*`
  - Cela provoquait une erreur `Cannot read properties of null (reading 'value')`

- **Correction apportée** :
  - Les sélecteurs de `handleSubmitAdmin` ont été modifiés :
    ```js
    email: e.target.querySelector(`input[data-testid="admin-email-input"]`).value,
    password: e.target.querySelector(`input[data-testid="admin-password-input"]`).value,
    ```

- **Fichier modifié** : `src/containers/Login.js`

- **Commit associé** : `fix: correction des sélecteurs pour la connexion admin`

---
### ✅ Chargement du Dashboard (admin)

- **Page** : /dashboard
- **Comportement attendu** :
  - L'admin est redirigé vers le dashboard après connexion
  - Les notes de frais sont récupérées via `getBillsAllUsers()`
  - Les sections sont visibles (En attente, Acceptée, Refusée)

- **Debugger** :
  - Point d’arrêt sur `getBillsAllUsers()` dans `Dashboard.js`
  - Vérification du contenu de `snapshot` (tableau de 9 factures)

- **Statut** : ✅ Fonctionnel
- **Commit** : `test(debug): vérification affichage et chargement dashboard admin`

### ✅ Ouverture d’une facture (clic sur carte)

- **Page** : /dashboard
- **Comportement attendu** :
  - Cliquer sur une carte `open-bill<ID>` affiche le formulaire de la note sélectionnée dans la colonne de droite
- **Debugger** :
  - Point d’arrêt dans `handleEditTicket()`
  - Vérification que le `billId` correspond bien à la carte cliquée
  - Le `data-testid="dashboard-form"` devient visible
- **Statut** : ✅ Fonctionnel
- **Commit** : `test(debug): vérification ouverture des factures via open-bill`
