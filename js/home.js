let products = []

fetch("./js/stock.json")
  .then(response => response.json())
  .then(data => {
    products = data
    showProducts(products)
  })

const container = document.getElementById('container-products')
const btnCategory = document.querySelectorAll('.btn-category')

const showProducts = (productsSelected) => {
  container.innerHTML = ''
  productsSelected.forEach(product => {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML += `<div class="card-image">
        <img src=${product.image}>
        <span class="card-title">${product.name}     
       </div>
      <div class="card-content">
        <p class="desc">${product.description}</p>
          <p class="price">$${product.price}</p>
          <button type="button" class="btn btn-add"><span id=${product.id} class="add">COMPRAR
        </span></button></span>
      </div>`
    container.appendChild(div)
  });
}

btnCategory.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // console.log(e.target.id)
    if (e.target.id != 'todos') {
      const productsSelected = products.filter(product => product.category == e.target.id)
      showProducts(productsSelected)
    }else{
      showProducts(products)
    }

  })
})