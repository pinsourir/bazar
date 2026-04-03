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
// --- LOGIQUE DE L'ARBRE GÉNÉALOGIQUE ---
const brunoPhotos = ["b1.jpg","b2.jpg","b3.jpg"]; // Tes photos
const aliciaPhotos = ["a1.jpg","a2.jpg","a3.jpg"];
const couplePhotos = ["c1.jpg","c2.jpg","c3.jpg"];

function initTreeCarousel(containerId, photos) {
    const container = document.getElementById(containerId);
    photos.forEach((p, i) => {
        let img = document.createElement("img");
        img.src = p;
        if (i === 0) img.classList.add("active");
        container.appendChild(img);
    });

    container.classList.add("show");
    let i = 0;
    return setInterval(() => {
        let imgs = container.querySelectorAll("img");
        imgs[i].classList.remove("active");
        i = (i + 1) % imgs.length;
        imgs[i].classList.add("active");
    }, 3000);
}

// Lancement automatique au scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startTreeAnimation();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('#arbre-magique'));

function startTreeAnimation() {
    // Étape 1 : Bruno
    setTimeout(() => {
        document.getElementById('glowBruno').style.opacity = 1;
        initTreeCarousel('carousel-bruno', brunoPhotos);
    }, 1000);

    // Étape 2 : Alicia
    setTimeout(() => {
        document.getElementById('glowAlicia').style.opacity = 1;
        initTreeCarousel('carousel-alicia', aliciaPhotos);
    }, 4000);

    // Étape 3 : Le Couple
    setTimeout(() => {
        document.getElementById('glowCenter').style.opacity = 1;
        document.getElementById('nousTxt').style.opacity = 1;
        document.getElementById('ring').style.opacity = 1;
        initTreeCarousel('carousel-couple', couplePhotos);
    }, 8000);
}
