import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.png';
import styles from './navbar.module.css'; 

function NavBar({ totalProductos, temaOscuro, toggleTema }) {
    return (
        <Navbar 
            data-bs-theme={temaOscuro ? "dark" : "light"}
            expand="lg" 
            className={`${styles.navbar} bg-body-tertiary shadow-sm sticky-top`}
        >
            <Container fluid className="px-5">
                <Navbar.Brand as={Link} to="/" className={styles.brand}>
                    <img src={logo} className={styles.logo} alt="TuTienda" />
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ms-auto align-items-center gap-2">
                        <Nav.Link className={styles.navLink} as={NavLink} to="/">
                            Inicio
                        </Nav.Link>
                        
                        <Nav.Link className={styles.navLink} as={NavLink} to="/productos">
                            Productos
                        </Nav.Link>

                        <Nav.Link className={`${styles.navLink} d-flex align-items-center gap-1`} as={NavLink} to="/carrito">
                            <i className="bi bi-cart3 fs-5"></i>
                            <span>Carrito</span>
                            {totalProductos > 0 && (
                                <span className="badge bg-danger rounded-pill ms-1">
                                    {totalProductos}
                                </span>
                            )}
                        </Nav.Link>

                        <Nav.Link className={styles.navLink} as={NavLink} to="/contacto">
                            Contactos
                        </Nav.Link>

                        <Button
                            variant={temaOscuro ? "outline-light" : "outline-dark"}
                            onClick={toggleTema}
                            className="rounded-circle d-flex align-items-center justify-content-center ms-lg-3 mt-2 mt-lg-0"
                            style={{ width: '40px', height: '40px' }}
                            title={temaOscuro ? "Modo Claro" : "Modo Oscuro"}
                        >
                            {temaOscuro ? (
                                <i className="bi bi-sun-fill text-warning"></i>
                            ) : (
                                <i className="bi bi-moon-stars-fill"></i>
                            )}
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;