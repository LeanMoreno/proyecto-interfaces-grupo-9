import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductoCard = ({ producto, agregarAlCarrito, carrito }) => {
    const { id, title, price, image, category } = producto;
    
    // Como FakeStore no trae stock, le asignamos un stock simulado de 10 unidades
    const stock = producto.stock ?? 10;
    const sinStock = stock === 0;

    const enCarrito = carrito.find(item => item.id === producto.id);
    const maxAlcanzado = enCarrito?.cantidad >= stock;
    
    return (
        <Card className="h-100 shadow-sm border-0 transition-card">
            <div style={{ position: 'relative', backgroundColor: '#fff', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card.Img 
                    variant="top" 
                    src={image} 
                    alt={`Imagen de ${title}`} 
                    style={{ objectFit: 'contain', height: '200px', width: '100%' }}
                />
        
                {sinStock && (
                    <Badge bg="danger" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        Sin stock 
                    </Badge>
                )} 
            </div>

            <Card.Body className="d-flex flex-column">
                <Card.Subtitle className="mb-2 text-muted text-uppercase fs-7" style={{ fontSize: '0.8rem' }}>
                    {category}
                </Card.Subtitle>
                
                <Card.Title className="fs-6 fw-bold text-truncate-2" style={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    height: '2.4em'
                }}>
                    {title}
                </Card.Title>
                
                <Card.Text className="fs-5 fw-bold text-primary mt-2">
                    ${price.toLocaleString('es-AR')}
                </Card.Text>

                <div className="d-flex justify-content-between align-items-center mt-auto pt-3 gap-2">
                    <Link to={`/producto/${id}`} className="text-decoration-none">
                        <Button variant="outline-secondary" size="sm">
                            + Info
                        </Button>
                    </Link>
                    
                    <Button
                        variant={sinStock || maxAlcanzado ? "secondary" : "primary"}
                        size="sm"
                        disabled={sinStock || maxAlcanzado}
                        onClick={() => agregarAlCarrito(producto)}
                        className="d-flex align-items-center gap-1"
                    >
                        <i className="bi bi-cart-plus"></i>
                        {maxAlcanzado ? "Máximo" : "Agregar"}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductoCard;