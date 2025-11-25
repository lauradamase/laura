# Comment modifier ton site

Salut Laura ! Voici comment ajouter ou modifier des projets sur ton site.

---

## Modifier le contenu

### Étape 1 : Ouvrir le fichier

1. Va sur **github.com** et connecte-toi
2. Ouvre ton dépôt **laura**
3. Clique sur le fichier **`content.json`**
4. Clique sur l'icône **crayon** (✏️) en haut à droite pour éditer

### Étape 2 : Modifier un projet existant

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

**Ce que tu peux changer :**
- `title` → Le titre affiché (EN MAJUSCULES)
- `category` → La catégorie : `documentaires`, `reportages`, ou `films`
- `description` → Le texte sous le titre (chaîne · émission · année)
- `image` → L'URL de l'image
- `link` → Le lien vers la vidéo

### Étape 3 : Ajouter un nouveau projet

Copie ce bloc et colle-le après une virgule :

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

### Étape 4 : Sauvegarder

1. Clique sur **"Commit changes..."** (bouton vert)
2. Écris un petit message (ex: "Ajout nouveau projet")
3. Clique sur **"Commit changes"**

**C'est tout !** Le site se met à jour automatiquement en ~1 minute.

---

## Où trouver des URLs d'images ?

### Pour une vidéo YouTube :
```
https://img.youtube.com/vi/CODE_VIDEO/maxresdefault.jpg
```
Remplace `CODE_VIDEO` par le code de ta vidéo YouTube.
(C'est le texte après `v=` dans l'URL YouTube)

### Pour France TV / France Info :
Fais clic droit sur l'image → "Copier l'adresse de l'image"

---

## Attention !

**Ne pas oublier :**
- Les guillemets `"` autour de chaque valeur
- Les virgules `,` entre chaque projet
- Pas de virgule après le dernier projet

**Exemple correct :**
```json
{
  "portfolio": [
    { "title": "PROJET 1", ... },
    { "title": "PROJET 2", ... },
    { "title": "PROJET 3", ... }
  ]
}
```
(Pas de virgule après le dernier !)

---

## Besoin d'aide ?

Si le site ne fonctionne plus après une modification, c'est probablement :
- Une virgule manquante ou en trop
- Un guillemet oublié

Va sur **jsonlint.com**, colle ton contenu, et il te dira où est l'erreur !
