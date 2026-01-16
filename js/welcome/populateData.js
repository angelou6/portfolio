import { clickHandle } from "../utils.js";


async function fetchData(url) {
    const data = await fetch(url)
    return await data.json()
}

export async function populate(element, url) {
    const data = await fetchData(url)
    for (const post of data) {
        const link = document.createElement("a");
        link.href = `./reader?content=${post.path}`
        link.text = post.name.slice(0, -3);
        link.onclick = clickHandle
        element.appendChild(link)
    }
}