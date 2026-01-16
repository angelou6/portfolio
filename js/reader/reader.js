import MoveElement from "../moveElement.js";
import { goBack, gethtml } from "../utils.js";

const params = new URLSearchParams(document.location.search);
const content = params.get("content");

if (content === null) window.location.replace("./");

const post = document.querySelector(".container");
const goBackLink = document.querySelector(".gobackreader");
const postMovement = new MoveElement(post);

(async () => {
    const html = await gethtml(content)
    post.insertAdjacentHTML('beforeend', html)
})();

goBackLink.onclick = (e) => { goBack(e, postMovement) }

document.addEventListener("DOMContentLoaded", () => postMovement.moveCenter(1600))
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    postMovement.moveCenter();
  }
});
