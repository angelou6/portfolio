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
addRandomClouds(main);
main.movement = new MoveElement(main);

const selector = document.querySelector(".selector");
const links = document.querySelectorAll(".selector a");

const blogs = document.getElementById("blog");
const projects = document.getElementById("projects");

blogs.movement = new MoveElement(blogs);
projects.movement = new MoveElement(projects);
selector.movement = new MoveElement(selector)

const blogButton = document.getElementById("blogsButton");
const projectsButton = document.getElementById("projectsButton");

const goBackButton = document.getElementsByClassName("goback");

(async () => {
    await populate(
        blogs, 
        "https://api.github.com/repos/angelou6/portfolio/contents/blog", 
        main.movement
    )

    await populate(
        projects, 
        "https://api.github.com/repos/angelou6/portfolio/contents/projects", 
        main.movement
    )
})();

for (const back of goBackButton) {
    back.addEventListener("click", () => {
        goBackSamePage(
                back.parentElement.id === "blog" ? blogs.movement : projects.movement,
                selector.movement
            )
    })
    back.addEventListener("mousedown", (e) => e.stopPropagation())
}

for (const link of links) {
    link.addEventListener("click", (e) => {
        clickHandle(e, main.movement);
    })
    link.addEventListener("mousedown", (e) => e.stopPropagation())
}

blogButton.addEventListener("click", () => openWithAnimation(blogs.movement, selector.movement));
blogButton.addEventListener("mousedown", (e) => e.stopPropagation());

projectsButton.addEventListener("click", () => openWithAnimation(projects.movement, selector.movement));
projectsButton.addEventListener("mousedown", (e) => e.stopPropagation());

makeDragable(selector);
makeDragable(blogs, selector.movement);
makeDragable(projects, selector.movement);

document.addEventListener("DOMContentLoaded", () => main.movement.moveCenter())
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        main.movement.moveCenter();
    }
});
