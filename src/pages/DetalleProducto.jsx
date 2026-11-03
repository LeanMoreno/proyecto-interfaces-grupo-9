import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Badge, Spinner, Alert } from "react-bootstrap";

function DetalleProducto({ agregarAlCarrito, carrito }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Obtener detalle del producto desde FakeStore API
  useEffect(() => {
    setCargando(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then((data) => {
        setProducto(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return (
      <Container className="my-5 text-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando producto...</span>
        </Spinner>
        <p className="mt-3 text-muted">Cargando detalle del producto...</p>
      </Container>
    );
  }

  if (error || !producto) {
    return (
      <Container className="my-5 text-center py-5">
        <Alert variant="warning" className="d-inline-block p-4 shadow-sm">
          <Alert.Heading>Producto no encontrado</Alert.Heading>
          <p className="mb-3">El producto solicitado no existe o fue removido.</p>
          <Link to="/productos">
            <Button variant="primary">Volver al catálogo</Button>
          </Link>
        </Alert>
      </Container>
    );
  }

  // Stock simulado para la API y estado del carrito
  const stock = producto.stock ?? 10;
  const sinStock = stock === 0;
  const enCarrito = carrito.find((item) => item.id === producto.id);
  const maxAlcanzado = enCarrito?.cantidad >= stock;

  return (
    <Container className="my-5" style={{ minHeight: "70vh" }}>
      <Row className="g-5 align-items-center">
        {/* Imagen del Producto */}
        <Col md={6} className="text-center">
          <div 
            className="p-4 bg-white rounded shadow-sm border d-flex align-items-center justify-content-center"
            style={{ minHeight: "350px" }}
          >
            <img
              src={producto.image}
              alt={producto.title}
              className="img-fluid"
              style={{ maxHeight: "350px", objectFit: "contain" }}
            />
          </div>
        </Col>

        {/* Información del Producto */}
        <Col md={6}>
          <Badge bg="secondary" className="mb-2 text-capitalize px-3 py-2">
            {producto.category}
          </Badge>

          <h2 className="fw-bold mb-3">{producto.title}</h2>

          <h3 className="text-primary fw-bold mb-4">
            ${producto.price?.toLocaleString("es-AR")}
          </h3>

          <p className="text-muted mb-4 lead" style={{ fontSize: "1rem" }}>
            {producto.description}
          </p>

          <div className="mb-4">
            <span className="text-muted small d-block mb-1">
              Stock disponible: <strong>{stock} unidades</strong>
            </span>
            {sinStock && <Badge bg="danger">Sin stock disponible</Badge>}
            {maxAlcanzado && (
              <Badge bg="warning" text="dark">
                Alcanzaste el límite de unidades en tu carrito
              </Badge>
            )}
          </div>

          <div className="d-flex gap-3">
            <Link to="/productos">
              <Button variant="outline-secondary" size="lg">
                <i className="bi bi-arrow-left me-2"></i>Volver
              </Button>
            </Link>

            <Button
              variant={sinStock || maxAlcanzado ? "secondary" : "success"}
              size="lg"
              disabled={sinStock || maxAlcanzado}
              onClick={() => agregarAlCarrito(producto)}
              className="d-flex align-items-center gap-2"
            >
              <i className="bi bi-cart-plus-fill"></i>
              {maxAlcanzado ? "Máximo en carrito" : "Agregar al Carrito"}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleProducto;