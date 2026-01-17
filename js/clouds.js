export function addRandomClouds(container, cloudAmount = 30) {
    const fragment = document.createDocumentFragment();
    const baseCloud = document.createElement("img");
    baseCloud.src = `./public/assets/cloud.png`;
    baseCloud.className = "cloud";

    for (let i = 0; i < cloudAmount; i++) {
        const cloud = baseCloud.cloneNode(true);

        const randomWidth = Math.floor(Math.random() * 7 + 5);
        const randomDuration = Math.floor(Math.random() * 70 + 50);
        const randomY = Math.floor(Math.random() * 75);
        const randomX = Math.floor(Math.random() * 90);
        const randomDelay = Math.random() * randomDuration;

        cloud.style.cssText = `
            width: ${randomWidth}cm;
            top: ${randomY}%;
            left: ${randomX}%;
            animation-delay: -${randomDelay}s;
            --random-time: ${randomDuration}s;
        `;

        fragment.appendChild(cloud);
    }
    container.appendChild(fragment);
}