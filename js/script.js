/* ============================================
   SCRIPT PRINCIPAL - USCT CONGO
   ============================================
   Ce fichier contient toutes les fonctionnalités JavaScript
   pour le site web USCT Congo.
   ============================================ */

// ============================================
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de toutes les fonctionnalités
    initNavigation();
    initScrollEffects();
    initContactForm();
    initScrollToTop();
    initAnimations();
    initCurrentYear();
    initLightbox();
    
    console.log('✅ Site USCT Congo chargé avec succès');
});

// ============================================
// NAVIGATION ET MENU MOBILE
// ============================================

/**
 * Initialise la navigation : menu mobile, liens actifs, scroll smooth
 */
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    // Toggle du menu mobile (hamburger)
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle des classes
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Mise à jour de l'attribut aria-expanded pour l'accessibilité
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuToggle.setAttribute('aria-label', isExpanded ? 'Ouvrir le menu' : 'Fermer le menu');
        });
    }

    // Fermer le menu mobile lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 968) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
            }
            
            // Mise à jour du lien actif
            updateActiveLink(this);
        });
    });

    // Gestion du header au scroll (effet sticky avec ombre)
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Navigation active basée sur la section visible
    window.addEventListener('scroll', updateActiveSection);
}

/**
 * Met à jour le lien actif dans la navigation
 * @param {HTMLElement} activeLink - Le lien à marquer comme actif
 */
function updateActiveLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

/**
 * Met à jour la section active dans la navigation en fonction du scroll
 */
function updateActiveSection() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset + 150; // Offset pour déclencher avant d'arriver à la section
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Mise à jour des liens actifs
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// EFFETS DE SCROLL ET ANIMATIONS
// ============================================

/**
 * Initialise les effets de scroll (fade-in, parallax, etc.)
 * Exportée pour utilisation dans components.js
 */
function initScrollEffects() {
    // Observer pour les animations au scroll (Intersection Observer API)
    const observerOptions = {
        threshold: 0.01,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Une fois visible, on peut arrêter d'observer cet élément
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        // Vérifier si l'élément est déjà visible dans la fenêtre
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight + 200 && rect.bottom > -200;
        
        if (isInViewport) {
            // Si l'élément est déjà visible, le rendre visible immédiatement
            element.classList.add('visible');
        } else {
            // Sinon, l'observer pour l'animation au scroll
            observer.observe(element);
        }
    });

    // Ajouter la classe fade-in aux cartes et sections pour l'animation
    const cards = document.querySelectorAll('.service-card, .news-card, .team-member, .stat-item');
    cards.forEach(card => {
        if (!card.classList.contains('fade-in')) {
            card.classList.add('fade-in');
        }
        const rect = card.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight + 200 && rect.bottom > -200;
        
        if (isInViewport) {
            card.classList.add('visible');
        } else {
            observer.observe(card);
        }
    });
}

// ============================================
// FORMULAIRE DE CONTACT
// ============================================

/**
 * Initialise le formulaire de contact avec validation
 * Exportée pour utilisation dans components.js
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;

    // Écouteur d'événement pour la soumission du formulaire
    form.addEventListener('submit', handleFormSubmit);

    // Validation en temps réel
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        // Validation lors de la perte de focus
        input.addEventListener('blur', function() {
            validateField(this);
        });

        // Suppression de l'erreur lors de la saisie
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                clearFieldError(this);
            }
        });
    });
}

/**
 * Gère la soumission du formulaire
 * @param {Event} event - L'événement de soumission
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.btn-submit');
    const formMessage = document.getElementById('form-message');
    
    // Validation de tous les champs
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    // Si le formulaire n'est pas valide, on arrête
    if (!isValid) {
        showFormMessage('Veuillez corriger les erreurs dans le formulaire.', 'error');
        return;
    }

    // Récupération des données du formulaire
    const formData = {
        nom: document.getElementById('nom').value.trim(),
        email: document.getElementById('email').value.trim(),
        telephone: document.getElementById('telephone').value.trim(),
        sujet: document.getElementById('sujet').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // Affichage de l'état de chargement
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    // Simulation de l'envoi (à remplacer par un vrai appel API)
    setTimeout(() => {
        // Ici, vous pouvez ajouter un appel à votre API backend
        // Exemple avec fetch :
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showFormMessage('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.', 'success');
                form.reset();
            } else {
                showFormMessage('Une erreur est survenue. Veuillez réessayer plus tard.', 'error');
            }
        })
        .catch(error => {
            showFormMessage('Une erreur est survenue. Veuillez réessayer plus tard.', 'error');
        })
        .finally(() => {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        });
        */

        // Simulation pour la démo
        console.log('Données du formulaire:', formData);
        
        showFormMessage('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.', 'success');
        form.reset();
        
        // Réinitialisation du bouton
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        
        // Scroll vers le message de succès
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1500);
}

/**
 * Valide un champ du formulaire
 * @param {HTMLElement} field - Le champ à valider
 * @returns {boolean} - True si le champ est valide
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    // Réinitialisation
    clearFieldError(field);

    // Validation selon le type de champ
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, errorElement, 'Ce champ est obligatoire.');
        return false;
    }

    // Validation de l'email
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, errorElement, 'Veuillez entrer une adresse email valide.');
            return false;
        }
    }

    // Validation du téléphone (optionnel mais formaté si présent)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 8) {
            showFieldError(field, errorElement, 'Veuillez entrer un numéro de téléphone valide.');
            return false;
        }
    }

    // Validation de la longueur minimale
    if (field.hasAttribute('minlength')) {
        const minLength = parseInt(field.getAttribute('minlength'));
        if (value.length < minLength) {
            showFieldError(field, errorElement, `Ce champ doit contenir au moins ${minLength} caractères.`);
            return false;
        }
    }

    return true;
}

/**
 * Affiche une erreur pour un champ
 * @param {HTMLElement} field - Le champ en erreur
 * @param {HTMLElement} errorElement - L'élément d'erreur
 * @param {string} message - Le message d'erreur
 */
function showFieldError(field, errorElement, message) {
    field.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
    }
}

/**
 * Efface l'erreur d'un champ
 * @param {HTMLElement} field - Le champ à réinitialiser
 */
function clearFieldError(field) {
    field.classList.remove('error');
    const fieldName = field.getAttribute('name');
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.removeAttribute('role');
    }
}

/**
 * Affiche un message de formulaire (succès ou erreur)
 * @param {string} message - Le message à afficher
 * @param {string} type - Le type de message ('success' ou 'error')
 */
function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.setAttribute('role', 'alert');

    // Masquer le message après 5 secondes pour les messages de succès
    if (type === 'success') {
        setTimeout(() => {
            formMessage.classList.remove('success');
            formMessage.textContent = '';
            formMessage.removeAttribute('role');
        }, 5000);
    }
}

// ============================================
// BOUTON RETOUR EN HAUT
// ============================================

/**
 * Initialise le bouton de retour en haut de page
 */
function initScrollToTop() {
    const scrollTopButton = document.getElementById('scroll-top');
    
    if (!scrollTopButton) return;

    // Afficher/masquer le bouton selon le scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    // Scroll vers le haut au clic
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// ANIMATIONS SUPPLÉMENTAIRES
// ============================================

/**
 * Initialise les animations supplémentaires
 */
function initAnimations() {
    // Animation des statistiques (compteur)
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const isNumber = /^\d+/.test(target);
        
        if (isNumber) {
            const finalNumber = parseInt(target);
            const duration = 2000; // 2 secondes
            const increment = finalNumber / (duration / 16); // 60 FPS
            let current = 0;
            
            // Observer pour déclencher l'animation quand la section est visible
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting && current === 0) {
                        const interval = setInterval(() => {
                            current += increment;
                            if (current >= finalNumber) {
                                stat.textContent = target;
                                clearInterval(interval);
                            } else {
                                stat.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
                            }
                        }, 16);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(stat);
        }
    });
}

// ============================================
// UTILITAIRES
// ============================================

/**
 * Met à jour l'année actuelle dans le footer
 */
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================
// GESTION DES ERREURS
// ============================================

/**
 * Gestion globale des erreurs JavaScript
 */
window.addEventListener('error', function(event) {
    console.error('Erreur JavaScript:', event.error);
    // Ici, vous pourriez envoyer l'erreur à un service de logging
});

// ============================================
// PERFORMANCE : Lazy loading des images
// ============================================

/**
 * Initialise le lazy loading des images (si nécessaire)
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialiser le lazy loading si des images avec data-src sont présentes
document.addEventListener('DOMContentLoaded', initLazyLoading);

// ============================================
// CAROUSEL DE PHOTOS
// ============================================

/**
 * Initialise le carousel de photos dans la section hero
 */
function initPhotoCarousel() {
    const carousel = document.getElementById('photo-carousel');
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (!carousel || !track || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const slides = track.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let visibleSlides = 5; // Nombre de slides visibles à la fois (desktop)
    
    // Ajuster selon la taille d'écran
    function getVisibleSlides() {
        if (window.innerWidth < 768) return 2;
        if (window.innerWidth < 1024) return 3;
        return 5;
    }
    
    visibleSlides = getVisibleSlides();
    
    // Fonction pour mettre à jour la position du carousel
    function updateCarousel() {
        visibleSlides = getVisibleSlides();
        const maxIndex = Math.max(0, totalSlides - visibleSlides);
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        
        const slideWidth = slides[0] ? slides[0].offsetWidth + 32 : 0; // 32px pour le gap
        const translateX = -currentIndex * slideWidth;
        track.style.transform = `translateX(${translateX}px)`;
        
        // Désactiver les boutons aux extrémités
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        
        if (prevBtn.disabled) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }
        
        if (nextBtn.disabled) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
    }
    
    // Bouton précédent
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    // Bouton suivant
    nextBtn.addEventListener('click', function() {
        const maxIndex = Math.max(0, totalSlides - getVisibleSlides());
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Auto-play du carousel
    let autoPlayInterval;
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            const maxIndex = Math.max(0, totalSlides - getVisibleSlides());
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0; // Retour au début
            }
            updateCarousel();
        }, 4000); // Change toutes les 4 secondes
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Pause au survol
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Initialisation
    updateCarousel();
    startAutoPlay();
    
    // Recalculer lors du redimensionnement
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            currentIndex = 0; // Reset à la première slide
            updateCarousel();
        }, 250);
    });
}

// ============================================
// LIGHTBOX POUR LES PHOTOS
// ============================================

/**
 * Initialise le système de lightbox pour les photos
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    if (!lightbox || !lightboxImage || !lightboxCaption) {
        console.warn('⚠️ Éléments lightbox non trouvés');
        return;
    }
    
    let currentImages = [];
    let currentIndex = 0;
    
    // Fonction pour ouvrir le lightbox
    function openLightbox(images, index) {
        currentImages = images;
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêcher le scroll de la page
    }
    
    // Fonction pour fermer le lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Réactiver le scroll
    }
    
    // Fonction pour mettre à jour l'image affichée
    function updateLightboxImage() {
        if (currentImages.length === 0) return;
        
        const currentImage = currentImages[currentIndex];
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;
        lightboxCaption.textContent = currentImage.alt;
        
        // Gérer la visibilité des boutons précédent/suivant
        if (lightboxPrev) {
            lightboxPrev.style.display = currentImages.length > 1 ? 'flex' : 'none';
        }
        if (lightboxNext) {
            lightboxNext.style.display = currentImages.length > 1 ? 'flex' : 'none';
        }
    }
    
    // Fonction pour passer à l'image suivante
    function nextImage() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateLightboxImage();
    }
    
    // Fonction pour passer à l'image précédente
    function prevImage() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateLightboxImage();
    }
    
    // Fonction pour attacher les écouteurs aux photos
    function attachPhotoListeners() {
        const photoItems = document.querySelectorAll('.photo-item[data-lightbox]');
        
        photoItems.forEach((item) => {
            // Retirer les anciens écouteurs en clonant
            const newItem = item.cloneNode(true);
            if (item.parentNode) {
                item.parentNode.replaceChild(newItem, item);
            }
            
            // Ajouter le nouvel écouteur
            newItem.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const gallery = this.getAttribute('data-lightbox');
                const galleryItems = document.querySelectorAll(`.photo-item[data-lightbox="${gallery}"]`);
                
                // Créer un tableau d'images pour cette galerie
                const images = Array.from(galleryItems).map(item => ({
                    src: item.getAttribute('data-src'),
                    alt: item.getAttribute('data-alt')
                }));
                
                // Trouver l'index de l'image cliquée dans la galerie
                const clickedIndex = Array.from(galleryItems).indexOf(this);
                
                if (images.length > 0 && clickedIndex >= 0) {
                    openLightbox(images, clickedIndex);
                }
            });
        });
    }
    
    // Attacher les écouteurs initialement
    attachPhotoListeners();
    
    // Fermer le lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Fermer en cliquant sur le fond (mais pas sur l'image ou les boutons)
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-image')) {
            closeLightbox();
        }
    });
    
    // Navigation précédent/suivant
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            prevImage();
        });
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', function(e) {
            e.stopPropagation();
            nextImage();
        });
    }
    
    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
}

// Réinitialiser le lightbox après le chargement des composants
function reinitLightbox() {
    // Attendre un peu pour que le DOM soit mis à jour
    setTimeout(() => {
        // Réinitialiser le lightbox (qui va réattacher les écouteurs)
        initLightbox();
    }, 200);
}

// Exporter les fonctions pour utilisation dans components.js
window.initScrollEffects = initScrollEffects;
window.initContactForm = initContactForm;
window.reinitLightbox = reinitLightbox;

