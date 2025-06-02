import React, { useEffect } from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';
import NavBar from '../navigation/NavBar';
import { initScrollAnimations } from '../components/scrollAnimations';
import ParticlesBackground from '../components/ParticlesBackground';
import '../styles/Home.css';

// Data constants
const FEATURES = [
  { title: "Experiencia y Confiabilidad", text: "Con una trayectoria comprobada y un equipo altamente capacitado.", icon: "✓" },
  { title: "Tecnología Avanzada", text: "Utilizamos los equipos y técnicas más avanzadas para asegurar la precisión.", icon: "⚙️" },
  { title: "Atención Personalizada", text: "Servicio al cliente excepcional, adaptándonos a necesidades específicas.", icon: "👥" },
  { title: "Cumplimiento Normativo", text: "Cumplimos con regulaciones ambientales locales, nacionales e internacionales.", icon: "📋" }
];

const SERVICES = [
  {
    title: "Muestreo y Análisis de Agua",
    items: [
      "<strong>Toma de muestras en sitio</strong> - NOM-230-SSA1-2002",
      "<strong>Agua para uso y consumo humano</strong> - NOM-127-SSA1-2021",
      "<strong>Aguas Residuales</strong>",
      "NOM-001-SEMARNAT-2021",
      "NOM-002-SEMARNAT-1996",
      "NOM-003-SEMARNAT-1997"
    ]
  },
  {
    title: "Recipientes Sujetos a Presión",
    items: [
      "NOM 020 STPS 2011",
      "Ensayos no destructivos",
      "Elaboración de expediente",
      "Dictamen de verificación",
      "Autorización STPS"
    ]
  },
  {
    title: "Análisis de Ambiente Laboral",
    items: [
      "<strong>Ruido Laboral</strong> - NOM 011 STPS 2001",
      "<strong>Condiciones Térmicas Extremas</strong> - NOM 015 STPS 2001",
      "<strong>Electricidad Estática</strong> - NOM 022 STPS 2015",
      "<strong>Condiciones de Iluminación</strong> - NOM 025 STPS 2008"
    ]
  }
];

const HeroContent = () => (
  <div className="hero-overlay">
    <Typography variant="h2" component="h1" className="hero-title">
      Soluciones Ambientales Integrales
    </Typography>
    <Typography variant="h5" className="hero-subtitle">
      Precisión • Confiabilidad • Innovación
    </Typography>
    <div className="scroll-indicator">
      <div className="mouse">
        <div className="wheel"></div>
      </div>
      <div className="arrow-downst">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M12 19l7-7M12 19l-7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</div>

    </div>
  </div>  
);

const FeatureCard = ({ feature, index }) => (
  <Grid item xs={12} md={6} lg={3} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
    <div className="feature-card">
      <div className="feature-icon">{feature.icon}</div>
      <Typography variant="h6" className="feature-card-title">{feature.title}</Typography>
      <Typography variant="body2" className="feature-card-text">{feature.text}</Typography>
    </div>
  </Grid>
);

const ServiceCard = ({ service, index }) => (
  <Grid item xs={12} md={6} key={index} data-aos="fade-up" data-aos-delay={index % 2 * 100}>
    <div className="service-card">
      <div className="service-card-content">
        <Typography variant="h5" component="h3" className="service-title">{service.title}</Typography>
        <ul className="service-list">
          {service.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      </div>
    </div>
  </Grid>
);

const Home = () => {
  useEffect(() => {
    initScrollAnimations();
  }, []);

  return (
    <div className="home-container">
      <ParticlesBackground />
      <NavBar />

      <section className="hero-section" style={{ height: '100vh', position: 'relative' }}>
        <HeroContent />
      </section>

      <section className="about-section section scroll-animate">
        <Typography variant="h4" component="h2" gutterBottom className="section-title" data-aos="fade-up">Sobre Nosotros</Typography>
        <Typography paragraph className="section-text" data-aos="fade-up">
          En Ambiolab, nos dedicamos a ofrecer soluciones precisas y confiables en el campo del análisis ambiental. Nuestro equipo de expertos trabaja incansablemente para asegurar que nuestros clientes obtengan datos exactos y útiles.
        </Typography>
        <Typography paragraph className="section-text" data-aos="fade-up">
          Utilizamos tecnología de punta y métodos analíticos avanzados para garantizar la máxima precisión en nuestros resultados.
        </Typography>
      </section>

      <section className="why-us-section section scroll-animate">
        <Typography variant="h4" component="h2" gutterBottom className="section-title" data-aos="fade-up">¿Por qué elegirnos?</Typography>
        <Grid container spacing={4}>
          {FEATURES.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </Grid>
      </section>

      <section className="services-section section scroll-animate">
        <Typography variant="h4" component="h2" gutterBottom className="section-title" data-aos="fade-up">Nuestros Servicios</Typography>
        <Grid container spacing={4}>
          {SERVICES.map((service, index) => (
          
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </Grid>
      </section>

      <section className="team-section section scroll-animate">
        <Typography variant="h4" component="h2" gutterBottom className="section-title" data-aos="fade-up">Nuestro Equipo</Typography>
        <Typography paragraph className="section-text" data-aos="fade-up">
          Contamos con un equipo multidisciplinario de profesionales altamente capacitados y certificados.
        </Typography>
      </section>

      <section className="privacy-section section scroll-animate">
        <Typography variant="h4" component="h2" gutterBottom className="section-title" data-aos="fade-up">Aviso de Privacidad</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} data-aos="fade-up">
            <div className="privacy-card">
              <Typography variant="h5" component="h3" className="privacy-subtitle">Datos personales que recabamos y protegemos:</Typography>
              <ul className="privacy-list">
                <li>Nombre, dirección, fecha y lugar de nacimiento</li>
                <li>Estado civil, ocupación, comprobantes de domicilio</li>
                <li>Correo electrónico y número telefónico</li>
                <li>Datos patrimoniales y documentos oficiales</li>
              </ul>
            </div>
          </Grid>

          <Grid item xs={12} md={6} data-aos="fade-up" data-aos-delay="100">
            <div className="privacy-card">
              <Typography variant="h5" component="h3" className="privacy-subtitle">Finalidades del uso de sus datos:</Typography>
              <ul className="privacy-list">
                <li>Confirmar su identidad</li>
                <li>Entender y atender necesidades legales</li>
                <li>Cumplir requerimientos legales</li>
                <li>Verificar la información proporcionada</li>
              </ul>
            </div>
          </Grid>
        </Grid>

        <div className="contact-card scroll-animate" data-aos="fade-up" style={{ marginTop: '4rem' }}>
          <Typography variant="h5" component="h3" className="privacy-subtitle">Derechos ARCO:</Typography>
          <Typography paragraph className="section-text">
            Usted puede acceder, rectificar, cancelar u oponerse al tratamiento de sus datos enviando su solicitud a <a href="mailto:contacto@ambiolab.mx" className="contact-link">contacto@ambiolab.mx</a> o llamando al <a href="tel:7229382338" className="contact-link">722 938 2338</a>.
          </Typography>
        </div>
      </section>

      <footer className="footer scroll-animate" data-aos="fade-up">
        <Typography variant="body2" className="copyright">
          © Ambiolab – Derechos Reservados {new Date().getFullYear()}
        </Typography>
      </footer>
    </div>
  );
};

export default Home;
