import { getMetals, getOrderBuilder, setMetal } from "./database.js"


document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "metal") {
            setMetal(parseInt(event.target.value))
        }
    }
)

export const Metals = () => {
    const state = getOrderBuilder()
    const metals = getMetals()
    let html = "<ul>"

    if (state.metalId) {

        let html = "<ul>"
        const selectedMetal = metals.map(metal => {
            // This is how you have been converting objects to <li> elements
            if (metal.id === state.metalId) {
                html += `<li>
            <input type="radio" name="metal" value="${metal.id}" checked /> ${metal.metal}
        </li>`
            }
            else {
                html += `<li>
                <input type="radio" name="metal" value="${metal.id}"/> ${metal.metal}
            </li>`
            }
        })
        html += selectedMetal.join("")
        html += "</ul>"
        return html
    }
    const listItemsArray = metals.map(metal => {
        html += `<li>
        <input type="radio" name="metal" value="${metal.id}"/> ${metal.metal}
    </li>`
    })

    html += listItemsArray.join("")
    html += "</ul>"
    return html
}

