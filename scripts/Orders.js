import { getJewelry, getOrders, getSizes, getStyles, setJewelry } from "./database.js"
import { getMetals } from "./database.js"

// Remember that the function you pass to find() must return true/false

const buildOrderListItem = (order) => {
    const metals = getMetals()
    const sizes = getSizes()
    const styles = getStyles()
    const jewels = getJewelry()
    
    const foundJewelry = jewels.find(
        (jewel) => {
            return jewel.id === order.jewelryId
        }
    )
    
    const foundMetal = metals.find(
        (metal) => {
            return metal.id === order.metalId
        }
    )
    const costOfMetal = foundMetal.price
    
    const foundSize = sizes.find(
        (size) => {
            return size.id === order.sizeId
        }
    )
    const costOfSize = foundSize.price
    
    const foundStyle = styles.find(
        (style) => {
            return style.id === order.styleId
        }
    )
    const costOfStyle = foundStyle.price
    
    const defaultCost = costOfStyle + costOfMetal + costOfSize
    const costOfEarring = defaultCost * 2
    const costOfNecklace = defaultCost * 4
    const costRing = defaultCost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })

    const costEarring = costOfEarring.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })

    const costNecklace = costOfNecklace.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })

    if (foundJewelry.type === "Earring") {
        return `<li>
    Order #${order.id} cost ${costEarring}
</li>`       
    }
    else if (foundJewelry.type === "Necklace") {
        return `<li>
    Order #${order.id} cost ${costNecklace}
</li>`
    }
    return `<li>
    Order #${order.id} cost ${costRing}
</li>`
}

export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
    const orders = getOrders()

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}

export const jewelryOptions = () => {
    let html = "<ul class=jewelryOptions>"
    const jewelry = getJewelry()
    // Use .map() for converting objects to <li> elements
    const listItems = jewelry.map(jewel => {
        return `<li>
            <input type="radio" name="jewelry" value="${jewel.id}" /> ${jewel.type}
        </li>`
    })

    html += listItems.join("")
    html += "</ul>"

    return html
}

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "jewelry") {
            setJewelry(parseInt(event.target.value))
        }
    }
)
