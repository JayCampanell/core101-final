const enterBtn = document.getElementById('enter-btn');
const overlay = document.getElementById('intro-overlay');
const body = document.body;
const bgAudio = new Audio('assets/Come Out.webm');
bgAudio.loop = true;
bgAudio.volume = 0;

enterBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    body.classList.remove('is-locked');

    bgAudio.play().catch(e => console.log("Audio play failed:", e));
    
    updateVolume();
});

// add images
const mediaData = [
    { id: 1, type: 'img', src: "assets/ligon-1.jpg", width: 500, height: 500, x: 1400, y: 1150, z: 1,  links: [2, 4, 6], url: "https://www.glennligonstudio.com/artwork/come-out-series/come-out-study-5-2014/"},
    { id: 2, type: 'img', src: 'assets/reich-1.jpeg', width: 350, height: 350, x: 1900, y: 1800, z: 2,  links: [1,3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], url: "https://youtu.be/g0WVh1D0N50?si=FBQyvuUD2lFEEt0o"},
    { id: 3, type: 'img', src: 'assets/hirsch-1.jpg', width: 600, height: 450, x: 2160, y: 2600, z: 3,  links: [2], url: "https://vimeo.com/141265024" },
    { id: 4, type: 'img', src: 'assets/ligon-2.jpg', width: 900, height: 500, x: 400, y: 800, z: 4, links: [2, 1], url: "https://www.glennligonstudio.com/artwork/come-out-series/come-out-14-2015/"},
    { id: 6, type: 'img', src: 'assets/ligon-3.png', width: 600, height: 400, x: 500, y: 300, z: 5,  links: [2, 1, 4], url: "https://www.betterworldbooks.com/product/detail/glenn-ligon-come-out-9781905464999" },
    { id: 7, type: 'img', src: 'assets/beefheart-1.png', width: 450, height: 450, x: 2300, y: 370, z: 5,  links: [2], url: "https://youtu.be/NZFG1yAxjdQ?si=1WEhzfuyk1ROGfcJ&t=158"},
    { id: 8, type: 'img', src: 'assets/ligon-4.jpg', width: 550, height: 550, x: 200, y: 1400, z: 5,  links: [2, 1, 4, 6, 9, 10], url: "https://www.glennligonstudio.com/artwork/a-small-band-2015/" },
    { id: 9, type: 'img', src: 'assets/ligon-5.jpg', width: 850, height: 550, x: 1100, y: 2410, z: 5,  links: [2, 1, 4, 6, 8, 10], url: "https://www.glennligonstudio.com/artwork/a-small-band-2015/" },
    { id: 10, type: 'img', src: 'assets/ligon-6.jpg', width: 550, height: 550, x: 50, y: 2170, z: 5,  links: [2, 1, 4, 6, 8,9], url: "https://www.glennligonstudio.com/artwork/a-small-band-2015/" },
    { id: 11, type: 'img', src: 'assets/doom-1.png', width: 450, height: 450, x: 3100, y: 2170, z: 5,  links: [2], url: "https://youtu.be/jytxkJUM_7U?si=nAIm77rEh_eGcyZg" },
    { id: 12, type: 'img', src: 'assets/earl-1.png', width: 450, height: 450, x: 3900, y: 1870, z: 5,  links: [2, 11], url: "https://youtu.be/DjLeA9yS2ek?si=KHnDAa6RTnXtKxGF"},
    { id: 13, type: 'img', src: 'assets/jpeg.jpg', width: 450, height: 450, x: 4700, y: 1470, z: 5,  links: [2], url: "https://youtu.be/-u-1zrI4V_g?si=3aM9Huf7qCCL9mR-" },
    { id: 14, type: 'img', src: 'assets/keersmaker-1.jpg', width: 650, height: 550, x: 2100, y: 1170, z: 5,  links: [2], url: "https://youtu.be/ouYiTiiY3vg?si=XaP7T9lcsaAy40Hx" },
    { id: 15, type: 'img', src: 'assets/eno.jpg', width: 450, height: 450, x: 5600, y: 670, z: 5,  links: [2], url: "https://youtu.be/vNwYtllyt3Q?si=dULK7ZFA7v-L_R7I"}
];

// render images
const worldContainer = document.getElementById('world');
const svgCanvas = document.getElementById('connections');
let highestZIndex = 10; 

mediaData.forEach(item => {
    let el = document.createElement('img');
    el.src = item.src;
    el.loading = 'lazy'; 
    el.className = 'media-item';
    
    el.style.width = `${item.width}px`;
    el.style.height = `${item.height}px`;
    el.style.left = `${item.x}px`;
    el.style.top = `${item.y}px`;
    el.style.zIndex = item.z;

    el.addEventListener('mousedown', () => {
        highestZIndex++;
        el.style.zIndex = highestZIndex;
    });

    el.addEventListener('click', () => {
    // Opens the URL in a new tab. 
    // Use window.location.href = item.url; if you want it to open in the same tab.
    window.open(item.url, '_blank'); 
    });

    worldContainer.appendChild(el);
});



mediaData.forEach(item => {
    item.links.forEach(targetId => {
        const targetItem = mediaData.find(data => data.id === targetId);
        
        if (targetItem) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            
            const startX = item.x + (item.width / 2);
            const startY = item.y + (item.height / 2);
            const endX = targetItem.x + (targetItem.width / 2);
            const endY = targetItem.y + (targetItem.height / 2);

            line.setAttribute("x1", startX);
            line.setAttribute("y1", startY);
            line.setAttribute("x2", endX);
            line.setAttribute("y2", endY);
            line.setAttribute("class", "network-line");

            svgCanvas.appendChild(line);
        }
    });
});

// add volume logic

const audioCenterX = 1700 + (350 / 2); 
const audioCenterY = 1800 + (350 / 2); 

// max distance user will hear from
const maxDistance = 3500; 

function updateVolume() {
    // get current center
    const viewportCenterX = window.scrollX + (window.innerWidth / 2);
    const viewportCenterY = window.scrollY + (window.innerHeight / 2);

    // calculate distance
    const dx = viewportCenterX - audioCenterX;
    const dy = viewportCenterY - audioCenterY;
    const distance = Math.sqrt((dx * dx) + (dy * dy));

    // map distance to volume
    let volume = 1 - (distance / maxDistance);

    if (volume < 0) volume = 0;
    if (volume > 1) volume = 1;

    bgAudio.volume = volume;
}

// 3. rest when scorlling or resizing
window.addEventListener('scroll', updateVolume);
window.addEventListener('resize', updateVolume);

// start user near the reich image
window.scrollTo({ left: 1050, top: 1400, behavior: 'instant' });