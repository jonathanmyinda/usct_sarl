/* ============================================
   SYSTÈME DE CHARGEMENT DES COMPOSANTS
   ============================================
   Ce fichier charge dynamiquement les composants HTML
   dans la page principale (index.html)
   ============================================ */

/**
 * Charge un composant HTML et l'insère dans le DOM
 * @param {string} componentPath - Chemin vers le fichier composant
 * @param {string} targetId - ID de l'élément cible où insérer le composant
 * @returns {Promise} - Promise qui se résout quand le composant est chargé
 */
async function loadComponent(componentPath, targetId) {
    try {
        const response = await fetch(componentPath);
        
        if (!response.ok) {
            throw new Error(`Erreur lors du chargement du composant: ${response.statusText}`);
        }
        
        const html = await response.text();
        const targetElement = document.getElementById(targetId);
        
        if (!targetElement) {
            throw new Error(`Élément cible introuvable: #${targetId}`);
        }
        
        // Insérer le HTML du composant dans l'élément cible
        targetElement.innerHTML = html;
        
        // Réinitialiser les scripts si nécessaire (pour les formulaires, etc.)
        reinitializeComponent(targetId);
        
        // Déclencher un événement pour les scripts qui en ont besoin APRÈS la réinitialisation
        if (targetId === 'produits-component') {
            setTimeout(() => {
                window.dispatchEvent(new Event('produits-loaded'));
            }, 100);
        }
        
        return true;
    } catch (error) {
        console.error(`Erreur lors du chargement du composant ${componentPath}:`, error);
        return false;
    }
}

/**
 * Réinitialise les fonctionnalités d'un composant après son chargement
 * @param {string} componentId - ID du composant chargé
 */
function reinitializeComponent(componentId) {
    // Réinitialiser le formulaire de contact si c'est le composant contact
    if (componentId === 'contact-component') {
        // Réinitialiser la validation du formulaire
        const form = document.getElementById('contact-form');
        if (form) {
            // Réattacher les écouteurs d'événements
            // Le script principal (script.js) devrait gérer cela automatiquement
            // mais on peut forcer la réinitialisation si nécessaire
            if (typeof initContactForm === 'function') {
                initContactForm();
            }
        }
    }
    
    // Réinitialiser le lightbox si c'est le composant photos
    if (componentId === 'photos-component') {
        if (typeof window.reinitLightbox === 'function') {
            window.reinitLightbox();
        }
    }
    
    // Réinitialiser les produits si c'est le composant produits
    if (componentId === 'produits-component') {
        if (typeof window.initProduits === 'function') {
            setTimeout(() => {
                window.initProduits();
            }, 300);
        } else {
            console.warn('⚠️ initProduits n\'est pas disponible');
        }
    }
    
    // Réinitialiser les animations fade-in
    const fadeElements = document.querySelectorAll(`#${componentId} .fade-in`);
    fadeElements.forEach(element => {
        element.classList.remove('visible');
    });
    
    // Observer les nouveaux éléments pour les animations
    // Vérifier si la fonction initScrollEffects existe (définie dans script.js)
    setTimeout(() => {
        if (typeof initScrollEffects === 'function') {
            initScrollEffects();
        }
        // Forcer l'affichage des éléments après un court délai si l'observer ne les détecte pas
        setTimeout(() => {
            const componentElement = document.getElementById(componentId);
            if (componentElement) {
                const stillHidden = componentElement.querySelectorAll('.fade-in:not(.visible)');
                stillHidden.forEach(element => {
                    const rect = element.getBoundingClientRect();
                    // Si l'élément est dans la fenêtre ou proche, le rendre visible
                    if (rect.top < window.innerHeight + 300 && rect.bottom > -300) {
                        element.classList.add('visible');
                    }
                });
            }
        }, 800);
    }, 300);
}

/**
 * Charge tous les composants de la page
 */
async function loadAllComponents() {
    // Configuration des composants à charger
    const components = [
        { path: 'components/a-propos.html', target: 'a-propos-component' },
        { path: 'components/best-sellers.html', target: 'best-sellers-component' },
        { path: 'components/partenaires.html', target: 'partenaires-component' },
        { path: 'components/photos.html', target: 'photos-component' },
        { path: 'components/catalogues.html', target: 'catalogues-component' },
        { path: 'components/produits.html', target: 'produits-component' },
        { path: 'components/contact.html', target: 'contact-component' }
    ];
    
    // Charger tous les composants en parallèle
    const loadPromises = components.map(component => 
        loadComponent(component.path, component.target)
    );
    
    // Attendre que tous les composants soient chargés
    const results = await Promise.all(loadPromises);
    
    // Vérifier si tous les composants ont été chargés avec succès
    const allLoaded = results.every(result => result === true);
    
    if (allLoaded) {
        console.log('✅ Tous les composants ont été chargés avec succès');
        
        // Réinitialiser les animations après le chargement
        setTimeout(() => {
            if (typeof initScrollEffects === 'function') {
                initScrollEffects();
            }
            // Forcer l'affichage de tous les éléments visibles après un délai
            setTimeout(() => {
                const allFadeIn = document.querySelectorAll('.fade-in:not(.visible)');
                allFadeIn.forEach(element => {
                    const rect = element.getBoundingClientRect();
                    // Si l'élément est dans la fenêtre ou proche, le rendre visible
                    if (rect.top < window.innerHeight + 400 && rect.bottom > -400) {
                        element.classList.add('visible');
                    }
                });
            }, 1000);
        }, 200);
    } else {
        console.warn('⚠️ Certains composants n\'ont pas pu être chargés');
    }
}

/**
 * Charge un composant spécifique à la demande
 * @param {string} componentName - Nom du composant (sans extension)
 * @returns {Promise} - Promise qui se résout quand le composant est chargé
 */
async function loadSingleComponent(componentName) {
    const componentMap = {
        'a-propos': { path: 'components/a-propos.html', target: 'a-propos-component' },
        'partenaires': { path: 'components/partenaires.html', target: 'partenaires-component' },
        'photos': { path: 'components/photos.html', target: 'photos-component' },
        'catalogues': { path: 'components/catalogues.html', target: 'catalogues-component' },
        'contact': { path: 'components/contact.html', target: 'contact-component' }
    };
    
    const component = componentMap[componentName];
    
    if (!component) {
        console.error(`Composant inconnu: ${componentName}`);
        return false;
    }
    
    return await loadComponent(component.path, component.target);
}

// Charger tous les composants au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si les conteneurs de composants existent
    const hasComponents = document.getElementById('a-propos-component') !== null;
    
    if (hasComponents) {
        loadAllComponents();
    } else {
        console.log('ℹ️ Mode composants non activé - sections intégrées directement dans le HTML');
    }
});

// Exporter les fonctions pour utilisation globale
window.loadComponent = loadComponent;
window.loadAllComponents = loadAllComponents;
window.loadSingleComponent = loadSingleComponent;

