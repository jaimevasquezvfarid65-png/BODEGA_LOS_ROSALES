const contenedor = document.querySelector(".contenedor");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");
btnSignIn.addEventListener("click",()=>{
    contenedor.classList.remove("toggle");
});
btnSignUp.addEventListener("click",()=>{
    contenedor.classList.add("toggle");
});
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
        contenedor.classList.remove("toggle"); // vuelve al login
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