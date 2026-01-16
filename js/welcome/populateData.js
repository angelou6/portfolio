import MoveElement from "../moveElement.js";


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

export async function clickHandle(e, movement = undefined, direction = "down") {
    e.preventDefault()
    const moveSpeed = 450
    let animationTarget

    if (movement === undefined) {
        animationTarget = new MoveElement(e.target.parentElement);
    } else {
        animationTarget = movement
    }

    if (direction === "down")
        await animationTarget.moveDown(moveSpeed)
    else if (direction === "up")
        await animationTarget.moveUp(moveSpeed)
    else if (direction === "left")
        await animationTarget.moveLeft(moveSpeed)
    else if (direction === "right")
        await animationTarget.moveRight(moveSpeed)

    window.location.assign(e.target.href)
}