const showProducts = (products) =>{
    const container = document.getElementById('container-products')
    
    products.forEach(product => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML += `<div class="card-image">
        <img src=${product.image}>
        <span class="card-title">${product.name}</span>
        <a class="btn-floating halfway-fab wabes-effect waves-light"><i id=${product.id} class= "fa-solid fa-cart-plus fa-2xs add"></i></a>
      
      </div>
      <div class="card-content">
        <p class="desc">${product.description}</p>
          <p class="price">$${product.price}</p>
      </div>`
      container.appendChild(div)
        
    });
}       