import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import styles from './card.module.css';

function CardInicio() {
  return (
    <div>
      <Card className='m-4 shadow-sm border-0'>
        <Card.Body className="p-5 text-center">
          <Card.Title className="fw-bold display-6 mb-3 text-body">
            Bienvenidos a MultiShop
          </Card.Title>
          <Card.Text className={`${styles.description} text-muted fs-5 mb-3`}>
            Tu tienda multirrubro online. Encontrá las últimas tendencias en moda, tecnología, accesorios y mucho más en un solo lugar.
          </Card.Text>
          <Card.Text className={`${styles.description} text-muted mb-4`}>
            Variedad, calidad y las mejores ofertas con envíos rápidos y seguros para vos.
          </Card.Text>
          <div>
            <Button 
              as={Link} 
              to='/productos' 
              variant="danger" 
              size="lg"
              className="px-4 py-2 fw-bold shadow-sm">
              Ver Catálogo de Productos
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardInicio;