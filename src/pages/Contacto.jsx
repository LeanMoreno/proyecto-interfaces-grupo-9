import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import styles from './contacto.module.css'

function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',    
    mensaje: ''
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function validateForm() {
    const newErrors = {};
    
    if (formData.nombre.trim() === "") {
      newErrors.nombre = "El campo nombre está vacío";
    }
    if (formData.email.trim() === "") {
      newErrors.email = "El campo email está vacío";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Ingrese un email válido";
    } else if (formData.email.includes(" ")) {
      newErrors.email = "El email no puede tener espacios vacios";
    }
    
    if (formData.mensaje.trim() === "") {
      newErrors.mensaje = "No escribiste ningun mensaje";
    }    
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setEnviado(true);
    } else {
      setEnviado(false);
    }
  }


  return (
    <Container className="my-5" style={{ minHeight: "70vh" }}>
      <div className="text-center mb-5">
        <h2 className="fw-bold display-6">Contacto</h2>
        <p className="text-muted">¿Tenés alguna duda sobre talles, envíos o ventas mayoristas?</p>
      </div>

      <Row className="g-5 justify-content-center">
        {/* Formulario de Contacto */}
        <Col lg={7}>
          <Card className="shadow-sm border-0 p-4">
            {enviado ? (
              <div className="text-center py-">
                <i className="bi bi-check-circle-fill text-success display-3 mb-3"></i>
                <h4 className="fw-bold">¡Mensaje enviado con éxito!</h4>
                <p className="text-muted">Gracias por contactarte con nosotros. Te responderemos a la brevedad.</p>
                <Button variant="outline-primary" className="mt-3" onClick={() => { setEnviado(false); setFormData({ nombre: '', email: '', mensaje: '' }); }}>
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="contactoNombre">
                  <p className="fw-semibold">Tus Datos</p>
                  <Form.Control 
                    type="text" 
                    name="nombre"
                    placeholder="Nombre"
                    className={`form-control ${
                      errors.nombre ? "is-invalid" : ""
                    }`} 
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  {errors.nombre && (
                    <div className="invalid-feedback">{errors.nombre}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactoEmail">
                  <Form.Control 
                    type="email5" 
                    name="email"
                    placeholder="Correo Electronico" 
                    value={formData.email}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-4" controlId="contactoMensaje">
                  <Form.Control 
                    as="textarea" 
                    rows={4} 
                    name="mensaje"
                    placeholder="Contanos tu consulta..." 
                    className={`form-control ${
                      errors.mensaje ? "is-invalid" : ""
                    }`}
                    value={formData.mensaje}
                    onChange={handleChange}
                  />
                  {errors.mensaje && (
                    <div className="invalid-feedback">{errors.mensaje}</div>
                  )}
                </Form.Group>

                <Button variant="danger" type="submit" size="lg" className="w-100 fw-bold shadow-sm">
                  Enviar Mensaje
                </Button>
              </Form>
            )}
          </Card>
        </Col>

        {/* Información de Contacto / Redes */}
        <Col lg={4} className={styles.contenedor}>
          <div className="d-flex flex-column gap-4" >
            <Card className="shadow-sm border-0 p-4 bg-light">
              <h5 className="fw-bold mb-3">Información</h5>
              <p className="text-muted small mb-2 d-flex align-items-center gap-2">
                <i className="bi bi-geo-alt-fill text-danger fs-5"></i> Buenos Aires, Argentina
              </p>
              <p className="text-muted small mb-2 d-flex align-items-center gap-2">
                <i className="bi bi-envelope-fill text-danger fs-5"></i> contacto@MultiShop.com
              </p>
              <p className="text-muted small mb-0 d-flex align-items-center gap-2">
                <i className="bi bi-whatsapp text-danger fs-5"></i> +54 11 3434-3434
              </p>
            </Card>

            <Card className="shadow-sm border-0 p-4 bg-light">
              <h5 className="fw-bold mb-3">Horarios de Atención</h5>
              <p className="text-muted small mb-1">Lunes a Viernes: 9:00 a 18:00 hs</p>
              <p className="text-muted small mb-0">Sábados: 9:00 a 13:00 hs</p>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contacto;