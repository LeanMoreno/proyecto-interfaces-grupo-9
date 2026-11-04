// La API no trae stock ni características, así que se los agregamos acá
const idsSinStock = [5, 12];

export function completarProducto(producto) {
  return {
    ...producto,
    stock: idsSinStock.includes(producto.id) ? 0 : 10,
    caracteristicas: [
      "Envío a todo el país",
      "Garantía de 6 meses",
      `Categoría: ${producto.category}`,
    ],
  };
}