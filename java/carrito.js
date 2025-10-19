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
