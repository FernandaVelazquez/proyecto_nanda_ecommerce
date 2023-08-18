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
        Toastify({
            text: "El producto fue agregado a tu carrito!",
            duration: 3000,
            style: {
                background: ' rgb(4, 120, 48)',
            },
            gravity: 'bottom',
        }).showToast();
        emptyCartBtn.classList.remove('disabled')
        buyCartBtn.classList.remove('disabled')

    } else {
        const product = cart.find(product => product.id == id)
        const quantity = document.getElementById(`quantity-${product.id}`)
        product.quantity++
        quantity.innerText = `Cantidad: ${product.quantity}`
        updateTotalsCart(cart)
        Toastify({
            text: "El producto fue agregado a tu carrito!",
            duration: 3000,
            style: {
                background: ' rgb(4, 120, 48)',
            },
            gravity: 'bottom',
        }).showToast();
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
        <button class="btn wabes-effect waves-light btn-delete" value="${product.id}"><i class="bi bi-trash3-fill "></i></button>
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
            <button class="btn wabes-effect waves-light btn-delete" value="${product.id}"><i class="bi bi-trash3-fill"></i></button>
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
    showTotalsCart(totalPurchase, totalQuantity)
    saveCartStorage(cart)
}

const showTotalsCart = (totalPurchase, totalQuantity) => {
    const totalPrice = document.getElementById('total-price')
    const counterCart = document.getElementById('counter-cart')
    totalPrice.innerText = totalPurchase
    counterCart.innerText = totalQuantity

}

const emptyCart = () => {
    Swal.fire({
        title: '¿Querés vaciar tu carrito?',
        text: 'Todos tus productos seleccionados serán eliminados',
        showCancelButton: true,
        confirmButtonText: 'ELIMINAR',
        confirmButtonColor: 'rgb(176, 162, 6)',
        cancelButtonText: 'CANCELAR',
    }).then((result) => {
        if (result.isConfirmed) {
            cart.length = 0;
            localStorage.setItem('cart', JSON.stringify(cart))
            showCart(cart)
            updateTotalsCart(cart)
            Toastify({
                text: "Tu carrito fue vaciado!",
                duration: 3000,
                style: {
                    background: ' rgb(4, 120, 48)',
                },
                gravity: 'bottom',
            }).showToast();
            emptyCartBtn.classList.add('disabled')
            buyCartBtn.classList.add('disabled')
        }
    })
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
        cart = obtainCartStorage()
        showCart(cart)
        updateTotalsCart(cart)
    }
}
const btn = document.getElementById('button');

const buyCart = () => {
    Swal.fire({
        text: 'Ingresa tu correo electrónico, por favor.',
        input: 'email',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: 'rgb(176, 162, 6)',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            let timerInterval
            Swal.fire({
                title: 'Estamos preparando todo!',
                timer: 2500,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                Swal.fire({
                    title: `Ha sido un éxito.
                    ¡Muchas gracias por tu compra!`,
                    text: 'Te enviaremos un correo con todos los datos para que puedas abonar tu compra y coordinar la entrega.',
                    confirmButtonColor: 'rgb(176, 162, 6)',
                }).then((result) => {
                    if (result.isConfirmed) {
                        cart.length = 0;
                        localStorage.setItem('cart', JSON.stringify(cart))
                        showCart(cart)
                        updateTotalsCart(cart)
                        emptyCartBtn.classList.add('disabled')
                        buyCartBtn.classList.add('disabled')
                    }
                })
            })
        }
    })
}