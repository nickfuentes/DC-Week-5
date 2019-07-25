let usersDiv = document.getElementById("usersDiv")

let createNameTextBox = document.getElementById("createNameTextBox")
let createAgeTextBox = document.getElementById("createAgeTextBox")

let createUserButton = document.getElementById("createUserButton")

let usersRef = database.ref("users")

// gets all the users from the database
function getTheUsersFromDatabase(callback) {

    usersRef.on('value', (snapshot) => {

        let users = []

        for (key in snapshot.val()) {
            let user = snapshot.val()[key]
            user.key = key
            users.push(user)
        }

        callback(users)
    })
}

// passing the function displayAllTheUsers to have access to all the users
getTheUsersFromDatabase(displayAllTheUsers)

// displays all the users to the DOM
function displayAllTheUsers(users) {

    let listOfUsers = users.map(user => {
        return `<div class="userDiv">
                    <p>Name: ${user.name}</p>
                    <p>Age: ${user.age}</p>
                    <button onclick="deleteUser('${user.key}')">Delete</button>
                </div>`
    })
    usersDiv.innerHTML = listOfUsers.join("")
}

// add listner event on create user name and user age button
createUserButton.addEventListener("click", function () {

    let userName = createNameTextBox.value
    let userAge = createAgeTextBox.value

    saveUserToDatabase(userName, userAge)

})

// saves the user name and user age to the database and creates and unique id
function saveUserToDatabase(userName, userAge) {

    usersRef.push({
        name: userName,
        age: userAge
    })

}

// function that deletes the user based of the user key
function deleteUser(key) {
    usersRef.child(key).remove()
}
