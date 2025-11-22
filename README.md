# 😊 Reconnaissance d'Émotions Faciales

Application web qui détecte les émotions sur les visages à partir d'images. Nous avons créé un modèle personnalisé basé sur **MobileNetV2**, entraîné et affiné (fine-tuned) sur notre propre dataset d'émotions.

## 📋 Ce que fait l'application

L'application peut reconnaître **7 émotions différentes** :
- 😠 Colère (Angry)
- 🤢 Dégoût (Disgust)
- 😨 Peur (Fear)
- 😊 Joie (Happy)
- 😢 Tristesse (Sad)
- 😲 Surprise (Surprise)
- 😐 Neutre (Neutral)

## 🛠️ Installation

### Étape 1 : Prérequis

Vous devez avoir installé sur votre ordinateur :
- **Python 3.8 ou plus récent**
- **Node.js 18 ou plus récent** (avec npm)
- **Git**

### Étape 2 : Télécharger le projet

```bash
# Cloner le projet
git clone https://github.com/abdellatifabb/FacialEmotionRecognition.git
cd FacialEmotionRecognition
```

### Étape 3 : Installer les dépendances Python (pour l'API)

```bash
# Aller dans le dossier api
cd api

# Installer les bibliothèques Python nécessaires
pip install fastapi uvicorn tensorflow numpy pillow python-multipart
```

### Étape 4 : Installer les dépendances Node.js (pour le frontend)

```bash
# Aller dans le dossier frontend
cd ../frontend

# Installer les dépendances
npm install
```

## 🚀 Lancer l'application

### Étape 1 : Démarrer le serveur API (Backend)

Ouvrez un **premier terminal** :

```bash
# Aller dans le dossier api
cd api

# Lancer le serveur FastAPI
uvicorn predictEmotions:app --reload
```

✅ **Le serveur API démarre sur** : `http://localhost:8000`

Vous verrez un message comme :
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
```

> **Important** : Laissez ce terminal ouvert ! Le serveur doit tourner en continu.

### Étape 2 : Démarrer l'interface web (Frontend)

Ouvrez un **deuxième terminal** :

```bash
# Aller dans le dossier frontend
cd frontend

# Lancer l'application Next.js
npm run dev
```

✅ **L'interface web démarre sur** : `http://localhost:3000`

Vous verrez un message comme :
```
- Local:        http://localhost:3000
- Ready in 2.3s
```

## 🧪 Tester l'application

### Test complet

1. **Ouvrez votre navigateur web** (Chrome, Firefox, Safari, etc.)

2. **Allez sur** : `http://localhost:3000`

3. **Téléchargez une image** :
   - Cliquez sur la zone de téléchargement
   - OU glissez-déposez une image
   - L'image doit contenir un visage

4. **Regardez le résultat** :
   - L'émotion détectée s'affiche avec un emoji 😊
   - Le niveau de confiance s'affiche avec une barre de progression
   - Le pourcentage indique la certitude de la prédiction

### Test de l'API seule

Si vous voulez tester uniquement l'API, ouvrez votre navigateur sur :

```
http://localhost:8000/docs
```

Cela ouvre l'interface Swagger où vous pouvez tester l'API directement.

Vous pouvez aussi tester avec curl :

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@chemin/vers/votre/image.jpg"
```

## 📁 Structure du projet

```
facialRecognition/
│
├── api/                          # Backend (API Python)
│   ├── predictEmotions.py        # Code principal de l'API
│   └── mobilenetv2_emotion.keras # Modèle d'IA entraîné
│
├── frontend/                     # Frontend (Interface web)
│   ├── app/
│   │   ├── page.tsx              # Page principale
│   │   ├── layout.tsx            # Layout de l'application
│   │   └── globals.css           # Styles CSS
│   ├── package.json              # Dépendances Node.js
│   └── README.md                 # Documentation frontend
│
└── README.md                     # Ce fichier
```

## ⚙️ Technologies utilisées

### Backend (API)
- **FastAPI** : Framework web Python rapide
- **TensorFlow** : Bibliothèque d'intelligence artificielle
- **MobileNetV2** : Modèle de deep learning pour la reconnaissance
- **Uvicorn** : Serveur ASGI pour Python

### Frontend (Interface)
- **Next.js 14** : Framework React moderne
- **TypeScript** : JavaScript avec typage
- **TailwindCSS** : Framework CSS pour le style
- **Lucide React** : Icônes modernes

## 🔧 Résolution des problèmes courants

### Problème : "Port 8000 déjà utilisé"

Si le port 8000 est déjà utilisé, lancez l'API sur un autre port :

```bash
uvicorn predictEmotions:app --reload --port 8001
```

Puis modifiez l'URL dans `frontend/app/page.tsx` ligne 53.

### Problème : "Module not found"

Pour l'API :
```bash
cd api
pip install -r requirements.txt
```

Pour le frontend :
```bash
cd frontend
npm install
```

### Problème : "Erreur de connexion à l'API"

1. Vérifiez que le serveur API tourne sur `http://localhost:8000`
2. Testez avec : `curl http://localhost:8000/docs`
3. Vérifiez qu'aucun firewall ne bloque la connexion

### Problème : "Le modèle n'est pas trouvé"

Assurez-vous que le fichier `mobilenetv2_emotion.keras` est dans le dossier `api/`.

## 📝 Notes importantes

- **Gardez les deux terminaux ouverts** pendant l'utilisation
- Pour arrêter les serveurs : appuyez sur `CTRL + C` dans chaque terminal
- Les prédictions sont plus précises avec des images de bonne qualité
- L'image doit contenir un visage clairement visible

## 🎯 Fonctionnalités

- ✅ Téléchargement d'images (clic ou glisser-déposer)
- ✅ Détection automatique de l'émotion
- ✅ Affichage avec emoji correspondant
- ✅ Barre de progression pour le niveau de confiance

## 📄 Licence

Ce projet est à usage éducatif.

---

**Bon test ! 🚀**
