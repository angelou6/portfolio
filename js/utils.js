import MoveElement from "./moveElement.js"

export async function gethtml(content) {
    const res = await fetch(
        `https://api.github.com/repos/angelou6/portfolio/contents/${content}?ref=main`,
        {
            headers: {
                "Accept": "application/vnd.github.html+json"
            }
        }
    )
    const html = await res.text()
    return html
}

export async function goBack(e, movement) {
    e.preventDefault()
    await movement.moveDown(500)
    window.location.assign(e.target.href)
}

export async function goBackSamePage(movement, selectorMovement) {
    await movement.resetPosition(500)
    selectorMovement.moveCenter()
}

export async function openWithAnimation(movement, selectorMovement) {
    await selectorMovement.moveLeft(500)
    movement.moveCenter()
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