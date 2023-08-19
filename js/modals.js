const containerModal = document.querySelector('.container-modal')
const containerModalBuy = document.querySelector('.container-modal-buy')
const openCart = document.getElementById('btn-cart')
const closeCart = document.getElementById('btn-close-cart')
const cartModal = document.querySelector('.cart-modal')
const emptyCartBtn = document.getElementById('empty-cart')
const buyCartBtn = document.querySelector('.btn-buy')
const btnCancel = document.getElementById('btn-cancel')


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
    if (cart && cart.length <= 0) {
        emptyCartBtn.classList.add('disabled')
        buyCartBtn.classList.add('disabled')
    }
    if (e.target.classList.contains('btn-delete')) {
        deleteProductCart(e.target.value)
    }
    if (e.target.classList.contains('btn-empty')) {
        emptyCart(cart)
    }
    if (e.target.classList.contains('btn-buy')) {
        buyCart()
    }
})

buyCartBtn.addEventListener('click', () => {
    containerModalBuy.classList.toggle('modal-active')
})

btnCancel.addEventListener('click', (e) => {
    containerModalBuy.classList.toggle('modal-active')
})

