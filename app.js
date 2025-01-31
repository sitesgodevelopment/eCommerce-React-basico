const { Button, Layout, Card, Col, Row, notification, Modal } = antd;
const { Header, Content, Footer } = Layout;

const productos = [
  { id: 1, nombre: "Camiseta Nike", descripcion: "Camiseta deportiva de alta calidad", precio: 25, imagen: "https://picsum.photos/400/300" },
  { id: 2, nombre: "Zapatillas Adidas", descripcion: "Zapatillas cómodas para correr", precio: 60, imagen: "https://picsum.photos/400/301" },
  { id: 3, nombre: "Reloj Casio", descripcion: "Reloj digital de alta precisión", precio: 50, imagen: "https://picsum.photos/400/302" },
  { id: 4, nombre: "Gorra Puma", descripcion: "Gorra ajustable y cómoda", precio: 15, imagen: "https://picsum.photos/400/303" }
];

function App() {
  const [carrito, setCarrito] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    notification.success({
      message: 'Producto agregado al carrito',
      description: `¡Has agregado ${producto.nombre} al carrito!`,
    });
  };

  const mostrarCarrito = () => {
    setVisible(true);
  };

  const finalizarCompra = () => {
    const mensaje = carrito.map(item => `${item.nombre} - $${item.precio}`).join("\n");
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    const url = `https://wa.me/1161160990?text=${encodeURIComponent(`Pedido: \n${mensaje}\nTotal: $${total}`)}`;
    window.open(url, '_blank');
  };

  const cerrarCarrito = () => {
    setVisible(false);
  };

  return (
    <Layout>
      <Header style={{ background: '#1890ff', padding: '0 20px' }}>
        <h1 style={{ color: 'white', textAlign: 'center' }}>Tienda de Ecommerce</h1>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Row gutter={16}>
          {productos.map((producto) => (
            <Col span={6} key={producto.id}>
              <Card hoverable cover={<img alt={producto.nombre} src={producto.imagen} />}>
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p><strong>Precio: ${producto.precio}</strong></p>
                <Button type="primary" onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</Button>
              </Card>
            </Col>
          ))}
        </Row>
        <Button type="primary" onClick={mostrarCarrito} style={{ marginTop: '20px' }}>Ver Carrito ({carrito.length})</Button>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ecommerce ©2025 - Todos los derechos reservados</Footer>

      <Modal
        title="Carrito de compras"
        visible={visible}
        onCancel={cerrarCarrito}
        footer={[
          <Button key="cancel" onClick={cerrarCarrito}>Cerrar</Button>,
          <Button key="finalizar" type="primary" onClick={finalizarCompra}>Finalizar Compra</Button>
        ]}
      >
        {carrito.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          <div>
            {carrito.map((item, index) => (
              <p key={index}>{item.nombre} - ${item.precio}</p>
            ))}
            <p><strong>Total: ${carrito.reduce((acc, item) => acc + item.precio, 0)}</strong></p>
          </div>
        )}
      </Modal>
    </Layout>
  );
}

// Renderizar la aplicación
ReactDOM.render(<App />, document.getElementById('root'));

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch((error) => {
        console.log('Error al registrar el Service Worker:', error);
      });
  });
}

