import { getOrderBuilder, getSizes, setSize } from "./database.js"


document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "size") {
            setSize(parseInt(event.target.value))
        }
    }
)

export const DiamondSizes = () => {
    const state = getOrderBuilder()
    const sizes = getSizes()
    let html = "<ul>"

    if (state.sizeId) {

        let html = "<ul>"
        const selectedSize = sizes.map(size => {
            // This is how you have been converting objects to <li> elements
            if (size.id === state.sizeId) {
                return `<li>
            <input type="radio" name="size" value="${size.id}" checked /> ${size.carets}
        </li>`
            }
            else {
                return `<li>
            <input type="radio" name="size" value="${size.id}" /> ${size.carets}
        </li>`
            }
        })
        html += selectedSize.join("")
        html += "</ul>"
        return html
    }

    // Use .map() for converting objects to <li> elements
    const listItems = sizes.map(size => {
        return `<li>
            <input type="radio" name="size" value="${size.id}" /> ${size.carets}
        </li>`
    })

    html += listItems.join("")
    html += "</ul>"

    return html
}

