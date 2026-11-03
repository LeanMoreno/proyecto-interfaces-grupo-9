import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Descripcion() {
  return (
    <section className="py-5 bg-body-tertiary">
      <Container>
        <h2 className="text-center mb-4 fw-bold">Sobre MultiShop</h2>
        <p className="lead text-center text-muted mb-5">
          MultiShop es tu tienda multirrubro online de confianza, diseñada para
          ofrecerte variedad, calidad y las mejores tendencias en un solo lugar.
        </p>

        <Row className="g-4 text-center">
          <Col md={4}>
            <div className="p-3">
              <i className="bi bi-box-seam fs-1 text-danger mb-3"></i>
              <h4 className="fw-bold h5">Gran Variedad</h4>
              <p className="text-muted small">
                Un catálogo amplio y surtido que incluye moda, tecnología,
                accesorios y mucho más para cubrir todas tus necesidades.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-3">
              <i className="bi bi-shield-check fs-1 text-danger mb-3"></i>
              <h4 className="fw-bold h5">Calidad Garantizada</h4>
              <p className="text-muted small">
                Seleccionamos cada producto cuidadosamente para asegurarnos de
                que recibas la mejor durabilidad y rendimiento.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-3">
              <i className="bi bi-truck fs-1 text-danger mb-3"></i>
              <h4 className="fw-bold h5">Envíos Rápidos</h4>
              <p className="text-muted small">
                Logística ágil y segura para que tus compras lleguen a la puerta
                de tu casa en el menor tiempo posible.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Descripcion;
