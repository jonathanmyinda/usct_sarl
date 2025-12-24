# Système de Composants - USCT Congo

## 📋 Description

Ce dossier contient les composants modulaires du site web USCT Congo. Chaque section principale du site est organisée comme un composant séparé qui peut être chargé dynamiquement dans la page principale.

## 📁 Structure des Composants

```
components/
├── a-propos.html      # Composant "À propos"
├── partenaires.html   # Composant "Partenaires"
├── photos.html        # Composant "Galerie Photos"
├── catalogues.html    # Composant "Catalogues"
├── contact.html       # Composant "Contact"
└── README.md          # Ce fichier
```

## 🎯 Avantages de cette Architecture

1. **Modularité** : Chaque section est indépendante et réutilisable
2. **Maintenabilité** : Facile de modifier une section sans toucher aux autres
3. **Performance** : Chargement dynamique des composants
4. **Organisation** : Code mieux structuré et organisé

## 🔧 Utilisation

### Chargement Automatique

Les composants sont chargés automatiquement au chargement de la page via `js/components.js`. 

Dans `index.html`, les conteneurs sont définis ainsi :

```html
<!-- Composant : À Propos -->
<div id="a-propos-component"></div>

<!-- Composant : Partenaires -->
<div id="partenaires-component"></div>

<!-- Composant : Photos -->
<div id="photos-component"></div>

<!-- Composant : Catalogues -->
<div id="catalogues-component"></div>

<!-- Composant : Contact -->
<div id="contact-component"></div>
```

### Chargement Manuel

Vous pouvez aussi charger un composant spécifique :

```javascript
// Charger un composant spécifique
loadSingleComponent('a-propos');
loadSingleComponent('partenaires');
loadSingleComponent('photos');
loadSingleComponent('catalogues');
loadSingleComponent('contact');
```

### Charger Tous les Composants

```javascript
// Charger tous les composants
loadAllComponents();
```

## 📝 Créer un Nouveau Composant

1. Créer un fichier HTML dans le dossier `components/`
2. Ajouter le contenu HTML du composant (sans les balises `<html>`, `<head>`, `<body>`)
3. Ajouter l'entrée dans `js/components.js` :

```javascript
const components = [
    { path: 'components/mon-composant.html', target: 'mon-composant-component' },
    // ... autres composants
];
```

4. Ajouter le conteneur dans `index.html` :

```html
<div id="mon-composant-component"></div>
```

## 🎨 Structure d'un Composant

Chaque composant doit suivre cette structure :

```html
<!-- ============================================
     COMPOSANT : NOM DU COMPOSANT
     ============================================ -->
<section class="section nom-composant" id="nom-composant">
    <div class="container">
        <!-- Contenu du composant -->
    </div>
</section>
```

## ⚙️ Fonctionnalités Automatiques

Après le chargement d'un composant, les fonctionnalités suivantes sont automatiquement réinitialisées :

- ✅ Animations fade-in au scroll
- ✅ Validation des formulaires (pour le composant contact)
- ✅ Écouteurs d'événements

## 🔍 Dépannage

### Le composant ne se charge pas

1. Vérifier que le fichier existe dans `components/`
2. Vérifier le chemin dans `js/components.js`
3. Vérifier que l'ID du conteneur correspond dans `index.html`
4. Ouvrir la console du navigateur pour voir les erreurs

### Les animations ne fonctionnent pas

Les animations sont réinitialisées automatiquement après le chargement. Si elles ne fonctionnent pas :

1. Vérifier que `initScrollEffects()` est appelée
2. Vérifier que les éléments ont la classe `fade-in`
3. Vérifier que le CSS est bien chargé

### Le formulaire ne fonctionne pas

Le formulaire de contact est réinitialisé automatiquement. Si cela ne fonctionne pas :

1. Vérifier que `initContactForm()` est appelée
2. Vérifier que le script `js/script.js` est chargé après `js/components.js`

## 📚 Exemples

### Exemple : Modifier le composant "À propos"

1. Éditer `components/a-propos.html`
2. Modifier le contenu
3. Sauvegarder
4. Recharger la page - les changements apparaîtront automatiquement

### Exemple : Ajouter un nouveau partenaire

1. Éditer `components/partenaires.html`
2. Ajouter une nouvelle carte partenaire dans la grille
3. Sauvegarder
4. Recharger la page

## 🚀 Performance

- Les composants sont chargés en parallèle pour une meilleure performance
- Le chargement est asynchrone pour ne pas bloquer le rendu de la page
- Les erreurs sont gérées gracieusement sans casser le site

## 📞 Support

Pour toute question sur le système de composants, consultez la documentation principale dans `README.md` à la racine du projet.

---

**Dernière mise à jour** : 2025

