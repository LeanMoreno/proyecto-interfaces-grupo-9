import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toast, ToastContainer, ToastHeader } from "react-bootstrap";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";
import DetalleProducto from "./pages/DetalleProducto";
import FormularioCompra from "./pages/FormularioCompra";

function App() {
  const [mostrarToast, setMostrarToast] = useState(false);

  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("cart");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  const [temaOscuro, setTemaOscuro] = useState(() => {
    const temaGuardado = localStorage.getItem("temaOscuro");
    return temaGuardado === "true";
  });

  // Persistencia del carrito
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(carrito));
  }, [carrito]);

  // Persistencia y aplicación del tema oscuro/claro
  useEffect(() => {
    localStorage.setItem("temaOscuro", temaOscuro);
    document.documentElement.setAttribute(
      "data-bs-theme",
      temaOscuro ? "dark" : "light",
    );
  }, [temaOscuro]);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find((item) => item.id === producto.id);

      if (existe) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }

      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
    setMostrarToast(true);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const toggleTema = () => {
    setTemaOscuro(!temaOscuro);
  };

  const eliminarProducto = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((producto) => producto.id !== id),
    );
  };

  const aumentarCantidad = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.map((producto) =>
        producto.id === id
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto,
      ),
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito(
      (carritoActual) =>
        carritoActual
          .map((producto) => {
            if (producto.id !== id) return producto;
            return { ...producto, cantidad: producto.cantidad - 1 };
          })
          .filter((producto) => producto.cantidad > 0), // Si llega a 0, lo remueve automáticamente
    );
  };

  const totalProductos = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0,
  );

  return (
    <>
      <ScrollToTop />

      <NavBar
        totalProductos={totalProductos}
        temaOscuro={temaOscuro}
        toggleTema={toggleTema}
      />

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route
          path="/productos"
          element={
            <Productos agregarAlCarrito={agregarAlCarrito} carrito={carrito} />
          }
        />
        <Route
          path="/producto/:id"
          element={
            <DetalleProducto
              agregarAlCarrito={agregarAlCarrito}
              carrito={carrito}
            />
          }
        />
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              setCarrito={setCarrito}
              eliminarProducto={eliminarProducto}
              aumentarCantidad={aumentarCantidad}
              disminuirCantidad={disminuirCantidad}
              totalProductos={totalProductos}
            />
          }
        />
        <Route path="/contacto" element={<Contacto />} />
        <Route
          path="/formulario-compra"
          element={
            <FormularioCompra
              carrito={carrito}
              eliminarProducto={eliminarProducto}
              vaciarCarrito={vaciarCarrito}
            />
          }
        />
      </Routes>

      <Footer />

      <ToastContainer
        position="top-end"
        className="p-3 mt-5"
        style={{ position: "fixed", zIndex: 1050 }}
      >
        <Toast
          show={mostrarToast}
          onClose={() => setMostrarToast(false)}
          autohide
          delay={3000}
          bg="success"
        >
          <ToastHeader closeButton>
            <strong className="me-auto">MultiShop</strong>
          </ToastHeader>
          <Toast.Body className="text-white fw-bold">
            ¡Producto agregado al carrito!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default App;
