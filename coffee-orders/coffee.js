let ordersListDiv = document.getElementById("ordersListDiv")


function getAllCoffeeOders() {

    let allCoffeOrders = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/"

    fetch(allCoffeOrders)
        .then(response => {
            return response.json() // response.json() returns a promise 
        }).then(json => {
            return json
        }).then((orders) => {
            return Object.values(orders)
        }).then((orders) => {
            let allOrders = orders.map(order => {
                return `<div class="orders">
                <p>Email: ${order.emailAddress}</p>
                <p>Coffee: ${order.coffee}</p>
                </div>`
            })
            ordersListDiv.innerHTML = allOrders.join('')
        })
}

getAllCoffeeOders()

