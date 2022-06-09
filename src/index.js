let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getAllToys() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toyData => toyData.forEach(toyObj=> renderAToy(toyObj)));
}
getAllToys();

function renderAToy(toyObj){
  let card = document.createElement("li")
  card.className = "card"
  card.innerHTML = `
    <h2>${toyObj.name}</h2>
    <img src="${toyObj.image}" class="toy-avatar" />
    <p>${toyObj.likes} Likes</p>
    <button class="like-btn" id="${toyObj.id}">Like ❤️</button>
  `
  let cardCollector = document.querySelector("#toy-collection")
  cardCollector.append(card)
  card.querySelector(".like-btn").addEventListener('click', () => {
    toyObj.likes ++
    card.querySelector('p').textContent = `${toyObj.likes} Likes`
    updateLikes(toyObj)
  })
}

document.querySelector(".add-toy-form").addEventListener("submit", handleSubmit)

function handleSubmit(e){
  e.preventDefault()
  let toyObj = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes:0
  }
  renderAToy(toyObj)
  addNewToys(toyObj)
}


function addNewToys(toyObj){
  // console.log(JSON.stringify(toyObj))
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}

function updateLikes(toyObj){
  // console.log(JSON.stringify(toyObj))
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: 'PATCH',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}