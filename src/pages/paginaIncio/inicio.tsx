import React from 'react';
import { Carousel } from 'antd';
import ahorro3 from '../../assets/imagenes/inicio3.jpg';
import ahorro2 from '../../assets/imagenes/inicio2.jpg';
import ahorro1 from '../../assets/imagenes/inicio1.jpeg';

const InicioApp: React.FC = () => {
  const images = [
    ahorro1,
    ahorro2,
    ahorro3,
  ];

  return (
    <>
      <div  className="container mt-5" style={{ textAlign: 'center', color: 'white' }}>
        <div style={{ marginBottom: '50px' }}>
          <h1>¡Bienvenido a tu aplicación de control de Gastos!</h1>
          <p>
            Somos una plataforma diseñada para ayudarte a administrar y controlar tus gastos de manera eficiente.
            Registra tus ingresos y gastos, establece presupuestos, y mantén un seguimiento de tus finanzas personales de manera sencilla.
          </p>
        </div>
        <Carousel autoplay style={{ width: '30%', margin: '0 auto' }}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Imagen ${index + 1}`} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            </div>
          ))}
        </Carousel>

        <div style={{ marginTop: '50px' }}>
          <h2>Sobre nosotros</h2>
          <p>
            Somos un equipo comprometido en ofrecerte la mejor experiencia para el control de tus gastos.
            Nuestra aplicación está diseñada pensando en ti, para que puedas gestionar tus finanzas de manera fácil y segura.
            ¡Únete a nosotros y toma el control de tu dinero hoy mismo!
          </p>
        </div>
      </div>
    </>
  );
};

export default InicioApp;
