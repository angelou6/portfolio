export default class MoveElement {
    constructor(element) {
        this.element = element;
        [this.originalXpos, this.originalYpos] = this.#getElementPosition(this.element);
    }

    #getElementPosition(element) {
        const style = getComputedStyle(element);
        const transform = style.transform;
        let x = 0, y = 0;

        if (transform !== "none") {
            const values = transform.match(/matrix.*\((.+)\)/)[1].split(", ");
            x = parseFloat(values[4]);
            y = parseFloat(values[5]);
        }

        return [x, y]
    }

    #easeInOut(t) {
        return t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    #moveFunction(animationDuration, axis, direction) {
        let [xPos, yPos] = this.#getElementPosition(this.element);
        return new Promise(resolve => {
            const duration = animationDuration;
            let end
            let start
            if (axis === "x") {
                end = window.innerWidth;
                start = xPos;
            } else {
                end = window.innerHeight;
                start = yPos;
            }
            const startTime = performance.now();

            let movementAxis
            const step = (now) => {
                const elapsed = now - startTime;
                const t = Math.min(elapsed / duration, 1);
                const eased = this.#easeInOut(t);

                if (direction === "negative")
                    movementAxis = start - (end - start) * eased;
                else
                    movementAxis = start + (end - start) * eased;

                if (axis === "x")
                    this.element.style.transform = `translateX(${movementAxis}px)`;
                else
                    this.element.style.transform = `translateY(${movementAxis}px)`;

                if (t < 1) {
                    requestAnimationFrame(step);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(step);
        })
    }

    moveLeft(animationDuration = 800) {
        return this.#moveFunction(animationDuration, "x", "negative")
    }

    moveRight(animationDuration = 800) {
        return this.#moveFunction(animationDuration, "x", "positive")
    }

    moveDown(animationDuration = 800) {
        return this.#moveFunction(animationDuration, "y", "positive")
    }

    moveUp(animationDuration = 800) {
        return this.#moveFunction(animationDuration, "y", "negative")
    }

    moveCenter(animationDuration = 800) {
        let [xPos, yPos] = this.#getElementPosition(this.element);
        return new Promise(resolve => {
            const duration = animationDuration;
            const startTime = performance.now();

            const step = (now) => {
                const elapsed = now - startTime;
                const t = Math.min(elapsed / duration, 1);
                const eased = this.#easeInOut(t);

                if (xPos !== 0)
                    xPos -= xPos * eased;

                if (yPos !== 0)
                    yPos -= yPos * eased;

                this.element.style.transform =
                    `translate(${xPos}px, ${yPos}px)`;

                if (t < 1) {
                    requestAnimationFrame(step);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(step);
        })
    }

    resetPosition(animationDuration = 800) {
        let [xPos, yPos] = this.#getElementPosition(this.element);
        return new Promise(resolve => {
            const startX = xPos;
            const startY = yPos;

            const endX = this.originalXpos;
            const endY = this.originalYpos;

            const startTime = performance.now();

            const step = (now) => {
                const elapsed = now - startTime;
                const t = Math.min(elapsed / animationDuration, 1);
                const eased = this.#easeInOut(t);

                xPos = startX + (endX - startX) * eased;
                yPos = startY + (endY - startY) * eased;

                this.element.style.transform =
                    `translate(${xPos}px, ${yPos}px)`;

                if (t < 1) {
                    requestAnimationFrame(step);
                } else {
                    resolve();
                }
            };
            requestAnimationFrame(step);
        });
    }
}
