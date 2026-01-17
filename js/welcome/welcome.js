import MoveElement from "../moveElement.js";
import { populate } from "./populateData.js";
import { addRandomClouds } from "../clouds.js";
import { 
    clickHandle, 
    goBackSamePage, 
    openWithAnimation, 
    makeDragable 
} from "../utils.js";

const main = document.querySelector("main");
const clouds = document.querySelector(".clouds");
addRandomClouds(clouds);
main.movement = new MoveElement(main);

const selector = document.querySelector(".selector");
const links = document.querySelectorAll(".selector a");

const projects = document.getElementById("projects");
projects.movement = new MoveElement(projects);
selector.movement = new MoveElement(selector)

const projectsButton = document.getElementById("projectsButton");
const goBackButton = document.getElementsByClassName("goback");

(async () => {
    await populate(
        projects, 
        "https://api.github.com/repos/angelou6/portfolio/contents/projects", 
        main.movement
    )
})();

for (const back of goBackButton) {
    back.addEventListener("click", () => {
        goBackSamePage(projects.movement, selector.movement)
    })
    back.addEventListener("mousedown", (e) => e.stopPropagation())
}

for (const link of links) {
    link.addEventListener("click", (e) => {
        clickHandle(e, main.movement);
    })
    link.addEventListener("mousedown", (e) => e.stopPropagation())
}

projectsButton.addEventListener("click", () => openWithAnimation(projects.movement, selector.movement));
projectsButton.addEventListener("mousedown", (e) => e.stopPropagation());

makeDragable(selector);
makeDragable(projects, selector.movement);

document.addEventListener("DOMContentLoaded", () => main.movement.moveCenter())
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        main.movement.moveCenter();
    }
});
