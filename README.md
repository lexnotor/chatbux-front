<!--markdownlint-disable no-inline-html-->
<!-- markdownlint-disable no-blanks-blockquote-->
<h1 align="center">ChatBux App</h1>
<div align="center">
    <img src="https://github.com/lexnotor/chatbux-front/raw/c40fc04159b7ea67d46f32d3ceb73544033b76d2/src/assets/chat.png" alt="Computer Programmer Cartoon Png" width="100px"/>
</div>

<p>
    ChatBux est une application basique de messagerie en temps réel. La partie frontend est écrite en React (Initialisée avec Vite). Le partie backend utilise le framework ExpressJS comme serveur.
</p>

> Dés qu'un utilisateur est incrit, il peut recevoir et envoyer à tous les autres utilisateurs inscrits sur le site. Vous n'avez pas besoin d'envoyer une invitation pour discuter avec un autre utilisateur.

# Installation

L'application est écrite en JavaScript, elle sera executée dans un environement Node. Il est impératif d'avoir Node et NPM d'installer.

* Créer un dossier du projet

```bash
mkdir chatbux
cd chatbux
```

* Cloner les repositories (**backend et frontend**) avec la ligne de commande
  
```bash
git clone https://github.com/lexnotor/chatbux-back.git backend
git clone https://github.com/lexnotor/chatbux-front.git frontend
```

* Installer les modules necessaires. Entrer dans les deux sous dossiers (**frontend et backend**) et executer la commande
  
```bash
cd backend
npm install
cd ../frontend
npm install
```

* Ajouter les fichiers **.env** dans les deux sous dossiers

```chatbux/backend/.env```
  
```bash
MONGODB_URI="MONDODB_DATABASE_CONNEXION_STRING"
FRONTEND_URI="URL_FROM_WHICH_THE_BACKEND_WILL_ACCEPT_REQUEST"
CLOUD_NAME="CLOUDINAY_API_CLOUD_AME"
API_KEY="CLOUDINAY_API_API_KEY"
API_SECRET="CLOUDINAY_API_API_SECRET"
```

```chatbux/frontend/.env```
  
```bash
VITE_BACKEND_URL='URL_LOCATE_THE_BACKEND'
```

> S'assurer que l'utilisateur Mongodb utiliser a le droit de lire et ecrire dans la base de données selectionnée. Cette base de données doit contenir deux collections (users et chats).
>

> S'assurer d'avoir un compte sur cloudinary, ceci permettra de rendre les images persistantes

# Execution

L'execution du projet se passe en 2 étapes; la première est de lancer l'application backend, et la seconde est de lancer l'application frontend. Assurer vous que les ports 3500 et 5173 ne sont pas utilisés.

* Démarrer l'application backend

```bash
cd backend
npm start
```

* Démarrer l'application frontend

```bash
cd frontend
npm start
```

* Enfin, Ouvrir le lien de l'application dans un navigateur.

# Ressources

* [PassportJS documentation](https://www.passportjs.org/docs/)
* [React Documetation](https://fr.reactjs.org/)
* [Chatbux API Documentation](https://documenter.getpostman.com/view/23647859/2s8YzP2Q3T)