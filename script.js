// ===== COMPTE À REBOURS MARIAGE =====

// Date du mariage : 26 août 2027 à 15h
const weddingDate = new Date(2027, 7, 26, 15, 0, 0).getTime();

// Fonction pour animer les chiffres
function animateValue(id, value) {

    const element = document.getElementById(id);

    // ajoute une petite animation
    element.classList.add("flip");

    setTimeout(() => {

        // ajoute un 0 devant si nécessaire
        element.innerText = value < 10 ? "0" + value : value;

        element.classList.remove("flip");

    }, 200);
}


// Mise à jour toutes les secondes
setInterval(function() {

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {

        document.getElementById("countdown").innerHTML =
        "<h2>✨ C'est le grand jour ✨</h2>";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    animateValue("days", days);
    animateValue("hours", hours);
    animateValue("minutes", minutes);
    animateValue("seconds", seconds);

}, 1000);

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.onclick = function() {
    navLinks.classList.toggle("open");
}

// Ferme le menu si on clique sur un lien (pratique sur tel)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.onclick = () => {
        navLinks.classList.remove("open");
    };
});
// ========= Fleche du CAROUSEL  ==========
let currentIndex = 0;

function moveSlide(direction) {
    const slide = document.getElementById('carousel').querySelector('.carousel-slide');
    const totalSlides = slide.querySelectorAll('img').length;
    
    currentIndex += direction;

    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }

    const offset = -currentIndex * 100;
    slide.style.transform = `translateX(${offset}%)`;
}


/*-------------------------------------------------
                    ARBRE
--------------------------------------------------*/
// --- CONFIGURATION DES PHOTOS ---
const photosData = {
    bruno: ["b1.jpg", "b2.jpg", "b3.jpg"],
    alicia: ["a1.jpg", "a2.jpg", "a3.jpg"],
    couple: ["c1.jpg", "c2.jpg", "c3.jpg"]
};

let activeIntervals = []; // Stocke les intervalles pour pouvoir les arrêter

// --- FONCTION POUR GÉNÉRER LES IMAGES ---
function prepareCarousels() {
    Object.keys(photosData).forEach(key => {
        const container = document.getElementById(`carousel-${key === 'couple' ? 'couple' : key}`);
        container.innerHTML = ""; // Vide le contenu actuel
        photosData[key].forEach((src, index) => {
            const img = document.createElement("img");
            img.src = src;
            if (index === 0) img.classList.add("active");
            container.appendChild(img);
        });
    });
}

// --- FONCTION DE RÉINITIALISATION ---
function resetAnimation() {
    // Arrêter tous les carrousels en cours
    activeIntervals.forEach(clearInterval);
    activeIntervals = [];

    // Cacher tous les éléments
    const elements = [
        'glowBruno', 'glowAlicia', 'glowCenter', 
        'carousel-bruno', 'carousel-alicia', 'carousel-couple',
        'nousTxt', 'ring'
    ];
    elements.forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            el.style.opacity = "0";
            el.classList.remove('show');
        }
    });
}

// --- FONCTION DE LANCEMENT DE L'ANIMATION ---
function startTreeAnimation() {
    resetAnimation();
    prepareCarousels();

    // Apparition Bruno (après 0.5s)
    setTimeout(() => {
        document.getElementById('glowBruno').style.opacity = "1";
        const container = document.getElementById('carousel-bruno');
        container.classList.add('show');
        activeIntervals.push(startRotation(container));
    }, 500);

    // Apparition Alicia (après 3.5s)
    setTimeout(() => {
        document.getElementById('glowAlicia').style.opacity = "1";
        const container = document.getElementById('carousel-alicia');
        container.classList.add('show');
        activeIntervals.push(startRotation(container));
    }, 3500);

    // Apparition Couple (après 6.5s)
    setTimeout(() => {
        document.getElementById('glowCenter').style.opacity = "1";
        document.getElementById('nousTxt').style.opacity = "1";
        document.getElementById('ring').style.opacity = "1";
        const container = document.getElementById('carousel-couple');
        container.classList.add('show');
        activeIntervals.push(startRotation(container));
    }, 6500);
}

// Fonction pour faire tourner les images
function startRotation(container) {
    let current = 0;
    const imgs = container.querySelectorAll('img');
    return setInterval(() => {
        imgs[current].classList.remove('active');
        current = (current + 1) % imgs.length;
        imgs[current].classList.add('active');
    }, 3000);
}

// --- DÉTECTION DU SCROLL (Observer) ---
const treeSection = document.querySelector('#arbre-magique');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startTreeAnimation();
            // On peut choisir de ne le lancer qu'une fois au scroll :
            // observer.unobserve(treeSection); 
        }
    });
}, { threshold: 0.6 }); // Se lance quand 60% de la section est visible

observer.observe(treeSection);

// --- BOUTON RELANCER ---
document.getElementById('btn-replay').addEventListener('click', () => {
    // Petit effet de scroll fluide pour remonter au titre de l'arbre avant de relancer
    treeSection.scrollIntoView({ behavior: 'smooth' });
    startTreeAnimation();
});
}
