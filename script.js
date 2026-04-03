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
const photosData = {
    bruno: ["b1.jpg", "b2.jpg", "b3.jpg", "b4.jpg", "b5.jpg"],
    alicia: ["a1.jpg", "a2.jpg", "a3.jpg", "a4.jpg", "a5.jpg"],
    couple: ["c1.jpg", "c2.jpg", "c3.jpg", "c4.jpg", "c5.jpg", "c6.jpg", "c7.jpg"]
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

    // Apparition Bruno
    setTimeout(() => {
        document.getElementById('glowBruno').style.opacity = "1";
        const c = document.getElementById('carousel-bruno');
        c.classList.add('show');
        activeIntervals.push(runRotation(c));
    }, 500);

    // Apparition Alicia
    setTimeout(() => {
        document.getElementById('glowAlicia').style.opacity = "1";
        const c = document.getElementById('carousel-alicia');
        c.classList.add('show');
        activeIntervals.push(runRotation(c));
    }, 3500);

    // Apparition "Nous"
    setTimeout(() => {
        document.getElementById('glowCenter').style.opacity = "1";
        document.getElementById('nousTxt').style.opacity = "1";
        document.getElementById('ring').style.opacity = "1";
        const c = document.getElementById('carousel-couple');
        c.classList.add('show');
        activeIntervals.push(runRotation(c));
    }, 6500);
}

// Gère le défilement des photos dans un cercle
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
            // Optionnel : observer.unobserve(treeSection); // Si on veut que ça ne se lance qu'une fois
        }
    });
}, { threshold: 0.5 }); // Déclenche quand 50% de la section est visible

observer.observe(treeSection);

// --- BOUTON RELANCER ---
document.getElementById('btn-replay').onclick = () => {
    document.getElementById('titre-racines').scrollIntoView({ behavior: 'smooth' });
    startTreeAnimation();
};
