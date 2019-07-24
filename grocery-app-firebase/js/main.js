let groceryListTextBox = document.getElementById("groceryListTextBox")

let groceryListsDiv = document.getElementById("groceryListsDiv")

let createGroceryListButton = document.getElementById("createGroceryListButton")

let groceriesRef = database.ref("categories")

groceriesRef.on('value', (snapshot) => {

    let groceryLists = []

    console.log("VALUE CHANGED EVENT OCCURED")
    for (key in snapshot.val()) {
        let groceryList = snapshot.val()[key]
        groceryList.key = key
        groceryLists.push(groceryList)

    }

    displayGrocerysLists(groceryLists)
})

// displays GroceryLists from firebase
function displayGrocerysLists(groceryLists) {
    let groceryDetails = groceryLists.map(groceryList => {
        return `
        <div class="groceryList">
        ${groceryList.storeName} - ${groceryList.storeAddress}
        <button onclick='deleteUser("${groceryList.key}")'>
        Delete
        </button>
        </div>
        `
    })

    groceryListsDiv.innerHTML = groceryDetails.join('')
}

addUserButton.addEventListener('click', () => {

    let name = nameTextBox.value
    let age = parseInt(ageTextBox.value)
    saveUser(name, age)
})
