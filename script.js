const brunoPhotos = ["b1.jpg","b2.jpg","b3.jpg","b4.jpg","b5.jpg"];
const aliciaPhotos = ["a1.jpg","a2.jpg","a3.jpg","a4.jpg","a5.jpg"];
const couplePhotos = ["c1.jpg","c2.jpg","c3.jpg","c4.jpg","c5.jpg","c6.jpg","c7.jpg"];

function createCarousel(containerId, photos) {
    const container = document.getElementById(containerId);
    let div = document.createElement("div");
    div.className = "carousel";

    photos.forEach((p, i) => {
        let img = document.createElement("img");
        img.src = p;
        if (i === 0) img.classList.add("active");
        div.appendChild(img);
    });

    container.appendChild(div);
    setTimeout(() => div.classList.add("show"), 100);

    let i = 0;
    let interval = setInterval(() => {
        let imgs = div.querySelectorAll("img");
        if(imgs.length > 0) {
            imgs[i].classList.remove("active");
            i = (i + 1) % imgs.length;
            imgs[i].classList.add("active");
        }
    }, 3000);

    return { div, interval, duration: photos.length * 3000 };
}

// Particules
setInterval(() => {
    let p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 8000);
}, 3000);

// Séquence d'animation
const delay = 2000;

// 1. Bruno
setTimeout(() => {
    document.getElementById('glowBruno').style.opacity = 1;
    let c = createCarousel('carousel-bruno', brunoPhotos);
    
    setTimeout(() => {
        document.getElementById('glowBruno').style.opacity = 0;
        c.div.classList.replace("show", "hide");
        clearInterval(c.interval);
    }, c.duration);
}, delay);

// 2. Alicia (se lance après Bruno)
const aliciaStart = delay + (brunoPhotos.length * 3000) + 1000;
setTimeout(() => {
    document.getElementById('glowAlicia').style.opacity = 1;
    let c = createCarousel('carousel-alicia', aliciaPhotos);

    setTimeout(() => {
        document.getElementById('glowAlicia').style.opacity = 0;
        c.div.classList.replace("show", "hide");
        clearInterval(c.interval);
    }, c.duration);
}, aliciaStart);

// 3. Couple
const coupleStart = aliciaStart + (aliciaPhotos.length * 3000) + 1000;
setTimeout(() => {
    document.getElementById('glowCenter').style.opacity = 1;
    document.getElementById('nousTxt').style.opacity = 1;
    document.getElementById('ring').style.opacity = 1;
    createCarousel('carousel-couple', couplePhotos);
}, coupleStart);
