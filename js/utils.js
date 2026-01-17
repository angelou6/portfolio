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

function approximatelyEqual(num1, num2, tolerance) {
    return Math.abs(num1 - num2) < tolerance;
};

export function makeDragable(element, seccondMovement = undefined, redirect = undefined) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    const dragThreshold = 5;

    const getDirection = (clientY, clientX, verticalTolerance, horizontalTolerance) => {
        if (approximatelyEqual((innerHeight - clientY), 0, verticalTolerance)) {
            return "down";
        } else if (approximatelyEqual((innerHeight - startY), innerHeight, verticalTolerance)) {
            return "up";
        } else if (approximatelyEqual((innerWidth - clientX), 0, horizontalTolerance)) {
            return "right";
        } else if (approximatelyEqual((innerWidth - clientX), innerWidth, horizontalTolerance)) {
            return "left";
        } else {
            return null;
        }
    }

    const handleMove = (e) => {
        element.style.cursor = "grabbing"
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;

        if (!isDragging && (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold)) {
            isDragging = true;
        }

        if (isDragging) {
            if (e.cancelable) e.preventDefault();

            let [leftVal, topVal] = element.movement.getElementPosition(element);
            element.style.transform = `translate(${leftVal + deltaX}px, ${topVal + deltaY}px)`;

            startX = clientX;
            startY = clientY;
        }
    };

    const handleStop = async (e) => {
        const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
        element.style.cursor = ""

        const seccondMovementOrRedirect = async () => {
            if (seccondMovement && redirect) {
                await seccondMovement.moveDown()
                location.assign(redirect)
                return
            } else if (seccondMovement) {
                seccondMovement.moveCenter()
                return
            } else if (redirect) {
                location.assign(redirect)
                return
            }
        }

        if (isDragging) {
            if (seccondMovement || redirect) {
                const horizontalTolerance = 500
                const verticalTolerance = 200
                const direction = getDirection(clientY, clientX, verticalTolerance, horizontalTolerance);

                if (direction === "up") {
                    await element.movement.moveUp()
                    await seccondMovementOrRedirect()
                } else if (direction === "down") {
                    await element.movement.moveDown()
                    await seccondMovementOrRedirect()
                } else if (direction === "left") {
                    await element.movement.moveLeft()
                    await seccondMovementOrRedirect()
                } else if (direction === "right") {
                    await element.movement.moveRight()
                    await seccondMovementOrRedirect()
                } else {
                    element.movement.moveCenter()
                }
            } else {
                element.movement.moveCenter();
            }
        }

        isDragging = false;
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleStop);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleStop);
    };

    const startDrag = (e) => {
        startX = e.touches ? e.touches[0].clientX : e.clientX;
        startY = e.touches ? e.touches[0].clientY : e.clientY;
        isDragging = false;

        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseup", handleStop);
        document.addEventListener("touchmove", handleMove, { passive: false });
        document.addEventListener("touchend", handleStop);
    };

    element.addEventListener("mousedown", startDrag);
    element.addEventListener("touchstart", startDrag, { passive: true });
}
