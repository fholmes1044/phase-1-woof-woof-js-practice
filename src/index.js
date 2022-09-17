document.addEventListener('DOMContentLoaded', () => loadDogs())


let bar = document.getElementById("dog-bar")
    console.log("bar", bar)

let array 

let loadDogs = () => {
    fetch("http://localhost:3000/pups")
     .then((resp)=> resp.json())
     .then((data) =>{
       
        array = data
            data.forEach(element => {
            let span = document.createElement("span")
            span.classList = "spans"
            span.innerHTML = element.name
            span.addEventListener('click', dogInfo)
            bar.appendChild(span)
        });
  
     })
     
}


let grabDiv = document.getElementById("dog-info")
let dogImage = document.createElement("img")
let h2 = document.createElement("h2")
let button = document.createElement("button")

let dogInfo = (dog) =>{
    
dog = dog.target.innerHTML
array.map(element => {
    let { name, isGoodDog, image} = element
    if(name == dog){
    h2.innerHTML = name
    grabDiv.appendChild(h2)
    dogImage.src = image
    grabDiv.appendChild(dogImage)
    if(isGoodDog == true){
        button.innerHTML = "Good Dog!"
    }
    else{
        button.innerHTML = "Bad Dog!"
    }
    button.id = "gb"
    button.addEventListener('click', statusl)
    grabDiv.appendChild(button)

}

   
})


}

function statusl (event){
let isGoodDog
event.preventDefault()
let text = event.target.innerHTML
let dogname = event.target.previousElementSibling.previousElementSibling.innerHTML
console.log("text", text)
if(text == "Good Dog!"){
    button.innerHTML = "Bad Dog"
    isGoodDog = false
}
else{
    button.innerHTML = "Good Dog!"
    isGoodDog = true
}

array.map(dog => {
    if(dog.name == dogname){
      
    let { id} = dog
    fetch(`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify({
      isGoodDog: isGoodDog
    })
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  
   }
   
})


}



