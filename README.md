
# 🎬 API Filmothèque - R6.05

## 📖 Présentation du projet

Cette API permet de gérer une **bibliothèque de films** et **les favoris des utilisateurs**.  
Elle inclut :
- La gestion **des utilisateurs** (inscription, connexion, rôles).
- La gestion **des films** (ajout, modification, suppression).
- La gestion **des favoris** (ajouter/retirer des films favoris).
- **Notifications par email** lors de l'ajout/modification d'un film.
- **Export CSV des films** envoyé par email via un **message broker**.

---

## 🚀 Installation et Setup

### 1️⃣ **Cloner le projet : **
```git clone https://github.com/LacroixEnzo/iut-nodejs-tp-projet.git ```

### 2️⃣ **Installer les dépendances**
À la racine du projet cloné : 

```npm i```

### 3️⃣ **Lancer MySQL avec Docker**

Puis au même endroit avec docker desktop de lancé en parallèle : 

```docker run -d --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -p 3307:3306 mysql:8.0 --default-authentication-plugin=mysql_native_password```

### 4️⃣ **Créer un fichier .env**

Ajoutez ce fichier .env à la racine du projet :

```
# Email sender variables 
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=lorena29@ethereal.email
SMTP_PASS=gByjXp4p22YEXeD8Dc

# Database variables
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=hapi
DB_DATABASE=user
DB_PORT=3307

# Port variable
PORT=3000
```

### 5️⃣ **Authentification et Permissions**

L’API utilise un système JWT avec deux rôles :

Utilisateur (user) → Gère ses favoris et consulte les films.
- Administrateur (admin) → Gère les films et peut exporter les données.
- Authentification
Création de compte et connexion via JWT.
- Ajout du token dans Swagger via le bouton Authorize.
- Les utilisateurs peuvent être promus en admin (nécessite les droits).

### 6️⃣ **Activer Redis pour l’export CSV**
L’export CSV fonctionne via une file d’attente Redis.

Lancer Redis avec Docker : 
```docker run -d --name redis-server -p 6379:6379 redis```

Une fois Redis actif, les admins peuvent demander un export CSV, qui sera envoyé par email automatiquement.


### 7️⃣ **Lancer le projet**

Une fois tout configuré, démarrez l’API au même endroit avec :

```npm start```

### L’API tourne maintenant sur http://localhost:3000.

Toutes les routes et fonctionnalités sont documentées sur Swagger :
➡️ http://localhost:3000/documentation

📌 L'API est prête à être testée et utilisée ! 🚀

