import MoveElement from "../moveElement.js";
import { addRandomClouds } from "../clouds.js";
import { goBack, gethtml, makeDragable } from "../utils.js";

const main = document.querySelector("main");
addRandomClouds(main)
main.movement = new MoveElement(main)

const params = new URLSearchParams(document.location.search);
const content = params.get("content");

if (content === null) window.location.replace("./");

const goBackLink = document.querySelector(".gobackreader");
const post = document.querySelector(".container");
post.movement = new MoveElement(post);

makeDragable(post, main.movement, "./");

(async () => {
    const html = await gethtml(content)
    post.insertAdjacentHTML('beforeend', html)
})();

goBackLink.addEventListener("click", (e) => {
  e.preventDefault()
  goBack(e, main.movement)
})

document.addEventListener("DOMContentLoaded", () => main.movement.moveCenter(1600))
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    main.movement.moveCenter();
  }
});
