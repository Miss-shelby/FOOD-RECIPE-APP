
function dark() {
    let night = document.body;night.classList.toggle("dark-mode")
}
dark()

let ourForm = document.getElementById("our-form")
let searchResult= document.getElementById("search-data")
let container = document.getElementById("our-container")
let ourInputField= document.getElementById("input-data")
let searchQuery="";
const APP_ID ='12928270'
const APP_KEY ='45782b93a2f419e6f66782b965f2d584'

ourForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    searchQuery=ourInputField.value
    fetchApi()
})
 async function fetchApi() {
    const baseURL =` https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=30`
    const response = await fetch(baseURL)
    const data = await response.json()
    console.log(data)

    let fetchedRecipe="";
    data.hits.forEach(item => {
        fetchedRecipe +=
        `
        <div class="items">
            <img src="${item.recipe.image}">
            <div class="flex">
                <h3 class="title">${item.recipe.label}</h3>
                <a href="${item.recipe.url}" target= "_blank">View Recipe</a>
            </div>
            <p>calories:${item.recipe.calories.toFixed(2)}</p>
            <p>Diet-Labels:${item.recipe.dietLabels.length > 0 ? item.recipe.dietLabels.length : "None"}</p>
            <p>Dish-Type:${item.recipe.dishType}</p>
        </div>
        `
    });
    searchResult.innerHTML= fetchedRecipe
    ourInputField.value=""
    ourInputField.focus()
}
