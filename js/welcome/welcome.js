import MoveElement from "../moveElement.js";
import { populate, clickHandle } from "./populateData.js";

const selector = document.querySelector(".selector")
const links = document.querySelectorAll(".selector a")

const blogs = document.getElementById("blog");
const projects = document.getElementById("projects");

selector.style.transform = ""
blogs.style.transform = ""
projects.style.transform = ""

const blogButton = document.getElementById("blogsButton");
const projectsButton = document.getElementById("projectsButton");

const goBackButton = document.getElementsByClassName("goback");

const selectorMovement = new MoveElement(selector)
const blogsMovement = new MoveElement(blogs)
const projectsMovement = new MoveElement(projects);

(async () => {
    await populate(blogs, "https://api.github.com/repos/angelou6/website/contents/blog")
    await populate(projects, "https://api.github.com/repos/angelou6/website/contents/projects")
})();

for (const back of goBackButton) {
    const parent = back.parentElement
    if (parent.id === "blog")
        back.onclick = () => goBack(blogsMovement, "blog")
    else
        back.onclick = () => goBack(projectsMovement, "projects")
}

for (const link of links) {
    link.onclick = (e) => clickHandle(e, selectorMovement);
}

async function goBack(movement) {
    await movement.resetPosition(500)
    selectorMovement.moveCenter()
}

async function openWithAnimation(movement) {
    await selectorMovement.moveLeft(500)
    movement.moveCenter()
}

blogButton.onclick = () => openWithAnimation(blogsMovement)
projectsButton.onclick = () => openWithAnimation(projectsMovement)


document.addEventListener("DOMContentLoaded", () => selectorMovement.moveCenter())
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    selectorMovement.moveCenter();
  }
});
