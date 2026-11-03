import { useState } from "react";
import { Col, Row, Card, Modal, Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FormularioCompra({ carrito, eliminarProducto, vaciarCarrito }) {
    const [mostrarModal, setMostrarModal] = useState(false);
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [dni, setDni] = useState("");
    const [tarjeta, setTarjeta] = useState("");
    const [aceptaTerminos, setAceptaTerminos] = useState(false);

    const totalDinero = carrito.reduce(
        (acc, producto) => acc + producto.price * producto.cantidad,
        0
    );

    const finalizarCompra = (e) => {
        e.preventDefault();
        if (!nombre.trim() || !dni.trim() || !tarjeta.trim()) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }
        if (!aceptaTerminos) {
            alert("Debe aceptar los términos y condiciones.");
            return;
        }
        setMostrarModal(true);
        vaciarCarrito();
    };

    return (
        <Container className="my-5" style={{ minHeight: "70vh" }}>
            <h2 className="mb-4 fw-bold text-center">Ya casi está todo listo</h2>
            
            <Row className="g-5">
                {/* Columna del Formulario */}
                <Col lg={6}>
                    <Card className="shadow-sm border-0 p-4">
                        <h4 className="fw-bold mb-3">Datos de facturación</h4>
                        <Form onSubmit={finalizarCompra}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Nombre del titular</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Indique su nombre completo"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicDni">
                                <Form.Label>DNI</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Indique su DNI acá" 
                                    value={dni} 
                                    onChange={(e) => setDni(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCard">
                                <Form.Label>Número de tarjeta</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    value={tarjeta}
                                    onChange={(e) => setTarjeta(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="formBasicCheckbox">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Aceptar los términos y condiciones" 
                                    checked={aceptaTerminos}
                                    onChange={(e) => setAceptaTerminos(e.target.checked)}
                                />
                            </Form.Group>

                            <Button 
                                variant="success" 
                                type="submit" 
                                size="lg"
                                className="w-100 fw-bold shadow-sm"
                                disabled={carrito.length === 0}
                            >
                                Finalizar Compra (${totalDinero.toLocaleString("es-AR")})
                            </Button>
                        </Form>
                    </Card>
                </Col>

                {/* Columna del Detalle de Compra */}
                <Col lg={6}>
                    <h4 className="fw-bold mb-3">Detalle del pedido</h4>
                    
                    {carrito.length === 0 ? (
                        <Card className="text-center p-5 shadow-sm border-0">
                            <h5 className="text-muted">El carrito está vacío</h5>
                            <p className="text-secondary small mb-3">
                                Agregue productos para poder finalizar su compra.
                            </p>
                            <Button variant="outline-primary" onClick={() => navigate("/productos")}>
                                Ver Productos
                            </Button>
                        </Card>
                    ) : (
                        <div className="d-flex flex-column gap-3" style={{ maxHeight: "450px", overflowY: "auto" }}>
                            {carrito.map((producto) => (
                                <Card key={producto.id} className="shadow-sm border-0">
                                    <Card.Body className="py-2 px-3">
                                        <Row className="align-items-center">
                                            <Col md={5}>
                                                <span className="fw-semibold small text-truncate d-block" title={producto.title}>
                                                    {producto.title}
                                                </span>
                                            </Col>
                                            <Col md={2} className="text-muted small">
                                                x{producto.cantidad}
                                            </Col>
                                            <Col md={4} className="text-end fw-bold text-primary small">
                                                ${(producto.price * producto.cantidad).toLocaleString("es-AR")}
                                            </Col>
                                            <Col md={1} className="text-end">
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    className="border-0 p-1"
                                                    onClick={() => eliminarProducto(producto.id)}
                                                    title="Eliminar ítem"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    )}
                </Col>
            </Row>

            {/* Modal de Exito */}
            <Modal
                show={mostrarModal}
                onHide={() => setMostrarModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>🎉 ¡Compra realizada con éxito!</Modal.Title>
                </Modal.Header>

                <Modal.Body className="text-center py-4">
                    <i className="bi bi-check-circle-fill text-success display-3 mb-3"></i>
                    <p className="mb-1 fw-bold fs-5">¡Gracias por tu compra, {nombre}!</p>
                    <p className="text-muted mb-0">
                        Tu pedido fue procesado correctamente y en breve nos pondremos en contacto.
                    </p>
                </Modal.Body>

                <Modal.Footer className="justify-content-center">
                    <Button 
                        variant="success" 
                        className="px-4 fw-bold"
                        onClick={() => { 
                            setMostrarModal(false); 
                            navigate("/productos"); 
                        }}
                    >
                        Volver al Catálogo
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default FormularioCompra;
