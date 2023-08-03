const containerModal = document.querySelector('.container-modal')
const openCart = document.getElementById('btn-cart')
const closeCart = document.getElementById('btn-close-cart')
const cartModal = document.querySelector('.cart-modal')

openCart.addEventListener('click', () => {
    containerModal.classList.toggle('modal-active')
})

closeCart.addEventListener('click', () => {
    containerModal.classList.toggle('modal-active')
})

containerModal.addEventListener('click',() => {
    closeCart.click()
})

cartModal.addEventListener('click', (e)=> {
    e.stopPropagation()
     if (e.target.classList.contains('btn-delete')) {
        deleteProductCart (e.target.value)
    }
       
})