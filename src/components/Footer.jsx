import React from "react";
import Container from "react-bootstrap/Container";
import "./footer.css";

function Footer() {
    return (
        <footer className="bg-dark text-light py-4 mt-auto">
            <Container>
                {/* Centrado en todos los dispositivos */}
                <div className="d-flex justify-content-center">
                    
                    <div className="text-center">
                        <h5 className="fw-bold text-white mb-3">Contacto</h5>
                        <p className="footer-link fw-normal mb-1" style={{ cursor: "default" }}>Atención al Cliente / Ventas:</p>
                        <a 
                            href="https://wa.me/5491134343434"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link d-inline-flex align-items-center gap-1 mb-3"
                        >
                            <i className="bi bi-whatsapp text-success"></i> +54 9 11 3434-3434
                        </a>

                        {/* Redes sociales */}
                        <div className="d-flex gap-3 fs-5 mt-2 justify-content-center">
                            <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link" title="Instagram">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link" title="Facebook">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link" title="TikTok">
                                <i className="bi bi-tiktok"></i>
                            </a>
                        </div>
                    </div>

                </div>

                <hr className="border-secondary my-4" />
                
                <p className="text-center footer-link mb-0 small w-100" style={{ cursor: "default" }}>
                    &copy; 2026 MultiShop - Todos los derechos reservados.
                </p>
            </Container>
        </footer>
    );
}

export default Footer;