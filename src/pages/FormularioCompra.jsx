import { useState } from "react";
import { Col, Row, Card, Modal, Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FormularioCompra({ carrito, eliminarProducto, vaciarCarrito }) {
    const [mostrarModal, setMostrarModal] = useState(false);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        dni: '',
        tarjeta: '',
        aceptaTerminos: false
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    function validateForm() {
        const newErrors = {};
        const soloNumeros = /^\d+$/;
        if (formData.nombre.trim() === "") {
            newErrors.nombre = "El campo nombre está vacío";
        }
        if (formData.dni.trim() === "") {
            newErrors.dni = "El campo dni está vacío";
        } else if (!soloNumeros.test(formData.dni)) {
            newErrors.dni = 'No se admiten letras ni caracteres en el DNI';
        }

        if (formData.tarjeta.trim() === "") {
            newErrors.tarjeta = "No Ingresaste ninguna tarjeta";
        } else if (!soloNumeros.test(formData.tarjeta)) {
            newErrors.tarjeta = 'No se admiten letras ni caracteres en la tarjeta';
        } 
        
        if (!formData.aceptaTerminos) {
            newErrors.aceptaTerminos = "Debes aceptar los terminos y condiciones";
        }
        return newErrors;
    }
    
    const totalDinero = carrito.reduce(
        (acc, producto) => acc + producto.price * producto.cantidad,
        0
    );

    const finalizarCompra = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setMostrarModal(true);
            vaciarCarrito();
        } else {
            setMostrarModal(false);
        }        
    };

    return (
        <Container className="my-5" style={{ minHeight: "70vh" }}>
            <h2 className="mb-4 fw-bold text-center">Ya casi está todo listo</h2>
            
            <Row className="g-5">
                {/* Columna del Formulario */}
                <Col lg={6}>
                    <Card className="shadow-sm border-0 p-4">
                        <h4 className="fw-bold mb-3">Datos de facturación</h4>
                        <Form onSubmit={finalizarCompra} noValidate>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Nombre del titular</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder="Indique su nombre completo"
                                    className={`form-control ${errors.nombre ? "is-invalid" : ""
                                        }`} 
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                                {errors.nombre && (
                                    <div className="invalid-feedback">{errors.nombre}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicDni">
                                <Form.Label>DNI</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="dni" 
                                    placeholder="Indique su DNI acá" 
                                    className={`form-control ${errors.dni ? "is-invalid" : ""
                                        }`} 
                                    value={formData.dni} 
                                    onChange={handleChange}
                                />
                                {errors.dni && (
                                    <div className="invalid-feedback">{errors.dni}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCard">
                                <Form.Label>Número de tarjeta</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tarjeta"
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    className={`form-control ${errors.tarjeta ? "is-invalid" : ""
                                        }`}
                                    value={formData.tarjeta}
                                    onChange={handleChange}
                                />
                                {errors.tarjeta && (
                                    <div className="invalid-feedback">{errors.tarjeta}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="formBasicCheckbox">
                                <Form.Check 
                                    type="checkbox"
                                    name="aceptaTerminos" 
                                    label="Aceptar los términos y condiciones" 
                                    className={`form-control ${errors.aceptaTerminos ? "is-invalid" : ""
                                        }`}
                                    checked={formData.aceptaTerminos}
                                    onChange={handleChange}
                                />
                                {errors.aceptaTerminos && (
                                    <div className="invalid-feedback">{errors.aceptaTerminos}</div>
                                )}
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
                    <p className="mb-1 fw-bold fs-5">¡Gracias por tu compra, {formData.nombre}!</p>
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
