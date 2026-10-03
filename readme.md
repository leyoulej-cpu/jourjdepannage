# Jour J Dépannage — site vitrine

Site statique (HTML, CSS, JavaScript), sans dépendance ni étape de compilation.
Direction artistique A, « Précision technique ».

## Structure

```
index.html        Accueil
services.html     Services (plomberie, électricité, serrurerie)
contact.html      Contact (appel + formulaire)
merci.html        Confirmation après envoi du formulaire
assets/css/style.css   Styles (couleurs et tailles en haut du fichier, section « Tokens »)
assets/js/main.js      Menu mobile, animations discrètes, validation du formulaire
assets/img/            Images (favicon, futures photos)
```

## Lancer le site en local

Dans le Terminal :

```bash
cd ~/Documents/"Jour J Dépannage"
python3 -m http.server 8080
```

Ouvrez ensuite http://localhost:8080 dans votre navigateur. Pour arrêter le serveur : `Ctrl + C`.

Vous pouvez aussi double-cliquer sur `index.html` pour un aperçu rapide.

## À remplacer avant la mise en ligne

| Élément | Valeur provisoire | Où |
|---|---|---|
| Numéro affiché | `06 00 00 00 00` | les 4 fichiers `.html` |
| Numéro des liens d'appel | `+33600000000` | les 4 fichiers `.html` |
| E-mail | `contact@exemple.fr` | les 4 fichiers `.html` |
| Zone d'intervention | « France — précisions à venir » | `contact.html` |
| Mentions légales | lien `#` | pied de page (page obligatoire en France) |
| Photos | emplacements « Photo : … » | `services.html` |

Astuce : dans votre éditeur, utilisez « Rechercher et remplacer dans le dossier » pour changer le numéro partout en une fois.

Pour ajouter une photo, placez-la dans `assets/img/` puis remplacez le bloc `photo-slot-glyph` / `photo-slot-label` concerné par :

```html
<img src="assets/img/plombier.webp" alt="Plombier réparant une fuite sous un évier" loading="lazy" width="1200" height="900">
```

Les commentaires `À COMPLÉTER` dans le code indiquent les emplacements prévus pour les garanties, les horaires et les avis clients.

## Mise en ligne (recommandé : Netlify, gratuit)

1. Créez un compte sur https://app.netlify.com.
2. Allez sur https://app.netlify.com/drop et glissez-déposez le dossier `Jour J Dépannage`.
3. Le site est en ligne. Vous pourrez ensuite brancher votre nom de domaine.
4. Formulaire : Netlify détecte automatiquement le formulaire `contact`. Dans *Site configuration → Forms → Form notifications*, ajoutez votre e-mail pour recevoir chaque demande.

## Couleurs

| Rôle | Couleur |
|---|---|
| Fond principal | `#FFFFFF` |
| Menu / footer | `#0B1F33` |
| Couleur principale | `#1677FF` (petits textes et liens : `#0F5FD6` pour la lisibilité) |
| Boutons « Appeler » | `#FF6B2C`, texte bleu nuit pour un contraste suffisant |
| Sections secondaires | `#F4F6F8` |
| Texte | `#17202A` |

Police : Inter (Google Fonts).
