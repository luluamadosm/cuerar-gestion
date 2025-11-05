let carrito = [];

function agregarAlCarrito(boton) {
  const nombre = boton.dataset.nombre;
  const precio = parseFloat(boton.dataset.precio);

  carrito.push({ nombre, precio });
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("carrito-lista");
  const total = document.getElementById("carrito-total");

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${item.nombre} - $${item.precio}
      <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">X</button>
    `;
    lista.appendChild(li);
    suma += item.precio;
  });

  total.textContent = suma.toFixed(2);
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Nuevas funciones para mostrar modal con resumen y completar la compra
function finalizarCompra() {
  if (!carrito.length) {
    alert("El carrito está vacío.");
    return;
  }

  const resumenEl = document.getElementById("resumen-carrito");
  let suma = 0;
  const ul = document.createElement("ul");
  ul.className = "list-group mb-2";

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = item.nombre;
    const span = document.createElement("span");
    span.textContent = `$${item.precio}`;
    li.appendChild(span);
    ul.appendChild(li);
    suma += item.precio;
  });

  const totalP = document.createElement("p");
  totalP.className = "fw-bold mt-2";
  totalP.textContent = `Total: $${suma.toFixed(2)}`;

  // Limpiar e insertar resumen
  resumenEl.innerHTML = "";
  resumenEl.appendChild(ul);
  resumenEl.appendChild(totalP);

  // Mostrar modal (Bootstrap 5)
  const modalEl = document.getElementById("confirmModal");
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

function completarCompra() {
  // Aquí se procesa la compra: vaciar carrito, actualizar UI y cerrar modal
  carrito = [];
  actualizarCarrito();

  const modalEl = document.getElementById("confirmModal");
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();

  alert("Compra realizada con éxito. ¡Gracias!");
}
