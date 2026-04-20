const enterBtn = document.getElementById('enter-btn');
const overlay = document.getElementById('intro-overlay');
const body = document.body;

enterBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    body.classList.remove('is-locked');
});

// add images
const mediaData = [
    { id: 1, type: 'img', src: "assets/ligon-1.jpg", width: 500, height: 500, x: 1200, y: 1150, z: 1,  links: [2] },
    { id: 2, type: 'img', src: 'assets/reich-1.jpeg', width: 350, height: 350, x: 1700, y: 1800, z: 2,  links: [1] },
    { id: 3, type: 'img', src: 'assets/hirsch-1.jpg', width: 400, height: 250, x: 950, y: 2200, z: 3,  links: [2] },
    { id: 4, type: 'img', src: 'assets/ligon-2.jpg', width: 900, height: 500, x: 200, y: 800, z: 4, links: [2, 1] },
    { id: 5, type: 'img', src: 'assets/essay-1.png', width: 1000, height: 300, x: 850, y: 800, z: 5,  links: [6] },
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

// start user near the reich image
window.scrollTo({ left: 1700, top: 1800, behavior: 'instant' });