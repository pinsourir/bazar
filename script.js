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
                  LOGIQUE DE L'ARBRE
--------------------------------------------------*/
// J'ai pris des images d'exemple sur Internet pour toi !
const photosData = {
    // Exemples d'hommes (b1.jpg, b2.jpg, b3.jpg)
    bruno: [
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=400&h=400",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=crop&w=400&h=400",
        "https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?fit=crop&w=400&h=400"
    ],
    // Exemples de femmes (a1.jpg, a2.jpg, a3.jpg)
    alicia: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=400&h=400",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=400&h=400",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=400&h=400"
    ],
    // Exemples de couples (c1.jpg, c2.jpg, c3.jpg, etc.)
    couple: [
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?fit=crop&w=400&h=400", // Couple amoureux
        "https://images.unsplash.com/photo-1511208687131-419b6795861b?fit=crop&w=400&h=400", // Couple main dans la main
        "https://images.unsplash.com/photo-1537160751965-037a505f639a?fit=crop&w=400&h=400", // Couple riant
        "https://images.unsplash.com/photo-1516575317770-f47a46c10740?fit=crop&w=400&h=400", // Couple sur la plage
        "https://images.unsplash.com/photo-1521119989659-a83eee488004?fit=crop&w=400&h=400"  // Couple mariage
    ]
};

let activeIntervals = [];

// 1. Prépare les images dans les cercles
function prepareCarousels() {
    Object.keys(photosData).forEach(key => {
        const container = document.getElementById(`carousel-${key}`);
        if (!container) return;
        
        container.innerHTML = ""; // Vide le cercle
        photosData[key].forEach((src, index) => {
            const img = document.createElement("img");
            img.src = src;
            img.loading = "lazy"; // Charge plus vite
            if (index === 0) img.classList.add("active");
            container.appendChild(img);
        });
    });
}

// 2. Remise à zéro de tous les effets
function resetAnimation() {
    activeIntervals.forEach(clearInterval);
    activeIntervals = [];

    const ids = ['glowBruno', 'glowAlicia', 'glowCenter', 'carousel-bruno', 'carousel-alicia', 'carousel-couple', 'nousTxt', 'ring'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.opacity = "0";
            el.classList.remove('show');
        }
    });
}

// 3. Lancement de la séquence magique
function startTreeAnimation() {
    resetAnimation();
    prepareCarousels();

    // Apparition Bruno (après 0.5s)
    setTimeout(() => {
        const glow = document.getElementById('glowBruno');
        glow.style.opacity = "1"; // Le halo solo apparaît
        const container = document.getElementById('carousel-bruno');
        container.classList.add('show'); // Le carrousel solo apparaît
        activeIntervals.push(runRotation(container)); // Il commence à tourner
    }, 500);

    // Apparition Alicia (après 3.5s)
    setTimeout(() => {
        const glow = document.getElementById('glowAlicia');
        glow.style.opacity = "1"; // Le halo solo apparaît
        const container = document.getElementById('carousel-alicia');
        container.classList.add('show'); // Le carrousel solo apparaît
        activeIntervals.push(runRotation(container)); // Il commence à tourner
    }, 3500);

    // Apparition Couple (après 6.5s)
    setTimeout(() => {
        const glow = document.getElementById('glowCenter');
        glow.style.opacity = "1";
        document.getElementById('nousTxt').style.opacity = "1";
        document.getElementById('ring').style.opacity = "1";
        const container = document.getElementById('carousel-couple');
        container.classList.add('show');
        activeIntervals.push(runRotation(container));
    }, 6500);
}

// Fonction pour faire tourner les images
function runRotation(container) {
    let current = 0;
    return setInterval(() => {
        const imgs = container.querySelectorAll('img');
        if (imgs.length === 0) return;
        imgs[current].classList.remove('active');
        current = (current + 1) % imgs.length;
        imgs[current].classList.add('active');
    }, 3000);
}

// --- DÉTECTION AU SCROLL ---
const treeSection = document.querySelector('#arbre-magique');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startTreeAnimation();
            observer.unobserve(treeSection); // Optionnel : ne le lance qu'une fois
        }
    });
}, { threshold: 0.5 }); // Déclenche quand 50% de la section est visible

observer.observe(treeSection);

// --- BOUTON RELANCER ---
document.getElementById('btn-replay').onclick = () => {
    document.getElementById('titre-racines').scrollIntoView({ behavior: 'smooth' });
    startTreeAnimation();
};
