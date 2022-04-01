import { datosForm, mostrarData } from "./crud.js";
import { uuidv4 } from "./generarId.js";

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const correo = document.querySelector("#correo").value;
  const fecha = document.querySelector("#fecha").value;
  const hora = document.querySelector("#hora").value;

  const data = {
    id: uuidv4(),
    nombre,
    apellido,
    correo,
    fecha,
    hora,
  };
  datosForm(data);
  mostrarData();
  document.querySelector("form").reset();
});

if (JSON.parse(localStorage.getItem("datosAgenda")) === null) {
  console.log("empty");
} else {
  mostrarData();
}
