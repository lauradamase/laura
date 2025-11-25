# Comment modifier ton site

Salut Laura ! Voici comment modifier ton site. Tout se fait dans un seul fichier : **`content.json`**

---

## Comment modifier le fichier

### Étape 1 : Ouvrir le fichier

1. Va sur **github.com** et connecte-toi
2. Ouvre ton dépôt **laura**
3. Clique sur le fichier **`content.json`**
4. Clique sur l'icône **crayon** (✏️) en haut à droite

### Étape 2 : Fais tes modifications (voir sections ci-dessous)

### Étape 3 : Sauvegarder

1. Clique sur **"Commit changes..."** (bouton vert)
2. Écris un petit message (ex: "Mise à jour portfolio")
3. Clique sur **"Commit changes"**

**C'est tout !** Le site se met à jour automatiquement en ~1 minute.

---

## Ce que tu peux modifier

### 1. Ton nom et ta description

```json
"site": {
  "firstName": "Laura",
  "lastName": "Damase",
  "subtitle": "RÉALISATRICE & FILMMAKER"
}
```

Change le texte entre les guillemets !

---

### 2. Tes réseaux sociaux

```json
"social": [
  { "platform": "instagram", "url": "https://www.instagram.com/lauradamase/" },
  { "platform": "linkedin", "url": "https://www.linkedin.com/in/laura-damase-89477b84/" },
  { "platform": "x-twitter", "url": "https://x.com/arualesamad" }
]
```

**Plateformes disponibles :**
- `instagram`
- `linkedin`
- `x-twitter`
- `facebook`
- `youtube`
- `tiktok`
- `vimeo`

**Pour ajouter un réseau :**
```json
{ "platform": "youtube", "url": "https://youtube.com/@tachaine" }
```

---

### 3. Les catégories / filtres

```json
"categories": [
  { "id": "all", "label": "SÉLECTION" },
  { "id": "documentaires", "label": "DOCUMENTAIRES" },
  { "id": "reportages", "label": "REPORTAGES" },
  { "id": "films", "label": "FILMS" }
]
```

**Pour ajouter une catégorie :**
```json
{ "id": "clips", "label": "CLIPS" }
```

⚠️ Le `id` doit être en minuscules, sans espaces ni accents.
Le `label` c'est ce qui s'affiche sur le site.

---

### 4. Les projets du portfolio

Chaque projet ressemble à ça :

```json
{
  "title": "L'HOMME ET LA VALLÉE",
  "category": "reportages",
  "description": "France 2 · 13h15 · 2025",
  "image": "https://...",
  "link": "https://..."
}
```

| Champ | Description |
|-------|-------------|
| `title` | Le titre (EN MAJUSCULES) |
| `category` | Doit correspondre à un `id` de catégorie |
| `description` | Texte sous le titre (chaîne · type · année) |
| `image` | URL de l'image |
| `link` | Lien vers la vidéo |

**Pour ajouter un nouveau projet :**

Copie ce bloc et ajoute-le dans la liste `portfolio` :

```json
,
{
  "title": "TITRE DU PROJET",
  "category": "reportages",
  "description": "Chaîne · Type · Année",
  "image": "https://url-de-image.jpg",
  "link": "https://url-de-la-video.com"
}
```

---

## Où trouver des URLs d'images ?

### Pour une vidéo YouTube :
```
https://img.youtube.com/vi/CODE_VIDEO/maxresdefault.jpg
```
Remplace `CODE_VIDEO` par le code de ta vidéo YouTube.
(C'est le texte après `v=` dans l'URL YouTube)

**Exemple :** Pour `https://youtu.be/OrXnviLXPdI`
→ L'image est : `https://img.youtube.com/vi/OrXnviLXPdI/maxresdefault.jpg`

### Pour France TV / France Info :
Fais clic droit sur l'image → "Copier l'adresse de l'image"

---

## Attention aux erreurs !

**Ne pas oublier :**
- Les guillemets `"` autour de chaque valeur
- Les virgules `,` entre chaque élément
- **Pas de virgule** après le dernier élément d'une liste

**Exemple correct :**
```json
"portfolio": [
  { "title": "PROJET 1", ... },
  { "title": "PROJET 2", ... },
  { "title": "PROJET 3", ... }
]
```
(Pas de virgule après PROJET 3 !)

---

## Besoin d'aide ?

Si le site ne fonctionne plus après une modification :

1. Va sur **jsonlint.com**
2. Colle tout le contenu de ton fichier
3. Clique sur "Validate JSON"
4. Il te dira où est l'erreur !

---

## Résumé : Structure du fichier

```json
{
  "site": {
    "firstName": "...",
    "lastName": "...",
    "subtitle": "..."
  },

  "social": [
    { "platform": "...", "url": "..." }
  ],

  "categories": [
    { "id": "...", "label": "..." }
  ],

  "portfolio": [
    {
      "title": "...",
      "category": "...",
      "description": "...",
      "image": "...",
      "link": "..."
    }
  ]
}
```
