// write your code here
const showRamen = (ramenObject) => {
    const mainIMG = document.querySelector("#ramen-detail img")
    mainIMG.src = ramenObject.image
    mainIMG.alt = ramenObject.id

    const ramenName = document.querySelector("h2.name")
    ramenName.textContent = ramenObject.name

    const ramenResturant = document.querySelector("h3.restaurant")
    ramenResturant.textContent = ramenObject.restaurant

    const ramenRating = document.getElementById("rating-display")
    ramenRating.textContent = ramenObject.rating

    const ramenComment = document.getElementById("comment-display")
    ramenComment.textContent = ramenObject.comment
}

const addRamen = ramenObject => {
    const ramenIMG = document.createElement("img")
    ramenIMG.src = ramenObject.image
    ramenIMG.id = "img" + ramenObject.id.toString()
    
    document.getElementById("ramen-menu").append(ramenIMG)
    ramenIMG.addEventListener("click", () => {
        showRamen(ramenObject)
    })
}

const submitRamen = () => {
    const ramenForm = document.getElementById("new-ramen")
    ramenForm.addEventListener("submit", event => {
        event.preventDefault()

        const newRamenObject = {}
        newRamenObject["name"] = document.getElementById("new-name").value
        newRamenObject["resturant"] = document.getElementById("new-restaurant").value
        newRamenObject["image"] = document.getElementById("new-image").value
        newRamenObject["rating"] = document.getElementById("new-rating").value
        newRamenObject["comment"] = document.getElementById("new-comment").value

        fetch("http://localhost:3000/ramens")
        .then(resp => resp.json())
        .then(ramenArray => {
            newRamenObject.id = ramenArray.slice(-1)[0].id + 1
            const postData = {
                method:"post",
                headers: {
                    "content-type":"application/json",
                    "accept":"application/json"
                },
                body: JSON.stringify(newRamenObject)
            }
            addRamen(newRamenObject)
            fetch("http://localhost:3000/ramens", postData)
        })
    })
}

const renderPage = () => {
    fetch("http://localhost:3000/ramens")
    .then(resp => resp.json())
    .then(objectArray => {
        objectArray.forEach(object => {
            addRamen(object)
        })
        showRamen(objectArray[0])
    })
}

const theDeleteButton = () => {
    const deleteButton = document.getElementById("delete")
    deleteButton.addEventListener("click", () => {
        const currentId = document.querySelector("#ramen-detail img").alt
        fetch(`http://localhost:3000/ramens/${currentId}`,{method:"delete"})
        .then(() => {
            document.getElementById("img" + currentId.toString()).remove()
            fetch("http://localhost:3000/ramens").then(resp => resp.json())
            .then(objectArray => showRamen(objectArray[0]))
        })
        
    })
}

renderPage()
submitRamen()
theDeleteButton()