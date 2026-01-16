import MoveElement from "../moveElement.js";

const params = new URLSearchParams(document.location.search);
const content = params.get("content")
const post = document.querySelector("main")

if (content === null) window.location.replace("./")

async function gethtml() {
    const res = await fetch(
        `https://api.github.com/repos/angelou6/website/contents/${content}?ref=main`,
        {
            headers: {
                "Accept": "application/vnd.github.html+json"
            }
        }
    )
    const html = await res.text()
    return html
}


(async () => {
    const html = await gethtml()
    const button = document.createElement("a")
    button.innerText = "Go back"
    button.href = "./"
    post.innerHTML += html
    const htmlElement = document.getElementById("file")
    htmlElement.prepend(button);

    htmlElement.style.transform = "translateY(-100vh)"
    const postMovement = new MoveElement(htmlElement);
    button.onclick = (e) => goBack(e, postMovement);

    postMovement.moveCenter(1600);
})();

async function goBack(e, movement) {
    e.preventDefault()
    await movement.resetPosition(500)
    window.location.assign(e.target.href)
}