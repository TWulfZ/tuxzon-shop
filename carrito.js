const productosEnCarrito = JSON.parse(localStorage.productosEnCarritoJS);

const contenedorCarritoVacio = document.querySelector('#carrito-vacio');
const contenedorCarritoProductos = document.querySelector('#carrito-productos');
const contenedorCarritoAcciones = document.querySelector('#carrito-acciones');
const contenedorCarritoComprado = document.querySelector('#carrito-comprado');
let botonesEliminar = document.querySelector('.carrito-producto-eliminar');
const botonVaciar = document.querySelector('.carrito-acciones-vaciar');
const contenedorTotal = document.querySelector('.total');

function cargarProductosEnCarrito() {
    if(localStorage.getItem('productosEnCarritoJS') != null && productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add('disabled');
        contenedorCarritoProductos.classList.remove('disabled');
        contenedorCarritoAcciones.classList.remove('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    
        const div = document.createElement('div');
    
        let html = '';
    
        productosEnCarrito.forEach(producto => {
            html += `
            <div class="carrito-producto">
                <img class="carrito-producto-imagen" src="${producto.img}" alt="">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.title}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</>
                </div>
                <button class="carrito-producto-eliminar" onclick="eliminar('${producto.id}')"> <i class="bi bi-trash3-fill"></i></button>
            </div>
            `;
        });
    
        document.querySelector("#carrito-productos").innerHTML = html;
    
    } else {
        contenedorCarritoVacio.classList.remove('disabled');
        contenedorCarritoProductos.classList.add('disabled');
        contenedorCarritoAcciones.classList.add('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    }

    actualizarTotal();
}

function eliminar(id) {
    /*----------------------------------------------------------------*/
    const index = productosEnCarrito.findIndex(producto => producto.id === id);
    productosEnCarrito.splice(index, 1);
    cargarProductosEnCarrito();

    /*if(productosEnCarrito.some(producto => producto.id === id)) 
    {
        const index = productosEnCarrito.findIndex(producto => producto.id === id);
        productosEnCarrito[index].cantidad++;
    } else 
    {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    console.log(productosEnCarrito);
*/
    

    localStorage.productosEnCarritoJS = JSON.stringify(productosEnCarrito);
    cargarProductosEnCarrito();
}

/*----------------------------------------------------------------*/



function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.productosEnCarritoJS = JSON.stringify(productosEnCarrito);
    cargarProductosEnCarrito();
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerHTML = `$${totalCalculado}`;
}

cargarProductosEnCarrito();
