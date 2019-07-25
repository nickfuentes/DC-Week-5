let usersDiv = document.getElementById("usersDiv")

let createNameTextBox = document.getElementById("createNameTextBox")
let createAgeTextBox = document.getElementById("createAgeTextBox")

let createUserButton = document.getElementById("createUserButton")

// gets all the users from the database
function getTheUsersFromDatabase(callback) {

    let usersRef = database.ref("users")

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
                    <p>${user.name}</p>
                    <p>${user.age}</p>
                </div>`
    })
    usersDiv.innerHTML = listOfUsers.join("")
}

// add listner event on create user name and user age button
createUserButton.addEventListener("click", function () {

    let userName = createNameTextBox.value
    let userAge = createAgeTextBox.value

})

function saveUserToDatabase() {

}
