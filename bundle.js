(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

fruitForm.addEventListener("submit", extractFruit)

function extractFruit(e) {
  e.preventDefault()
  fetchFruitData(e.target[0].value)
  e.target[0].value = ""
}

async function fetchFruitData(fruit) {
  try {
    const response = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
    const imageResponse = await fetch(`https://pixabay.com/api/?q=${fruit}+fruit&key=35290745-f05685bdfcd0a1a9b3d3833b0`)
    if (response.ok && imageResponse.ok) {
      const data = await response.json()
      const imageData = await imageResponse.json()
      addFruit(data)
      addImage(imageData.hits[0].previewURL, data.name)
    } else {
      throw "Error: http status code = " + response.status
    }
  } catch (err) {
    console.log(err)
  }
}

let calories = 0
const fruitCalories = {}

function addFruit(fruit) {
  // Define a key on fruitCalories object with the value of calories
  fruitCalories[fruit.name] = fruit["nutritions"]["calories"]  
  calories += fruit["nutritions"]["calories"]
  // Display information
  fruitNutrition.textContent = calories
}

function addImage(imageLink, fruitName) {
    const img = document.createElement("img")
    img.src = imageLink
    img.alt = fruitName
    img.addEventListener("click", removeImage)
    fruitList.appendChild(img)
}

function removeImage(e) {
    const fruitName = e.target.alt
    calories -= fruitCalories[fruitName]
    fruitNutrition.textContent = calories
    delete fruitCalories[fruitName]
    e.target.remove()
}
},{}]},{},[1]);
