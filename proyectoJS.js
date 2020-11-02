let baseDeDatos =[];
document.addEventListener('DOMContentLoaded', cargaInicial);

function cargaInicial() {
    $.ajax({
        url: 'db.json',
        success: function (data) {
            console.log(data)
            baseDeDatos = data;
            renderProductos();
            renderCarrito();
        },
        error: function (error, jqXHR, status) {
            console.log(error);
        }
    }
    )
}

$(document).ready(function(){
    $('.titulo').animate({opacity:"1"},3000);
})





let productoTienda = document.querySelector('#record')
let carrito = localStorage.carrito ? JSON.parse(localStorage.carrito) : [];
let $contenedorCarrito = document.querySelector('#compras')


function renderProductos() {
    baseDeDatos.forEach(function (producto) {
        var miNodo = document.createElement('div')
        miNodo.classList.add('col-4', 'mb-4')
        miNodo.innerHTML = `

        <div class="store-post">
        <a class="store-post__link" href=""></a>
        <figure class="store-post__img">
          <img src="${producto.imagen}" alt="">
        </figure>
        <div class="nombreProducto">${producto.nombre}</div>
        <div class="descripcionProducto">${producto.descripcion}</div>
        <div class="precioProducto">$${producto.precio}</div>
        <button class="store-post__btn" onclick="agregarAlCarrito(${baseDeDatos.indexOf(producto)})"><span class="fas fa-shopping-cart"></span></button>
      </div>

      `
        productoTienda.appendChild(miNodo)
    })

}
renderProductos();

function agregarAlCarrito(index) {
    var producto = baseDeDatos[index];
    if (carrito.length > 0) {
        var noExiste = true;
        for (var i = 0; i < carrito.length; i++) {
            if (producto.nombre === carrito[i].nombre) {
                carrito[i].cantidad++;
                noExiste = false;
            }
        }
        if (noExiste) {
            producto.cantidad = 1;
            carrito.push(producto);
        }
    }
    else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    alerta()
    renderCarrito()
    sumadorDePrecios()
    localStorage.carrito = JSON.stringify(carrito);
}



function renderCarrito() {
    localStorage.carrito = JSON.stringify(carrito)
    $contenedorCarrito.innerHTML = '';
    if (carrito.length > 0) {
        carrito.forEach(elemento => {
            $contenedorCarrito.innerHTML += `
            
            <div class="row shoppingCartItem col-12">
            <div class="col-6">
                <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <img src="${elemento.imagen}" class="shopping-cart-image">
                  <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${elemento.nombre}</h6>
                </div>
           </div>
            <div class="col-2">
                <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <p class="item-price mb-0 shoppingCartItemPrice">${elemento.precio}</p>
                </div>
            </div>
            <div class="col-4">
                <div
                    class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                     <p class="shopping-cart-quantity-input shoppingCartItemQuantity">${elemento.cantidad}</p>
                    <button class="btn btn-danger buttonDelete" onclick='borradoDeProducto(${carrito.indexOf(elemento)})' type="button">X</button>
                </div>
            </div>
        </div>
            `
        })
    }
    sumadorDePrecios()
}

function gracias(){
    var nodoGracias=document.querySelector("#gracias")
    nodoGracias.innerHTML=`<h3>GRACIAS POR TU COMPRA!!!</h3>`
}

const pagarBoton = document.querySelector(".pagarBoton")
pagarBoton.addEventListener("click", comprar)
function comprar() {
    gracias()
    carrito = []
    sumadorDePrecios()
    $contenedorCarrito.innerHTML = ""


}
function borradoDeProducto(index) {
    carrito[index].cantidad = carrito[index].cantidad - 1
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1)
    }
    localStorage.carrito = JSON.stringify(carrito)
    renderCarrito()
    restadorDePrecios()
}
function restadorDePrecios() {
    carrito.forEach(dejarDeComprar => {
        total = sumadorDePrecios() - dejarDeComprar.precio
    })
    localStorage.carrito = JSON.stringify(carrito)
}

function sumadorDePrecios() {
    let total = 0;
    let precioTotal = document.querySelector('.shoppingCartTotal');

    carrito.forEach(item => {
        const precio = Number(item.precio)
        const cantidad = Number(item.cantidad)
        total = total + precio * cantidad
    })

    localStorage.carrito = JSON.stringify(carrito)
    precioTotal.innerHTML = `total: ${total.toFixed(2)}$`
}


renderCarrito()



// const botonAniadirCarritoCompra = document.querySelectorAll(".aniadirCarrito")
// botonAniadirCarritoCompra.forEach(function(botonAniadirCarrito){
//     botonAniadirCarrito.addEventListener("click",clickAniadirCarrito)
// })

// function clickAniadirCarrito(event){
//     let button=event.target;
//     let item=button.closest(".item")
//     const itemImagen = item.querySelector(".itemImagen").src
//     const itemTitulo = item.querySelector(".itemTitulo").textcontent
//     const itemPrecio = item.querySelector(".itemPrecio").textcontent
//     console.log(itemPrecio)

// }




// var carrito = []
// agregarAlCarrito("Buzo", 2500 + "$", 0)
// agregarAlCarrito("Gorra roja", 1500 + "$", 0)
// agregarAlCarrito("Remera blanca", 1000 + "$", 0)
// agregarAlCarrito("Remera roja", 10.40 + "$", 0)
// agregarAlCarrito("Remera gris", 8.80 + "$", 0)
// agregarAlCarrito("Gorra gris", 10.40 + "$", 0)

// function agregarAlCarrito(nombre, precio, cantidad) {

//     function Producto(n, p, c){
//     this.nombre = n
//     this.precio = p
//     this.cant = c  
//     } 
//     producto = new Producto(nombre, precio, cantidad)
//     carrito = [...carrito, producto]
// }
// console.table(carrito)


// const aniadirCarrito = document.querySelectorAll ('.mirko')
// console.log(aniadirCarrito)
// // aniadirCarrito.forEach (function(botonAniadirCarro){
//     botonAniadirCarro.addEventListener ("click", agregarProducto)

// })
// function agregarProducto(){
//     alert("hola")
// }


