// =============================================
// LOGIN / REGISTRO 
// =============================================
const contenedor = document.querySelector(".contenedor");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

if (btnSignIn) {
    btnSignIn.addEventListener("click", () => {
        contenedor.classList.remove("toggle");
    });
}
if (btnSignUp) {
    btnSignUp.addEventListener("click", () => {
        contenedor.classList.add("toggle");
    });
}

// Para el registro
const btnRegistrar = document.getElementById("btn-registrar");
if (btnRegistrar) {
    btnRegistrar.addEventListener("click", () => {
        const nombre = document.getElementById("registroNombre").value;
        const correo = document.getElementById("registroCorreo").value;
        const password = document.getElementById("registroPassword").value;
        if (nombre === "" || correo === "" || password === "") {
            alert("Complete todos los espacios");
            return;
        }
        localStorage.setItem("usuarioNombre", nombre);
        localStorage.setItem("usuarioCorreo", correo);
        localStorage.setItem("usuarioPassword", password);
        localStorage.setItem("logueado", "true");
        alert("¡Se registró correctamente!");
        contenedor.classList.remove("toggle");
    });
}

// Para el login
const btnLogin = document.getElementById("btn-login");
if (btnLogin) {
    btnLogin.addEventListener("click", () => {
        const correoLogin = document.getElementById("loginCorreo").value;
        const passwordLogin = document.getElementById("loginPassword").value;
        const correoGuardado = localStorage.getItem("usuarioCorreo");
        const passwordGuardado = localStorage.getItem("usuarioPassword");
        if (correoLogin === correoGuardado && passwordLogin === passwordGuardado) {
            alert("¡Inicio de sesión exitoso!");
            localStorage.setItem("logueado", "true");
            window.location.href = "index.html";
        } else {
            alert("Correo o contraseña incorrectos");
        }
    });
}

// =============================================
// CARRITO DE COMPRAS
// =============================================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
function agregarCarrito(nombre, precio) {
    const index = carrito.findIndex(item => item.nombre === nombre);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    guardarCarrito();
    actualizarCarritoUI();
    mostrarToast("✅ " + nombre + " agregado");
}
function cambiarCantidad(nombre, delta) {
    const index = carrito.findIndex(item => item.nombre === nombre);
    if (index !== -1) {
        carrito[index].cantidad += delta;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
    }
    guardarCarrito();
    actualizarCarritoUI();
}
function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    guardarCarrito();
    actualizarCarritoUI();
}
function actualizarCarritoUI() {
    const badge = document.getElementById("carrito-badge");
    const lista = document.getElementById("carrito-lista");
    const total = document.getElementById("carrito-total");

    const totalItems  = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPrecio = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    if (badge) {
        badge.textContent   = totalItems;
        badge.style.display = totalItems > 0 ? "flex" : "none";
    }
    if (lista) {
        if (carrito.length === 0) {
            lista.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío 🛒</p>`;
        } else {
            lista.innerHTML = carrito.map(item => `
                <div class="carrito-item">
                    <div class="carrito-item-info">
                        <span class="carrito-item-nombre">${item.nombre}</span>
                        <span class="carrito-item-precio">S/ ${(item.precio * item.cantidad).toFixed(2)}</span>
                    </div>
                    <div class="carrito-item-controles">
                        <button class="btn-cantidad" onclick="cambiarCantidad('${item.nombre}', -1)">−</button>
                        <span class="cantidad-num">${item.cantidad}</span>
                        <button class="btn-cantidad" onclick="cambiarCantidad('${item.nombre}', 1)">+</button>
                        <button class="btn-eliminar" onclick="eliminarDelCarrito('${item.nombre}')">🗑</button>
                    </div>
                </div>
            `).join('');
        }
    }
    if (total) {
        total.textContent = `Total: S/ ${totalPrecio.toFixed(2)}`;
    }
}
function toggleCarrito() {
    const panel   = document.getElementById("carrito-panel");
    const overlay = document.getElementById("overlay-carrito");
    if (panel)   panel.classList.toggle("abierto");
    if (overlay) overlay.classList.toggle("activo");
}
function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = mensaje;
    toast.classList.add("visible");
    setTimeout(() => toast.classList.remove("visible"), 2500);
}
// =============================================
// FILTROS DE CATEGORÍA
// =============================================
function filtrarCategoria(categoria) {
    const productos = document.querySelectorAll(".producto");
    const botones   = document.querySelectorAll(".btn-filtro");

    botones.forEach(b => b.classList.remove("activo"));
    const btnActivo = document.querySelector(`[data-cat="${categoria}"]`);
    if (btnActivo) btnActivo.classList.add("activo");

    productos.forEach(prod => {
        const cat = prod.getAttribute("data-categoria");
        if (categoria === "Todos" || cat === categoria) {
            prod.style.display   = "block";
            prod.style.animation = "fadeInUp 0.4s ease forwards";
        } else {
            prod.style.display = "none";
        }
    });
}
// =============================================
// INIT
// =============================================
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("carrito-badge")) {
        actualizarCarritoUI();
    }
});