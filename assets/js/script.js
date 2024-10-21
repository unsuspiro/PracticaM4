const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
    '.container-cart-products'
);

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

/* carrito*/
let carrito = [];

function Agregaralcarro(name, price) {
    let myproduct = {
        name, price
    };
    carrito.push(myproduct);
    obtenerLargoCarrito();
    calcularTotalCarrito();
    renderizarCarrito(); 
}

//obtener el número de productos

function obtenerLargoCarrito() {
    document.getElementById("contador-productos").innerHTML = carrito.length;
}

//calcular el total del carrito

function calcularTotalCarrito() {
    let total = carrito.reduce((total, product) => {
        return total + product.price;
    }, 0);
    document.querySelector(".total-pagar").innerHTML = Number(total).toLocaleString("es-cl");
    document.querySelector(".cart-total-hidden").style.display = "flex";
}

//renderizar el carrito en el DOM

function renderizarCarrito() {
    const containerProducts = document.querySelector('.lista-productos-carrito');
    containerProducts.innerHTML = ''; 

    carrito.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('producto-carrito');
        productElement.innerHTML = `
            <span>${product.name}</span>
            <span>$${product.price.toLocaleString("es-cl")}</span>
            <button class="eliminar-producto" data-index="${index}">X</button>
        `;
        containerProducts.appendChild(productElement);
    });

    // Agregar eventos a los botones de eliminar
    const btnEliminar = document.querySelectorAll('.eliminar-producto');
    btnEliminar.forEach(btn => {
        btn.addEventListener('click', eliminarProducto);
    });
}

// Función para eliminar producto del carrito

function eliminarProducto(e) {
    const index = e.target.dataset.index;
    carrito.splice(index, 1); 
    obtenerLargoCarrito();
    calcularTotalCarrito();
    renderizarCarrito(); 
}
