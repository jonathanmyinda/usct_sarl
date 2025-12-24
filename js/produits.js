/* ============================================
   GESTION DES PRODUITS
   ============================================ */

// Base de données des produits par catégorie
const produitsData = {
    'africanav': {
        title: 'Africanav',
        subtitle: 'Navigation',
        description: 'Solutions de navigation et systèmes de positionnement',
        produits: [
            {
                id: 'nav-001',
                name: 'Système de Navigation GPS Professionnel',
                price: 1250,
                image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Système de navigation GPS haute précision pour applications professionnelles. Compatible avec tous les types de véhicules et équipements maritimes.',
                specifications: {
                    'Précision': '±2 mètres',
                    'Fréquence GPS': 'L1/L2',
                    'Connectivité': 'Bluetooth, USB, Wi-Fi',
                    'Écran': '7 pouces tactile',
                    'Autonomie': '8 heures',
                    'Garantie': '2 ans'
                }
            },
            {
                id: 'nav-002',
                name: 'Récepteur GNSS Multi-Constellation',
                price: 1890,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Récepteur GNSS avancé supportant GPS, GLONASS, Galileo et BeiDou pour une précision maximale.',
                specifications: {
                    'Constellations': 'GPS, GLONASS, Galileo, BeiDou',
                    'Précision': '±1 mètre',
                    'Fréquence': 'Multi-fréquence',
                    'Connectivité': 'Ethernet, USB, RS232',
                    'Garantie': '3 ans'
                }
            },
            {
                id: 'nav-003',
                name: 'Antenne GPS Externe Haute Performance',
                price: 450,
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Antenne GPS externe avec amplification pour signal optimal en toutes conditions.',
                specifications: {
                    'Gain': '28 dB',
                    'Fréquence': '1575.42 MHz',
                    'Protection': 'IP67',
                    'Câble': '5 mètres',
                    'Garantie': '2 ans'
                }
            }
        ]
    },
    'securite': {
        title: 'Sécurité',
        subtitle: 'Produits',
        description: 'Solutions de sécurité et systèmes de protection',
        produits: [
            {
                id: 'sec-001',
                name: 'Système de Vidéosurveillance IP 4K',
                price: 3200,
                image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Système complet de vidéosurveillance IP avec caméras 4K, enregistrement NVR et visionnage à distance.',
                specifications: {
                    'Résolution': '4K Ultra HD',
                    'Caméras': '8 canaux',
                    'Stockage': '2 To',
                    'Visionnage': 'Application mobile',
                    'Nuit': 'Vision infrarouge',
                    'Garantie': '3 ans'
                }
            },
            {
                id: 'sec-002',
                name: 'Contrôle d\'Accès Biométrique',
                price: 1850,
                image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Système de contrôle d\'accès par reconnaissance d\'empreinte digitale et badge RFID.',
                specifications: {
                    'Capacité': '5000 utilisateurs',
                    'Méthodes': 'Empreinte, RFID, Code PIN',
                    'Portes': '4 portes',
                    'Connectivité': 'Ethernet, Wi-Fi',
                    'Garantie': '2 ans'
                }
            },
            {
                id: 'sec-003',
                name: 'Détecteur de Fumée Intelligent',
                price: 120,
                image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Détecteur de fumée connecté avec alerte mobile et intégration domotique.',
                specifications: {
                    'Détection': 'Optique + Ionisation',
                    'Alarme': '85 dB',
                    'Connectivité': 'Wi-Fi, Bluetooth',
                    'Autonomie': '10 ans',
                    'Garantie': '5 ans'
                }
            }
        ]
    },
    'centre-service': {
        title: 'Centre',
        subtitle: 'De Service',
        description: 'Services de maintenance et support technique',
        produits: [
            {
                id: 'svc-001',
                name: 'Contrat de Maintenance Annuel',
                price: 1500,
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Contrat de maintenance préventive et corrective pour vos équipements informatiques et bureautiques.',
                specifications: {
                    'Interventions': 'Illimitées',
                    'Réponse': '4 heures',
                    'Couverture': '7j/7, 24h/24',
                    'Pièces': 'Incluses',
                    'Garantie': '1 an'
                }
            },
            {
                id: 'svc-002',
                name: 'Support Technique à Distance',
                price: 800,
                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Service de support technique à distance pour résolution rapide de problèmes informatiques.',
                specifications: {
                    'Support': 'Téléphonique + Remote',
                    'Disponibilité': 'Lun-Ven 8h-18h',
                    'Réponse': '2 heures',
                    'Garantie': '6 mois'
                }
            }
        ]
    },
    'mobilier': {
        title: 'Mobilier',
        subtitle: 'De Bureau',
        description: 'Mobilier ergonomique et aménagement d\'espaces de travail',
        produits: [
            {
                id: 'mob-001',
                name: 'Bureau Ergonomique Réglable en Hauteur',
                price: 650,
                image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Bureau électrique réglable en hauteur pour un confort optimal et une meilleure productivité.',
                specifications: {
                    'Hauteur': '65-130 cm',
                    'Dimensions': '120 x 80 cm',
                    'Matériau': 'Bois mélaminé',
                    'Moteur': 'Électrique silencieux',
                    'Garantie': '5 ans'
                }
            },
            {
                id: 'mob-002',
                name: 'Chaise Ergonomique Executive',
                price: 450,
                image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Chaise de bureau ergonomique avec support lombaire et accoudoirs réglables.',
                specifications: {
                    'Support': 'Lombaire ajustable',
                    'Accoudoirs': '4D réglables',
                    'Tissu': 'Mesh respirant',
                    'Garantie': '3 ans'
                }
            },
            {
                id: 'mob-003',
                name: 'Armoire de Bureau 4 Portes',
                price: 380,
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Armoire de rangement avec 4 portes et étagères ajustables.',
                specifications: {
                    'Dimensions': '180 x 90 x 40 cm',
                    'Portes': '4 portes',
                    'Étagères': 'Ajustables',
                    'Matériau': 'Métal laqué',
                    'Garantie': '2 ans'
                }
            }
        ]
    },
    'groupe-electrogene': {
        title: 'Groupe',
        subtitle: 'Électrogène',
        description: 'Groupes électrogènes et solutions d\'alimentation',
        produits: [
            {
                id: 'gen-001',
                name: 'Groupe Électrogène Diesel 50 kVA',
                price: 12500,
                image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Groupe électrogène diesel silencieux avec démarrage automatique et panneau de contrôle digital.',
                specifications: {
                    'Puissance': '50 kVA / 40 kW',
                    'Moteur': 'Diesel 4 temps',
                    'Réservoir': '200 litres',
                    'Autonomie': '8 heures',
                    'Niveau sonore': '68 dB',
                    'Garantie': '2 ans'
                }
            },
            {
                id: 'gen-002',
                name: 'Groupe Électrogène Inverter 5 kVA',
                price: 1800,
                image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Groupe électrogène portable avec technologie inverter pour alimentation d\'appareils sensibles.',
                specifications: {
                    'Puissance': '5 kVA',
                    'Moteur': 'Essence 4 temps',
                    'Réservoir': '25 litres',
                    'Autonomie': '6 heures',
                    'Niveau sonore': '58 dB',
                    'Garantie': '2 ans'
                }
            }
        ]
    },
    'informatique': {
        title: 'Informatique',
        subtitle: 'Solutions IT',
        description: 'Équipements informatiques et solutions technologiques',
        produits: [
            {
                id: 'it-001',
                name: 'Serveur Rack 2U Dual Processor',
                price: 8500,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Serveur rack professionnel avec processeurs dual-core, mémoire ECC et stockage RAID.',
                specifications: {
                    'Processeurs': '2x Intel Xeon',
                    'RAM': '64 Go ECC',
                    'Stockage': '2x 1 To SSD RAID 1',
                    'Rack': '2U',
                    'Garantie': '3 ans'
                }
            },
            {
                id: 'it-002',
                name: 'Ordinateur Portable Professionnel',
                price: 1200,
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Ordinateur portable haute performance pour professionnels avec écran Full HD et processeur Intel Core i7.',
                specifications: {
                    'Processeur': 'Intel Core i7',
                    'RAM': '16 Go',
                    'Stockage': '512 Go SSD',
                    'Écran': '15.6" Full HD',
                    'Garantie': '2 ans'
                }
            },
            {
                id: 'it-003',
                name: 'Switch Réseau Gigabit 24 Ports',
                price: 350,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                description: 'Switch réseau managé 24 ports Gigabit avec VLAN et QoS pour réseaux professionnels.',
                specifications: {
                    'Ports': '24x Gigabit',
                    'Management': 'Web, SNMP',
                    'VLAN': '802.1Q',
                    'Garantie': '3 ans'
                }
            }
        ]
    }
};

/**
 * Initialise la gestion des produits
 */
function initProduits() {
    console.log('🔄 Initialisation des produits...');
    
    // Gérer les clics sur les catégories
    const produitsComponent = document.getElementById('produits-component');
    if (!produitsComponent) {
        console.warn('⚠️ Composant produits non trouvé');
        return;
    }
    
    const categoryCards = produitsComponent.querySelectorAll('.category-card[data-category]');
    
    console.log(`📦 ${categoryCards.length} cartes de catégories trouvées`);
    
    if (categoryCards.length > 0) {
        categoryCards.forEach((card, index) => {
            // Retirer les anciens écouteurs en clonant la carte
            const newCard = card.cloneNode(true);
            if (card.parentNode) {
                card.parentNode.replaceChild(newCard, card);
            }
            
            // Ajouter le nouvel écouteur
            newCard.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const category = this.getAttribute('data-category');
                console.log(`➡️ Clic sur catégorie: ${category}`);
                if (category) {
                    window.location.hash = `#produits/${category}`;
                }
            });
        });
        
        console.log(`✅ ${categoryCards.length} catégories de produits initialisées`);
    } else {
        console.warn('⚠️ Aucune catégorie de produits trouvée dans le composant');
    }

    // Gérer la navigation via les hash (une seule fois)
    if (!window.produitsNavigationInitialized) {
        window.addEventListener('hashchange', handleProduitsNavigation);
        window.produitsNavigationInitialized = true;
    }
    
    // Vérifier le hash actuel
    handleProduitsNavigation();
}

/**
 * Gère la navigation dans la section produits
 */
function handleProduitsNavigation() {
    const hash = window.location.hash;
    
    if (hash.startsWith('#produits/')) {
        const parts = hash.split('/');
        if (parts.length === 2) {
            const category = parts[1];
            if (produitsData[category]) {
                showProduitsList(category);
            }
        } else if (parts.length === 3) {
            const category = parts[1];
            const productId = parts[2];
            if (produitsData[category]) {
                showProduitDetail(category, productId);
            }
        }
    }
}

/**
 * Affiche la liste des produits d'une catégorie
 */
function showProduitsList(category) {
    const categoryData = produitsData[category];
    if (!categoryData) return;

    // Charger le composant produits-liste
    fetch('components/produits-liste.html')
        .then(response => response.text())
        .then(html => {
            const target = document.getElementById('produits-component');
            if (target) {
                target.innerHTML = html;
                
                // Attendre que le DOM soit mis à jour
                setTimeout(() => {
                    // Mettre à jour le breadcrumb
                    const breadcrumbCategory = document.getElementById('breadcrumb-category');
                    if (breadcrumbCategory) {
                        breadcrumbCategory.textContent = categoryData.title;
                    }
                    
                    // Mettre à jour le titre
                    const titleEl = document.getElementById('liste-category-title');
                    const subtitleEl = document.getElementById('liste-category-subtitle');
                    if (titleEl) titleEl.textContent = categoryData.title;
                    if (subtitleEl) subtitleEl.textContent = categoryData.description;
                    
                    // Afficher les produits
                    const produitsGrid = document.getElementById('produits-grid');
                    if (produitsGrid) {
                        produitsGrid.innerHTML = '';
                        
                        categoryData.produits.forEach(produit => {
                            const produitCard = createProduitCard(produit, category);
                            produitsGrid.appendChild(produitCard);
                        });
                    }

                    // Scroll vers la section
                    const produitsListe = document.getElementById('produits-liste');
                    if (produitsListe) {
                        produitsListe.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                    // Réinitialiser les animations
                    if (window.initScrollEffects) {
                        window.initScrollEffects();
                    }
                }, 100);
            }
        })
        .catch(error => {
            console.error('Erreur lors du chargement de produits-liste.html:', error);
        });
}

/**
 * Crée une carte produit style e-commerce premium
 */
function createProduitCard(produit, category) {
    const card = document.createElement('div');
    card.className = 'produit-card-ecommerce fade-in';
    card.setAttribute('data-product-id', produit.id);
    
    // Récupérer les autres produits de la catégorie pour la liste "plus d'articles"
    const categoryData = produitsData[category];
    const autresProduits = categoryData.produits
        .filter(p => p.id !== produit.id)
        .slice(0, 4)
        .map(p => p.name);
    
    // Description courte (premiers 80 caractères)
    const descriptionCourte = produit.description.length > 80 
        ? produit.description.substring(0, 80) + '...' 
        : produit.description;
    
    card.innerHTML = `
        <div class="produit-card-image">
            <div class="produit-image-wrapper">
                ${produit.image ? 
                    `<img src="${produit.image}" alt="${produit.name}" loading="lazy">` :
                    `<div class="produit-image-placeholder">📦</div>`
                }
                <div class="produit-overlay">
                    <button class="btn-view-details" data-product-id="${produit.id}" data-category="${category}">
                        <span>👁️</span> Voir détails
                    </button>
                </div>
            </div>
            <div class="produit-badge-new">Nouveau</div>
        </div>
        <div class="produit-card-body">
            <div class="produit-category-tag">${categoryData.title}</div>
            <h3 class="produit-name">${produit.name}</h3>
            <p class="produit-description-short">${descriptionCourte}</p>
            <div class="produit-price-section">
                <div class="price-main">
                    <span class="produit-price">$${produit.price.toLocaleString()}</span>
                    <span class="produit-currency">.00 USD</span>
                </div>
            </div>
            <div class="produit-card-actions">
                <button class="btn-produit-learn-more" data-product-id="${produit.id}" data-category="${category}">
                    <span>📋</span> Voir détails
                </button>
            </div>
        </div>
    `;
    
    // Ajouter l'événement sur le bouton
    const learnMoreBtn = card.querySelector('.btn-produit-learn-more');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.hash = `#produits/${category}/${produit.id}`;
        });
    }
    
    // Clic sur la carte pour voir les détails
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.btn-produit-learn-more') && !e.target.closest('.produit-more-articles')) {
            window.location.hash = `#produits/${category}/${produit.id}`;
        }
    });
    
    return card;
}

/**
 * Affiche les détails d'un produit
 */
function showProduitDetail(category, productId) {
    const categoryData = produitsData[category];
    if (!categoryData) return;
    
    const produit = categoryData.produits.find(p => p.id === productId);
    if (!produit) return;

    // Charger le composant produit-detail
    fetch('components/produit-detail.html')
        .then(response => response.text())
        .then(html => {
            const target = document.getElementById('produits-component');
            if (target) {
                target.innerHTML = html;
                
                // Attendre que le DOM soit mis à jour
                setTimeout(() => {
                    // Mettre à jour le breadcrumb
                    const breadcrumbCategoryLink = document.getElementById('breadcrumb-category-link');
                    const breadcrumbProduct = document.getElementById('breadcrumb-product');
                    if (breadcrumbCategoryLink) {
                        breadcrumbCategoryLink.textContent = categoryData.title;
                        breadcrumbCategoryLink.href = `#produits/${category}`;
                    }
                    if (breadcrumbProduct) {
                        breadcrumbProduct.textContent = produit.name;
                    }
                    
                    // Mettre à jour les informations du produit
                    const titleEl = document.getElementById('produit-title');
                    const categoryEl = document.getElementById('produit-category');
                    const referenceEl = document.getElementById('produit-reference');
                    const priceEl = document.getElementById('produit-price');
                    const descEl = document.getElementById('produit-description');
                    
                    if (titleEl) titleEl.textContent = produit.name;
                    if (categoryEl) categoryEl.textContent = categoryData.title;
                    if (referenceEl) referenceEl.textContent = produit.id;
                    if (priceEl) priceEl.textContent = produit.price.toLocaleString();
                    if (descEl) descEl.textContent = produit.description;
                    
                    // Image
                    const imageElement = document.getElementById('produit-image');
                    if (imageElement) {
                        if (produit.image) {
                            imageElement.src = produit.image;
                            imageElement.alt = produit.name;
                        } else {
                            imageElement.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                            imageElement.alt = produit.name;
                        }
                    }
                    
                    // Spécifications
                    const specsList = document.getElementById('produit-specs-list');
                    if (specsList) {
                        specsList.innerHTML = '';
                        Object.entries(produit.specifications).forEach(([key, value]) => {
                            const specItem = document.createElement('div');
                            specItem.className = 'spec-item';
                            specItem.innerHTML = `
                                <div class="spec-label">${key}</div>
                                <div class="spec-value">${value}</div>
                            `;
                            specsList.appendChild(specItem);
                        });
                    }
                    
                    // Boutons d'action
                    const btnContact = document.getElementById('btn-contact-produit');
                    const btnCatalog = document.getElementById('btn-catalog-produit');
                    if (btnContact) {
                        btnContact.addEventListener('click', () => {
                            window.location.hash = '#contact';
                        });
                    }
                    if (btnCatalog) {
                        btnCatalog.addEventListener('click', () => {
                            window.location.hash = '#catalogues';
                        });
                    }
                    
                    // Scroll vers la section
                    const produitDetail = document.getElementById('produit-detail');
                    if (produitDetail) {
                        produitDetail.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        })
        .catch(error => {
            console.error('Erreur lors du chargement de produit-detail.html:', error);
        });
}


// Initialiser au chargement
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que les composants soient chargés
    setTimeout(() => {
        initProduits();
    }, 1500);
});

// Réinitialiser quand le composant produits est chargé
window.addEventListener('produits-loaded', function() {
    setTimeout(() => {
        initProduits();
    }, 200);
});

// Écouter aussi les changements de hash pour réinitialiser si nécessaire
window.addEventListener('hashchange', function() {
    if (window.location.hash === '#produits' || window.location.hash.startsWith('#produits/')) {
        setTimeout(() => {
            initProduits();
        }, 300);
    }
});

// Exporter pour utilisation globale
window.initProduits = initProduits;
window.showProduitsList = showProduitsList;
window.showProduitDetail = showProduitDetail;

