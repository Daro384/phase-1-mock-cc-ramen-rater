// write your code here
const ramen1 = {
    id: 1,
    name: "Shoyu Ramen",
    restaurant: "Nonono",
    image: "./assets/ramen/shoyu.jpg",
    rating: 7,
    comment: "Delish. Can't go wrong with a classic!"
  }
const addRamen = ramenObject => {
    const ramenIMG = document.createElement("img")
    ramenIMG.src = ramenObject.image
    
    document.getElementById("ramen-menu").append(ramenIMG)
    ramenIMG.addEventListener("click", (event) => {

        const mainIMG = document.querySelector("#ramen-detail img")
        mainIMG.src = ramenObject.image
        mainIMG.alt = ramenObject.name

        const ramenName = document.querySelector("h2.name")
        ramenName.textContent = ramenObject.name

        const ramenResturant = document.querySelector("h3.restaurant")
        ramenResturant.textContent = ramenObject.restaurant

        const ramenRating = document.getElementById("rating-display")
        ramenRating.textContent = ramenObject.rating

        const ramenComment = document.getElementById("comment-display")
        ramenComment.textContent = ramenObject.comment
    })
}

const ramenForm = document.getElementById("new-ramen")
ramenForm.addEventListener("submit", event => {
    event.preventDefault()

    const newRamenObject = {}
    newRamenObject["name"] = document.getElementById("new-name").value
    newRamenObject["resturant"] = document.getElementById("new-restaurant").value
    newRamenObject["image"] = document.getElementById("new-image").value
    newRamenObject["rating"] = document.getElementById("new-rating").value
    newRamenObject["comment"] = document.getElementById("new-comment").value
    newRamenObject.id = document.querySelectorAll("div#ramen-menu > img").lenght

    addRamen(newRamenObject)
    
})

const renderPage = () => {
    fetch("http://localhost:3000/ramens")
    .then(resp => resp.json())
    .then(objectArray => {
        objectArray.forEach(object => {
            addRamen(object)
        })
    })
}

renderPage()