
let bar = document.getElementById("dog-bar")
    console.log("bar", bar)

let array 

let loadDogs = () => {
    fetch("http://localhost:3000/pups")
     .then((resp)=> resp.json())
     .then((data) =>{
        console.log("data", data)
        array = data
            data.forEach(element => {
            let span = document.createElement("span")
            span.classList = "spans"
            span.innerHTML = element.name
            span.addEventListener('click', dogInfo)
            bar.appendChild(span)
            //array.push(span)
        });
  
     })
     
}


let grabDiv = document.getElementById("dog-info")
let dogImage = document.createElement("img")
let h2 = document.createElement("h2")
let button = document.createElement("button")

let dogInfo = (dog) =>{
    
console.log("dog", dog.target.innerHTML)
dog = dog.target.innerHTML
let map =  array.map(element => {
    let { name, isGoodDog, image, id} = element
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
//console.log(event.target.innerHTML)
event.preventDefault()
let text = event.target.innerHTML
let dogname = event.target.previousElementSibling.previousElementSibling.innerHTML
console.log("text", text)
if(text == "Good Dog!"){
    button.innerHTML = "Bad Dog"
}
else{
    button.innerHTML = "Good Dog!"
}
//debugger
let mapValue = array.map(dog => {
//debugger
   if(dog.name == dogname){
    let { name, isGoodDog, image, id} = dog
    fetch(`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
      id: text,
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  
   }
})


}

document.addEventListener('DOMContentLoaded', () => loadDogs())

// When a user clicks the Good Dog/Bad Dog button, two things should happen:

// The button's text should change from Good to Bad or Bad to Good
// The corresponding pup object in the database should be updated to reflect the new isGoodDog value
// You can update a dog by making a PATCH request to /pups/:id and including the updated isGoodDog status in the body of the request.




// When a user clicks on a pup's span in the div#dog-bar, that pup's info 
// (image, name, and isGoodDog status) should show up in the div with the id of "dog-info".
//  Display the pup's info in the div with the following elements:

// an img tag with the pup's image url
// an h2 with the pup's name
// a button that says "Good Dog!" or "Bad Dog!" based on whether isGoodDog is true or false.


