// --------- DATOS ---------
const productos = [
  { nombre: "Harina PAN", precio: 3 },
  { nombre: "Chocolate Savoy", precio: 2 },
  { nombre: "Café Fama de América", precio: 4 },
  { nombre: "Queso Llanero", precio: 5 }
];

const paisesConImpuesto = {
  "España": 0.21,
  "Francia": 0.20,
  "Alemania": 0.19,
  "Italia": 0.22
};

// --------- RENDERIZAR PRODUCTOS ---------
const listaProductos = document.getElementById("lista-productos");

productos.forEach((prod, index) => {
  const div = document.createElement("div");
  div.classList.add("producto");

  const span = document.createElement("span");
  span.textContent = `${prod.nombre} - €${prod.precio}`;
  span.style.color = "black"; // aseguramos que se vea

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = index;

  div.appendChild(span);
  div.appendChild(checkbox);
  listaProductos.appendChild(div);
});

// --------- BOTONES Y CONTENEDORES ---------
const btnCalcular = document.getElementById("calcular");
const btnConfirmar = document.getElementById("confirmar");
const resultadoDiv = document.getElementById("resultado");
const ultimoPedidoDiv = document.getElementById("ultimo-pedido");

let pedidoActual = null; // Guardamos temporalmente el pedido antes de confirmar

// --------- CALCULAR TOTAL ---------
btnCalcular.addEventListener("click", () => {
  const pais = document.getElementById("pais").value;
  if (!pais) {
    resultadoDiv.innerHTML = "<p>⚠️ Por favor selecciona un país.</p>";
    return;
  }

  const seleccionados = [];
  document.querySelectorAll("#lista-productos input:checked").forEach(input => {
    seleccionados.push(productos[input.value]);
  });

  if (seleccionados.length === 0) {
    resultadoDiv.innerHTML = "<p>⚠️ No seleccionaste productos.</p>";
    return;
  }

  const subtotal = seleccionados.reduce((acc, p) => acc + p.precio, 0);
  const impuesto = paisesConImpuesto[pais] || 0.20;
  const total = subtotal * (1 + impuesto);

  // Guardamos en variable global
  pedidoActual = { pais, seleccionados, subtotal, impuesto, total };

  resultadoDiv.innerHTML = `
    <h3>Resumen del pedido</h3>
    <p>País destino: ${pais}</p>
    <p>Subtotal: €${subtotal.toFixed(2)}</p>
    <p>Impuesto: ${(impuesto * 100).toFixed(0)}%</p>
    <p><strong>Total: €${total.toFixed(2)}</strong></p>
  `;

  btnConfirmar.disabled = false;
});

// --------- CONFIRMAR PEDIDO ---------
btnConfirmar.addEventListener("click", () => {
  if (!pedidoActual) return;

  ultimoPedidoDiv.innerHTML = `
    <h3>Último pedido confirmado</h3>
    <p>País destino: ${pedidoActual.pais}</p>
    <p>Productos: ${pedidoActual.seleccionados.map(p => p.nombre).join(", ")}</p>
    <p>Subtotal: €${pedidoActual.subtotal.toFixed(2)}</p>
    <p>Impuesto: ${(pedidoActual.impuesto * 100).toFixed(0)}%</p>
    <p><strong>Total: €${pedidoActual.total.toFixed(2)}</strong></p>
  `;

  // Guardamos en localStorage
  localStorage.setItem("ultimoPedido", JSON.stringify(pedidoActual));

  resultadoDiv.innerHTML = "<p>✅ Pedido confirmado con éxito.</p>";
  btnConfirmar.disabled = true;
});
