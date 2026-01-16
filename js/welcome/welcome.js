import MoveElement from "../moveElement.js";
import { populate } from "./populateData.js";
import { clickHandle, goBackSamePage, openWithAnimation } from "../utils.js";

const selector = document.querySelector(".selector")
const links = document.querySelectorAll(".selector a")

const blogs = document.getElementById("blog");
const projects = document.getElementById("projects");

const blogButton = document.getElementById("blogsButton");
const projectsButton = document.getElementById("projectsButton");

const goBackButton = document.getElementsByClassName("goback");

const selectorMovement = new MoveElement(selector)
const blogsMovement = new MoveElement(blogs)
const projectsMovement = new MoveElement(projects);

(async () => {
    await populate(blogs, "https://api.github.com/repos/angelou6/portfolio/contents/blog")
    await populate(projects, "https://api.github.com/repos/angelou6/portfolio/contents/projects")
})();

for (const back of goBackButton) {
    const parent = back.parentElement
    back.onclick = () => goBackSamePage(
        parent.id === "blog" ? blogsMovement : projectsMovement,
        selectorMovement
    )
}

for (const link of links) {
    link.onclick = (e) => clickHandle(e, selectorMovement);
}

blogButton.onclick = () => openWithAnimation(blogsMovement, selectorMovement)
projectsButton.onclick = () => openWithAnimation(projectsMovement, selectorMovement)

document.addEventListener("DOMContentLoaded", () => selectorMovement.moveCenter())
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    selectorMovement.moveCenter();
  }
});
