const btn = document.getElementById("btn");
const contenedor = document.querySelector(".contenedor")
btn.addEventListener("click",()=>{
    contenedor.classList.toggle("toggle");
});