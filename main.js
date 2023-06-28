const contenedorProductos = document.querySelector(".contenedor-productos");
const numerito = document.querySelector("#numerito");


function cargarProductos() {
    let html = '';

    arrayProductos.forEach(producto => {
        html += `
        <div class="producto">
            <img class="producto-imagen" src="${producto.img}" alt="" />
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.title}</h3>
                <p class="producto-titulo">$${producto.precio}</p>
                <button class="producto-agregar" onclick="agregar('${producto.id}')">Agregar</button>
            </div>
        </div>
        `;
    });

    document.querySelector(".contenedor-productos").innerHTML = html;

}


if (localStorage.getItem('numeroCarrito') == null) {
    localStorage.numeroCarrito = 0;
    let num = 0;
}
let num = parseInt(localStorage.numeroCarrito);
let productosEnCarrito = [];

if (localStorage.productosEnCarritoJS) {
    productosEnCarrito = JSON.parse(localStorage.productosEnCarritoJS);
}

function agregar(id) {
    num = num + 1;
    

    const productoAgregado = arrayProductos.find(producto => producto.id === id);

    if(productosEnCarrito.some(producto => producto.id === id)) 
    {
        const index = productosEnCarrito.findIndex(producto => producto.id === id);
        productosEnCarrito[index].cantidad++;
    } else 
    {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    console.log(productosEnCarrito);

    actualizarNumerito();

    localStorage.productosEnCarritoJS = JSON.stringify(productosEnCarrito);
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

cargarProductos();
actualizarNumerito();

//localStorage.productos = JSON.stringify(arrayProductos)

