import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import ProductoCard from '../components/ProductoCard';
import { completarProducto } from '../data/completarProducto';

function Productos({ agregarAlCarrito, carrito }) {
  const [productos, setProductos] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [ordenPrecio, setOrdenPrecio] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos desde FakeStore API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar los productos');
        return res.json();
      })
      .then((data) => {
        const productosCompletos = data.map(completarProducto);
        setProductos(productosCompletos);
        setListaProductos(productosCompletos);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  // Extraer categorías únicas de la API
  const categoriasUnicas = ['Todas', ...new Set(productos.map((producto) => producto.category))];

  // Filtrar por categoría
  useEffect(() => {
    if (categoriaActiva === 'Todas') {
      setListaProductos(productos);
    } else {
      const productosFiltrados = productos.filter(
        (producto) => producto.category === categoriaActiva
      );
      setListaProductos(productosFiltrados);
    }
  }, [categoriaActiva, productos]);

  // Manejar el ordenamiento por precio
  const manejarOrdenPrecio = () => {
    const nuevoOrden = ordenPrecio === 'asc' ? 'desc' : 'asc';
    setOrdenPrecio(nuevoOrden);
    const productosOrdenados = [...listaProductos];

    if (nuevoOrden === 'asc') {
      productosOrdenados.sort((a, b) => a.price - b.price);
    } else {
      productosOrdenados.sort((a, b) => b.price - a.price);
    }
    setListaProductos(productosOrdenados);
  };

  if (cargando) {
    return (
      <Container className="my-5 text-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-3 text-muted fw-semibold">Cargando catálogo de MultiShop...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>¡Ocurrió un error!</Alert.Heading>
          <p>{error}. Por favor, verifícá tu conexión e intentá nuevamente.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center fw-bold">Nuestro Catálogo</h2>
      
      {/* Botones de Categorías */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-4 text-capitalize">
        {categoriasUnicas.map((categoria, index) => (
          <Button
            key={index}
            variant={categoriaActiva === categoria ? "primary" : "outline-primary"}
            onClick={() => setCategoriaActiva(categoria)}
            className="text-capitalize"
          >
            {categoria}
          </Button>
        ))}
      </div>

      {/* Botón de Ordenar por Precio */}
      <div 
        className="d-flex justify-content-end align-items-center mb-3"
        style={{ minHeight: '40px' }}
      >
        <Button
          variant="light"
          size="sm"
          className="border-0 text-secondary fw-bold shadow-sm px-3 py-2"
          onClick={manejarOrdenPrecio}
        >
          Ordenar Precio {ordenPrecio === 'asc' ? (
            <i className="bi bi-sort-numeric-up ms-2"></i>
          ) : (
            <i className="bi bi-sort-numeric-down-alt ms-2"></i>
          )}
        </Button>
      </div>
      
      {/* Grilla de Productos */}
      <Row className="g-4">
        {listaProductos.map((producto) => (
          <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
            <ProductoCard 
              producto={producto} 
              agregarAlCarrito={agregarAlCarrito} 
              carrito={carrito}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Productos;