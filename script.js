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
/* --- SECTION ARBRE MAGIQUE --- */

/* La section qui contient tout le bloc de l'arbre */
#arbre-magique {
    /* On force le blanc pour que l'image de l'arbre (qui a un fond blanc) se fonde dans la page */
    background-color: #ffffff !important;
}

/* Le conteneur qui gère l'espace de l'arbre */
.tree-container {
    position: relative;
    width: 100%;
    /* 80vh = l'arbre prend 80% de la hauteur de l'écran */
    height: 80vh; 
    /* Ces 3 lignes permettent de centrer l'arbre horizontalement et verticalement */
    display: flex;
    justify-content: center;
    align-items: center;
}

/* L'image de l'arbre elle-même */
.tree-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    /* 'contain' est crucial : il affiche l'arbre EN ENTIER sans jamais le couper */
    background: url("arbre.png") center center / contain no-repeat;
    /* On le met en arrière-plan (z-index 0) pour que les photos soient devant */
    z-index: 0;
}

/* Le "guide" invisible qui fait la largeur de l'arbre pour placer les photos */
.inner-layout {
    position: relative;
    width: 100%;
    /* On limite à 1000px pour que Bruno et Alicia ne s'écartent pas trop sur les grands écrans */
    max-width: 1000px; 
    height: 100%;
    z-index: 2;
}

/* Le bloc qui regroupe 1 Nom + 1 Photo + 1 Effet lumineux */
.person-section {
    position: absolute; /* Permet de placer le bloc précisément avec top/left */
    display: flex;
    flex-direction: column; /* Aligne le nom AU-DESSUS de la photo */
    align-items: center;
}

/* Coordonnées de placement sur les branches (à ajuster selon tes goûts) */
.left { top: 10%; left: 10%; }      /* Placement de Bruno */
.right { top: 10%; right: 10%; }    /* Placement d'Alicia */
.center { 
    top: 50%; 
    left: 50%; 
    /* Le transform permet de centrer parfaitement le point central sur le cœur */
    transform: translate(-50%, -40%); 
}

/* Le cercle qui contient les photos (le carrousel) */
.carousel-placeholder {
    width: 120px; /* Largeur de la photo */
    height: 120px; /* Hauteur de la photo */
    border-radius: 50%; /* Rend la photo parfaitement ronde */
    overflow: hidden; /* Coupe tout ce qui dépasse du cercle */
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.5); /* Ombre dorée légère autour */
    border: 2px solid #d4af37; /* Bordure dorée */
    background: white;
    opacity: 0; /* Invisible au départ (pour l'animation) */
    transform: scale(0.5); /* Petit au départ (pour l'effet de zoom) */
    transition: 2s; /* Durée de l'animation d'apparition */
}

/* Classe ajoutée par le JavaScript pour faire apparaître la photo */
.carousel-placeholder.show { 
    opacity: 1; 
    transform: scale(1); 
}

/* Style des images à l'intérieur du cercle */
.carousel-placeholder img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Empêche de déformer la photo si elle n'est pas carrée */
    opacity: 0; /* Cachée par défaut */
    transition: 1.5s; /* Fondu entre deux photos */
}

/* Image actuellement visible dans le carrousel */
.carousel-placeholder img.active { 
    opacity: 1; 
}

/* Style des prénoms (Bruno, Alicia, Nous) */
#arbre-magique .label {
    font-family: 'Great Vibes', cursive; /* Police élégante de mariage */
    color: #d4af37; /* Couleur dorée */
    font-size: 35px;
    margin-bottom: 10px; /* Espace entre le nom et la photo */
}

/* L'effet de halo lumineux derrière les photos */
.glow {
    position: absolute;
    width: 180px;
    height: 180px;
    /* Dégradé de doré vers transparent */
    background: radial-gradient(circle, rgba(212, 175, 55, 0.3), transparent);
    opacity: 0; /* Invisible au début */
    filter: blur(20px); /* Floute le halo pour faire "nuage" */
    transition: 2s;
}

/* L'anneau qui tourne autour du carrousel central "Nous" */
.ring {
    position: absolute;
    width: 140px;
    height: 140px;
    border: 2px solid #d4af37;
    border-radius: 50%;
    opacity: 0;
    transition: 2s;
    /* Lance l'animation 'spinArbre' de 12 secondes à l'infini */
    animation: spinArbre 12s linear infinite;
}

/* Définition de l'animation de rotation */
@keyframes spinArbre {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* --- ADAPTATIONS MOBILES (Tablettes et téléphones) --- */
@media (max-width: 768px) {
    /* On réduit la taille des photos pour que ça tienne sur l'écran du téléphone */
    .carousel-placeholder { width: 85px; height: 85px; }
    /* On réduit la taille du texte */
    #arbre-magique .label { font-size: 24px; }
    /* On rapproche les photos des bords pour libérer le centre */
    .left { left: 5%; top: 15%; }
    .right { right: 5%; top: 15%; }
}
