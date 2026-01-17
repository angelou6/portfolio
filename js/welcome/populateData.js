import { clickHandle } from "../utils.js";

async function fetchData(url) {
    const data = await fetch(url)
    return await data.json()
}

export async function populate(element, url, movement = undefined) {
    const data = await fetchData(url)
    for (const post of data) {
        const link = document.createElement("a");
        link.href = `./reader?content=${post.path}`
        link.text = post.name.slice(0, -3);
        link.addEventListener("click", (e) => {
            if (movement === undefined) {
                clickHandle(e)
            } else {
                clickHandle(e, movement)
            }
        })
        element.appendChild(link)
    }
}