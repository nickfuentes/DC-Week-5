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
        <div class="groceryLists">
        <div class="groceryList">
        ${groceryList.storeName} - ${groceryList.storeAddress}
            <button onclick='deleteGroceryList("${groceryList.key}")'>
            Delete
            </button>
            </di>
            <div>
            <h4>Grocery Items</h4>
            </div>
            <div class="addGroceryItemDiv">
            <span>Enter Item:</span>
            <input type="text">
            <button type="button">Create</button>
            </div>
        </div>
        `
    })

    groceryListsDiv.innerHTML = groceryDetails.join('')
}


// addlistner on create button for store name and store address
createGroceryListButton.addEventListener('click', () => {

    let storeName = groceryListNameTextBox.value
    console.log(storeName)
    let storeAddress = groceryListAddressTextBox.value
    console.log(storeAddress)
    saveGroceryList(storeName, storeAddress)
})

// saves the groceryList to the database
function saveGroceryList(storeName, storeAddress) {
    groceriesRef.push({ // use push to create a random id for the node
        storeName: storeName,
        storeAddress: storeAddress
    })

}

// deletes the grocerylist
function deleteGroceryList(key) {
    groceriesRef.child(key).remove()
}


