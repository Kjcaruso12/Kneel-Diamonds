import { getOrderBuilder, getStyles, setStyle } from "./dataAccess.js"


document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "style") {
            setStyle(parseInt(event.target.value))
        }
    }
)

export const JewelryStyles = () => {
    const state = getOrderBuilder()
    const styles = getStyles()
    let html = "<ul>"

    if (state.styleId) {

        let html = "<ul>"
        const selectedStyle = styles.map(style => {
            // This is how you have been converting objects to <li> elements
            if (style.id === state.styleId) {
                return `<li>
        <input type="radio" name="style" value="${style.id}" checked /> ${style.style}
    </li>`
            }
            else {
                return `<li>
        <input type="radio" name="style" value="${style.id}" /> ${style.style}
    </li>`
            }
        })
        html += selectedStyle.join("")
        html += "</ul>"
        return html
    }

    // Use .map() for converting objects to <li> elements
    const listItemsArray = styles.map(style => {
        return `<li>
        <input type="radio" name="style" value="${style.id}" /> ${style.style}
    </li>`
    })


    // Join all of the strings in the array into a single string
    html += listItemsArray.join("")

    html += "</ul>"
    return html
}

