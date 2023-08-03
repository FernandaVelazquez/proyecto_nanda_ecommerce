let cart = []

const containerProducts = document.getElementById('container-products')

containerProducts.addEventListener('click', (e) => {
    if (e.target.classList.contains('add')) {
        validateCartProduct(e.target.id)
    }

})

const validateCartProduct = (id) => {
    const isRepeated = cart.some(product => product.id == id)

    if (!isRepeated) {
        const product = products.find(product => product.id == id)
        cart.push(product)
        showProductsCart(product)
        updateTotalsCart(cart)

    } else {
        const product = cart.find(product => product.id == id)
        const quantity = document.getElementById(`quantity-${product.id}`)
        product.quantity++
        quantity.innerText = `Cantidad: ${product.quantity}`
        updateTotalsCart(cart)
    }
}

const showProductsCart = (product) => {
    const container = document.getElementById('container-cart')
    const div = document.createElement('div')
    div.classList.add('productInCart')
    div.innerHTML = `
        <p>Item: ${product.name}</p>
        <p>Precio: ${product.price}</p>
        <p id="quantity-${product.id}">Cantidad: ${product.quantity}</p>
        <button class="btn wabes-effect waves-light btn-delete" value="${product.id}">x</button>
        `
    container.appendChild(div)
}

const showCart = (cart) => {
    const container = document.getElementById('container-cart')
    container.innerHTML = ''
    cart.forEach(product => {
        const div = document.createElement('div')
        div.classList.add('productInCart')
        div.innerHTML = `
            <p>Item: ${product.name}</p>
            <p>Precio: ${product.price}</p>
            <p id="quantity-${product.id}">Cantidad: ${product.quantity}</p>
            <button class="btn wabes-effect waves-light btn-delete" value="${product.id}">x</button>
            `
        container.appendChild(div)
    });
}

const deleteProductCart = (id) => {
    const productIndex = cart.findIndex(product => product.id == id)
    cart.splice(productIndex, 1)
    showCart(cart)
    updateTotalsCart(cart)
}

const updateTotalsCart = (cart) => {
    const totalQuantity = cart.reduce((acc, item) => (acc + item.quantity), 0)
    const totalPurchase = cart.reduce((acc, item) => acc + (item.quantity * item.price), 0)
    showTotalsCart (totalPurchase, totalQuantity)
    saveCartStorage(cart)
}

const showTotalsCart = (totalPurchase, totalQuantity) => {
    const counterCart = document.getElementById('counter-cart')
    const totalPrice = document.getElementById('total-price')

    counterCart.innerText = totalQuantity
    totalPrice.innerText = totalPurchase
}

const saveCartStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

const obtainCartStorage = () => {
    const CartStorage = JSON.parse(localStorage.getItem('cart'))
    return CartStorage
}

const loadCart = () => {
    if (localStorage.getItem('cart')) {
        cart = obtainCartStorage ()
        showCart(cart)
        updateTotalsCart(cart)
    }

} 

