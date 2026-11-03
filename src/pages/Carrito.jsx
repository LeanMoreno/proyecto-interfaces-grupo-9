import CarritoItem from "../components/CarritoItem";
import { Container, Modal, Button, Col, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Carrito({
  carrito,
  eliminarProducto,
  aumentarCantidad,
  disminuirCantidad,
  totalProductos,
}) {
  const navigate = useNavigate();

  const totalDinero = carrito.reduce(
    (acumulado, producto) => acumulado + producto.price * producto.cantidad,
    0
  );

  return (
    <Container className="my-5" style={{ minHeight: '70vh' }}>
      {carrito.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-cartX display-1 text-muted mb-3"></i>
          <h4 className="text-muted">Tu carrito está vacío.</h4>
          <p className="text-secondary mb-4">
            Explorá nuestro catálogo y agregá productos para comenzar tu compra.
          </p>
          <Button variant="primary" onClick={() => navigate("/productos")}>
            Ver Productos
          </Button>
        </div>
      ) : (
        <Row className="g-4">
          {/* Listado de Productos en el Carrito */}
          <Col lg={8}>
            <Row className="g-3">
              {carrito.map((producto) => (
                <Col key={producto.id} xs={12}>
                  <CarritoItem
                    producto={producto}
                    eliminarProducto={eliminarProducto}
                    aumentarCantidad={aumentarCantidad}
                    disminuirCantidad={disminuirCantidad}
                  />
                </Col>
              ))}
            </Row>
          </Col>

          {/* Resumen de la Compra */}
          <Col lg={4}>
            <Card className="shadow-sm border-0 sticky-top" style={{ top: '90px' }}>
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-4">Resumen del pedido</h4>
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Productos totales:</span>
                  <span className="fw-semibold">{totalProductos} unidades</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <span className="fs-5 fw-bold">Total a pagar:</span>
                  <span className="fs-4 fw-bold text-primary">
                    ${totalDinero.toLocaleString("es-AR")}
                  </span>
                </div>

                <Button
                  variant="success"
                  size="lg"
                  className="w-100 fw-bold py-3 shadow-sm"
                  disabled={carrito.length === 0}
                  onClick={() => navigate("/formulario-compra")}
                >
                  Confirmar Compra
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Carrito;