import MoveElement from "../moveElement.js";
import { goBack, gethtml, makeDragable } from "../utils.js";

const params = new URLSearchParams(document.location.search);
const content = params.get("content");

if (content === null) window.location.replace("./");

const goBackLink = document.querySelector(".gobackreader");
const post = document.querySelector(".container");
post.movement = new MoveElement(post);

makeDragable(post, undefined, "./");

(async () => {
    const html = await gethtml(content)
    post.insertAdjacentHTML('beforeend', html)
})();

goBackLink.onclick = (e) => { goBack(e, postMovement) }

document.addEventListener("DOMContentLoaded", () => post.movement.moveCenter(1600))
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    postMovement.moveCenter();
  }
});
