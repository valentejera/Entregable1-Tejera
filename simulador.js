// Declaración de variables, constantes y arrays
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

// Función para mostrar productos disponibles
function mostrarProductos() {
  console.log("Productos disponibles:");
  productos.forEach((producto, index) => {
    console.log(`${index + 1}. ${producto.nombre} - €${producto.precio}`);
  });
}

// Función para seleccionar productos
function seleccionarProductos() {
  let seleccionados = [];
  let seguir = true;

  while (seguir) {
    mostrarProductos();
    let opcion = prompt("Elige un producto por número (1-4). Escribe 0 para finalizar:");
    let index = parseInt(opcion) - 1;

    if (opcion === "0") {
      seguir = false;
    } else if (index >= 0 && index < productos.length) {
      seleccionados.push(productos[index]);
      alert(`Producto agregado: ${productos[index].nombre}`);
    } else {
      alert("Opción inválida. Intenta de nuevo.");
    }
  }

  return seleccionados;
}

// Función para calcular el total con impuesto por país
function calcularTotal(productosSeleccionados, paisDestino) {
  let subtotal = productosSeleccionados.reduce((acc, prod) => acc + prod.precio, 0);
  let impuesto = paisesConImpuesto[paisDestino] || 0.20;
  let total = subtotal * (1 + impuesto);

  return {
    subtotal: subtotal.toFixed(2),
    impuesto: (impuesto * 100).toFixed(0) + "%",
    total: total.toFixed(2)
  };
}

// Función principal del simulador
function iniciarSimulador() {
  alert("Bienvenido al simulador de productos venezolanos 🇻🇪");

  const pais = prompt("¿A qué país de Europa deseas importar? (Ej: España, Francia, Alemania, Italia)");
  const seleccionados = seleccionarProductos();

  if (seleccionados.length === 0) {
    alert("No seleccionaste productos. Simulación cancelada.");
    return;
  }

  const resultado = calcularTotal(seleccionados, pais);

  alert(
    `Resumen de tu pedido:\n` +
    `País destino: ${pais}\n` +
    `Subtotal: €${resultado.subtotal}\n` +
    `Impuesto aplicado: ${resultado.impuesto}\n` +
    `Total a pagar: €${resultado.total}`
  );

  const confirmar = confirm("¿Deseas confirmar tu pedido?");
  if (confirmar) {
    alert("¡Gracias por tu compra! Tu pedido ha sido registrado.");
  } else {
    alert("Has cancelado el pedido.");
  }
}

// Llamada a la función principal
iniciarSimulador();