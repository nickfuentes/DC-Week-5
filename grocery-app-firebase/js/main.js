let groceryListNameTextBox = document.getElementById("groceryListNameTextBox")
let groceryListAddressTextBox = document.getElementById("groceryListAddressTextBox")

let createGroceryListButton = document.getElementById("createGroceryListButton")

let groceryListsDiv = document.getElementById("groceryListsDiv")


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

createGroceryListButton.addEventListener('click', () => {

    let storeName = groceryListNameTextBox.value
    let storeAddress = groceryListAddressTextBox.value
    saveUser(name, age)
})
