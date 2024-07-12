// Select all elements needed from HTML
const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

// Add a submit event on the form and when triggered execute 'extractFruit'
fruitForm.addEventListener("submit", extractFruit)

function extractFruit(e) {
  e.preventDefault()
  // With the value from the form, call the 'fetchFruitData' function with the fruit name
  fetchFruitData(e.target.fruitInput.value)
  e.target.fruitInput.value = ""
}

async function fetchFruitData(fruit) {
  try {
    // Fetch Fruit JSON Data
    const response = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
    // Fetch Fruit Image from seperate API
    // This won't work without an API KEY
    const imageResponse = await fetch(`https://pixabay.com/api/?q=${fruit}+fruit&key=<my-key>`)

    // If both fetch requesnts resolve
    if (response.ok && imageResponse.ok){
      // Convert both pieces of data from JSON to Javascript
      const data = await response.json()
      const imageData = await imageResponse.json()
      // Pass in data from fruit-api 
      addFruitNutrition(data)
      // Pass in imageURL and also Fruit Name
      addImage(imageData["hits"][0]["previewURL"], data.name)
    } else {
      throw "Error: http status code = " + response.status
    }
  } catch (err) {
    console.log(err)
  }
}

// Define calories variable and empty fruitCalories ovject
let calories = 0
const fruitCalories = {}

function addFruitNutrition(fruit) {
  // Define a key on fruitCalories object with value
  fruitCalories[fruit.name] = fruit["nutritions"]["calories"]
  // Add to the calories variable with value on data object
  calories += fruit["nutritions"]["calories"]
  // Display information
  fruitNutrition.textContent = calories
}

function addImage(imageLink, fruitName){
  // Create image element
  const img = document.createElement("img")
  // Add source attribute with value of imageURL
  img.src = imageLink
  // Add alt attribute as image name
  img.alt = fruitName
  // Add event listener to remove image
  // once: true removes the event listener from application memory after clicked
  img.addEventListener("click", removeImage, { once: true })
  fruitList.appendChild(img)
}

function removeImage(e) {
  // When removed the 'alt' value is stored into 'fruitName' variable
  const fruitName = e.target.alt
  // Access the fruitCalories object under the key of fruitName
  // Subtract that value from the calories variable
  calories -= fruitCalories[fruitName]
  // Updated the HTML element with new calorie information
  fruitNutrition.textContent = calories
  // Delete the key in the object
  delete fruitCalories[fruitName]
  // Remove the DOM element that triggered the event, the image
  e.target.remove()
}