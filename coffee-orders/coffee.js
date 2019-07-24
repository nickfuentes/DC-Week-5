let ordersListDiv = document.getElementById("ordersListDiv")

let newOrderButton = document.getElementById("newOrderButton")
let searchOrderButton = document.getElementById("searchOrderButton")
let deleteOrderButton = document.getElementById("deleteOrderButton")

let emailInputTextBox = document.getElementById("emailInputTextBox")
let orderInputTextBox = document.getElementById("orderInputTextBox")
let searchEmailInputTextBox = document.getElementById("searchEmailInputTextBox")
let deleteEmailInputTextBox = document.getElementById("deleteEmailInputTextBox")


// Displays all the coffee orders onto the page
function grabAllCoffeeOrders(getThemOrders) {

    let allCoffeOrders = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/"

    fetch(allCoffeOrders)
        .then(response => {
            return response.json() // response.json() returns a promise 
        }).then(json => {
            return Object.values(json)
        }).then((orders) => {
            getThemOrders(orders)
        })
}
grabAllCoffeeOrders(getThemOrders)


// pulls all orders out from grab CoffeeOrders function
function getThemOrders(orders) {
    displayAllOrders(orders)
}


// displays all coffe orders
function displayAllOrders(orders) {
    let allOrders = orders.map(order => {
        return `<div class="orders">
        <p>Email: ${order.emailAddress}</p>
        <p>Coffee: ${order.coffee}</p>
        </div>`
    })
    ordersListDiv.innerHTML = allOrders.join("")
}


newOrderButton.addEventListener("click", postOrder)


// post a new order to the api
function postOrder() {

    let emailTextCreateOrder = emailInputTextBox.value
    let orderTextCreateOrder = orderInputTextBox.value

    fetch("http://dc-coffeerun.herokuapp.com/api/coffeeorders/", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailAddress: emailTextCreateOrder, coffee: orderTextCreateOrder })
    })
}


searchOrderButton.addEventListener("click", getOrderByEmail)


// gets order by email
function getOrderByEmail() {

    let searchEmailText = searchEmailInputTextBox.value

    let coffeOrder = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${searchEmailText}`

    fetch(coffeOrder)
        .then(response => {
            return response.json() // response.json() returns a promise 
        }).then(order => {
            let selectedOrder =
                `<div class="orders">
                       <p>Email: ${order.emailAddress}</p>
                       <p>Coffee: ${order.coffee}</p>
                     </div>`

            ordersListDiv.innerHTML = selectedOrder
        })

}


deleteOrderButton.addEventListener("click", deleteOrder)


function deleteOrder() {

    let deleteEmailText = deleteEmailInputTextBox.value

    fetch(`http://dc-coffeerun.herokuapp.com/api/coffeeorders/${deleteEmailText}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })

}