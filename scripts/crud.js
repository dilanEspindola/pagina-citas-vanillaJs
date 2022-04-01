// obtener datos del formulario
export function datosForm(formData) {
  if (JSON.parse(localStorage.getItem("datosAgenda")) === null) {
    let pushData = [];
    pushData.push(formData);
    localStorage.setItem("datosAgenda", JSON.stringify(pushData));
  } else {
    let dataAgenda = JSON.parse(localStorage.getItem("datosAgenda"));
    dataAgenda.push(formData);
    localStorage.setItem("datosAgenda", JSON.stringify(dataAgenda));
  }
}

// mostrar Datos
export function mostrarData() {
  let dataAgenda = JSON.parse(localStorage.getItem("datosAgenda"));
  const contenedorData = document.querySelector(".contenedor-data");
  const mostrarData = document.createElement("div");
  contenedorData.innerHTML = `<h2 class="datos-agenda-txt">Datos de la agenda</h2>`;
  mostrarData.classList.add("mostrar-data");
  contenedorData.appendChild(mostrarData);
  mostrarData.innerHTML = "";
  dataAgenda.forEach((element) => {
    mostrarData.innerHTML += `
        <div class="card">
        <div class="card-body">
        <div class="border">
            <h5 class="card-title"><span>Nombre: </span>${element.nombre} ${element.apellido}</h5>
            <p class="card-text"><span>Correo: </span>${element.correo}</p>
            <p class="card-text"><span>Fecha: </span>${element.fecha}</p>
            <p class="card-text"><span>Hora: </span>${element.hora}</p>
            <div class="buttons">
              <button class="btn-editar" id=${element.id}>Editar</button>
              <button class="btn-eliminar" id=${element.id}>Eliminar</button>
            </div>          
        </div>  
        </div>
        </div>
            `;
  });
}

// eliminar dato
const eliminar = document.querySelector(".contenedor-data");
eliminar.addEventListener("click", (e) => {
  const btn = e.target.classList.contains("btn-eliminar");
  const id = e.target.id;

  if (btn) {
    let dataAgenda = JSON.parse(localStorage.getItem("datosAgenda"));
    dataAgenda.forEach((element, index) => {
      if (element.id === id) {
        dataAgenda.splice(index, 1);
      }
    });
    localStorage.setItem("datosAgenda", JSON.stringify(dataAgenda));
    mostrarData();
  }
});

// actualizar dato
const editar = document.querySelector(".contenedor-data");
editar.addEventListener("click", (e) => {
  const btn = e.target.classList.contains("btn-editar");
  const id = e.target.id;

  if (btn) {
    let dataAgenda = JSON.parse(localStorage.getItem("datosAgenda"));
    dataAgenda.forEach((element) => {
      if (element.id === id) {
        document.querySelector("#nombre").value = element.nombre;

        document.querySelector("#apellido").value = element.apellido;

        document.querySelector("#correo").value = element.correo;

        document.querySelector("#fecha").value = element.fecha;

        document.querySelector("#hora").value = element.hora;

        document.querySelector(".btn-añadir").addEventListener("click", (e) => {
          e.preventDefault();
          const nombre = document.querySelector("#nombre").value;
          const apellido = document.querySelector("#apellido").value;
          const correo = document.querySelector("#correo").value;
          const fecha = document.querySelector("#fecha").value;
          const hora = document.querySelector("#hora").value;

          const data = {
            id: id,
            nombre,
            apellido,
            correo,
            fecha,
            hora,
          };

          dataAgenda.forEach((element, index) => {
            if (element.id === id) {
              dataAgenda[index] = data;
            }
          });

          localStorage.setItem("datosAgenda", JSON.stringify(dataAgenda));
          mostrarData();
          document.querySelector("form").reset();
          location.reload();
        });
      }
    });
  }
});

// busqueda de datos
const buscar = document.querySelector(".buscar");
buscar.addEventListener("keyup", (e) => {
  const busqueda = e.target.value.toLowerCase();
  const dataAgenda = JSON.parse(localStorage.getItem("datosAgenda"));
  const mostrarData = document.querySelector(".mostrar-data");
  mostrarData.innerHTML = "";
  dataAgenda.forEach((element) => {
    if (element.nombre.toLowerCase().includes(busqueda)) {
      mostrarData.innerHTML += `
        <div class="card">
        <div class="card-body">
        <div class="border">
            <h5 class="card-title"><span>Nombre: </span>${element.nombre} ${element.apellido}</h5>
            <p class="card-text"><span>Correo: </span>${element.correo}</p>
            <p class="card-text"><span>Fecha: </span>${element.fecha}</p>
            <p class="card-text"><span>Hora: </span>${element.hora}</p>
            <div class="buttons">
              <button class="btn-editar" id=${element.id}>Editar</button>
              <button class="btn-eliminar" id=${element.id}>Eliminar</button>
            </div>          
        </div>  
        </div>
        </div>
            `;
    }
  });
});
