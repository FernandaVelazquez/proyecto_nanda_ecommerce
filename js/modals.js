const containerModal = document.querySelector('.container-modal')
const openCart = document.getElementById('btn-cart')
const closeCart = document.getElementById('btn-close-cart')
const cartModal = document.querySelector('.cart-modal')
const emptyCartBtn = document.getElementById('empty-cart')
const buyCartBtn = document.getElementById('buy-cart')


openCart.addEventListener('click', () => {
    if (cart && cart.length <= 0) {
        emptyCartBtn.classList.add('disabled')
        buyCartBtn.classList.add('disabled')
    }
    containerModal.classList.toggle('modal-active')
})

closeCart.addEventListener('click', () => {
    containerModal.classList.toggle('modal-active')
})

containerModal.addEventListener('click', () => {
    closeCart.click()
})

cartModal.addEventListener('click', (e) => {
    e.stopPropagation()
    if (cart && cart.length <= 0) {
        emptyCartBtn.classList.add('disabled')
        buyCartBtn.classList.add('disabled')
    }
    if (e.target.classList.contains('btn-delete')) {
        deleteProductCart(e.target.value)
    }

})

emptyCartBtn.addEventListener('click', () => {
    emptyCart(cart)
})

buyCartBtn.addEventListener('click', () => {
    buyCart(cart)
})

