import { Card, Button } from "react-bootstrap";

function CarritoItem({ producto, eliminarProducto, aumentarCantidad, disminuirCantidad }) {
  const { id, title, price, image } = producto;
  const stock = producto.stock ?? 10;
  const cantidad = producto.cantidad ?? 1;
  const subtotal = price * cantidad;

  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body className="p-3">
        {/* Vista para Celulares (se apila) y Escritorio (se alinea) */}
        <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
          
          {/* Fila superior en cel / Izquierda en pc: Imagen y Título */}
          <div className="d-flex align-items-center gap-3 w-100">
            <div 
              style={{ 
                width: "75px", 
                height: "75px", 
                flexShrink: 0, 
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px"
              }}
            >
              <img 
                src={image} 
                alt={title} 
                style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "6px" }}
              />
            </div>

            <div className="flex-grow-1 overflow-hidden">
              <h6 className="fw-bold mb-1 text-truncate" title={title}>
                {title}
              </h6>
              <p className="text-muted small mb-0">
                ${price.toLocaleString("es-AR")} c/u
              </p>
            </div>
          </div>

          {/* Fila inferior en cel / Derecha en pc: Controles, Subtotal y Basura */}
          <div className="d-flex align-items-center justify-content-between justify-content-sm-end w-100 w-sm-auto gap-3 pt-2 pt-sm-0 border-top border-sm-top-0 mt-2 mt-sm-0">
            
            {/* Controles de Cantidad */}
            <div className="d-flex align-items-center border rounded">
              <Button 
                variant="light" 
                size="sm" 
                onClick={() => disminuirCantidad(id)}
                disabled={cantidad <= 1}
                className="border-0 px-2 py-0"
              >
                <i className="bi bi-dash"></i>
              </Button>
              <span className="px-2 fw-semibold small">{cantidad}</span>
              <Button 
                variant="light" 
                size="sm" 
                onClick={() => aumentarCantidad(id)}
                disabled={stock <= cantidad}
                className="border-0 px-2 py-0"
              >
                <i className="bi bi-plus"></i>
              </Button>
            </div>

            {/* Subtotal */}
            <div className="text-end" style={{ minWidth: "80px" }}>
              <span className="text-muted small d-block" style={{ fontSize: '0.75rem' }}>Subtotal</span>
              <span className="fw-bold text-primary">${subtotal.toLocaleString("es-AR")}</span>
            </div>

            {/* Botón Eliminar */}
            <Button 
              variant="outline-danger" 
              size="sm" 
              onClick={() => eliminarProducto(id)}
              className="border-0"
              title="Eliminar producto"
            >
              <i className="bi bi-trash fs-6"></i>
            </Button>
          </div>

        </div>
      </Card.Body>
    </Card>
  );
}

export default CarritoItem;