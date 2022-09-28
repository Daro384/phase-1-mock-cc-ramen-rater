//time start = 4:58

const API = "http://localhost:3000/ramens"

const addingRamenIMG = ramenObject => {
    const ramenIMG = document.createElement("img")
    ramenIMG.src = ramenObject.image
    ramenIMG.alt = ramenObject.name
    ramenIMG.id = "IMG " + ramenObject.id
    document.getElementById("ramen-menu").append(ramenIMG)

    ramenIMG.addEventListener("click", () => displayRamen(ramenObject))
}

const displayRamen = ramenObject => {
    const ramenIMG = document.querySelector("img.detail-image")
    ramenIMG.src = ramenObject.image
    ramenIMG.alt = ramenObject.name
    ramenIMG.value = ramenObject.id //used to know which ramen to delete when deleteButton is pressed

    document.querySelector("div h2.name").textContent = ramenObject.name
    document.querySelector("div h3.restaurant").textContent = ramenObject.restaurant
    document.getElementById("rating-display").textContent = ramenObject.rating
    document.getElementById("comment-display").textContent = ramenObject.comment
}



const postRamen = (url, ramenObject) => {
    const data = {
        method:"post",
        headers: {
            "content-type":"application/json",
            "accept":"application/json"
        },
        body: JSON.stringify(ramenObject)
    }
    return fetch(url, data) //spent 15 minutes wondering why it didnt work (i forgot the return)
}

const addRamenForm = () => {
    document.getElementById("new-ramen").addEventListener("submit", event => {
        event.preventDefault()
        const newRamenObject = {
            name:event.target.name.value,
            restaurant:event.target.restaurant.value,
            image:event.target.image.value,
            rating:event.target.rating.value,
            comment: event.target["new-comment"].value
        }
        fetch(API).then(resp => resp.json())
        .then(ramenArray => {
            newRamenObject["id"] = ramenArray.length + 1
            postRamen(API, newRamenObject).then(() => {
                addingRamenIMG(newRamenObject)
            })
            
        })
    })
}

const renderPage = () => {
    fetch(API).then(resp => resp.json())
    .then(ramenObjects => {
        ramenObjects.forEach(ramenObject => {
            addingRamenIMG(ramenObject)
        })
        displayRamen(ramenObjects[0])
    })
}

const deleteRamenButton = () => {
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "delete"
    deleteButton.addEventListener("click", event => {
        const ramenId = document.querySelector("img.detail-image").value
        fetch(API + "/" + ramenId, {method:"delete"})
        .then(() => {
            document.getElementById("IMG "+ ramenId).remove()
            fetch(API).then(res => res.json())
            .then(ramenObjects => displayRamen(ramenObjects[0]))
        })
        
    })
    document.getElementById("ramen-detail").append(deleteButton)
}

renderPage()
addRamenForm()
deleteRamenButton()


//done 6:14 finished in 76 minutes