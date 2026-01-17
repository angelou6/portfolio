export function addRandomClouds(container, cloudAmount = 30) {
    for (let i = 0; i < cloudAmount; i++) {
        const cloud = document.createElement("img");

        cloud.src = `./public/assets/cloud.png`;
        cloud.classList.add("cloud");
        
        const randomWidth = Math.floor(Math.random() * 7 + 5); 
        cloud.style.width = `${randomWidth}cm`


        const randomDuration = Math.floor(Math.random() * 70 + 50); 
        cloud.style.setProperty('--random-time', `${randomDuration}s`)

        const randomY = Math.floor(Math.random() * 75); 
        cloud.style.top = `${randomY}%`

        const randomX = Math.floor(Math.random() * 90); 
        cloud.style.left = `${randomX}%`

        const randomDelay = Math.random() * randomDuration;
        cloud.style.animationDelay = `-${randomDelay}s`;

        container.appendChild(cloud);
    }
}
