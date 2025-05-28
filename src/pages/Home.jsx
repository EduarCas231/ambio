import React, { useEffect } from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';
import NavBar from '../navigation/NavBar';
import { initScrollAnimations } from '../components/scrollAnimations';
import '../styles/Home.css';

// Import images
import teamImage from '../assets/ruido.jpeg';
import waterAnalysisImage from '../assets/Lab-MECC.jpg';
import pressureVesselImage from '../assets/images.jpeg';
import ambien from '../assets/ambien.png';

// Hero Video Background component
<video autoPlay muted loop playsInline controls style={{ width: '100%' }}>
  <source src="/esop.mp4" type="video/mp4" />
  Tu navegador no soporta el video.
</video>


// Hero Content component
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
      <div className="arrow-down"></div>
    </div>
  </div>
);

// Feature and Service data
const FEATURES = [
  {
    title: "Experiencia y Confiabilidad",
    text: "Con una trayectoria comprobada y un equipo altamente capacitado.",
    icon: "✓"
  },
  {
    title: "Tecnología Avanzada",
    text: "Utilizamos los equipos y técnicas más avanzadas para asegurar la precisión.",
    icon: "⚙️"
  },
  {
    title: "Atención Personalizada",
    text: "Servicio al cliente excepcional, adaptándonos a necesidades específicas.",
    icon: "👥"
  },
  {
    title: "Cumplimiento Normativo",
    text: "Cumplimos con regulaciones ambientales locales, nacionales e internacionales.",
    icon: "📋"
  }
];

const SERVICES = [
  {
    title: "Muestreo y Análisis de Agua",
    image: waterAnalysisImage,
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
    image: pressureVesselImage,
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
    image: ambien,
    items: [
      "<strong>Ruido Laboral</strong> - NOM 011 STPS 2001",
      "<strong>Condiciones Térmicas Extremas</strong> - NOM 015 STPS 2001",
      "<strong>Electricidad Estática</strong> - NOM 022 STPS 2015",
      "<strong>Condiciones de Iluminación</strong> - NOM 025 STPS 2008"
    ]
  }
];

// Feature Card component
const FeatureCard = ({ feature, index }) => (
  <Grid 
    item 
    xs={12} 
    md={6} 
    lg={3} 
    key={index} 
    data-aos="fade-up" 
    data-aos-delay={index * 100}
    sx={{ mb: { xs: 3, md: 0 } }}
  >
    <div className="feature-card">
      <div className="feature-icon">{feature.icon}</div>
      <Typography variant="h6" className="feature-card-title">
        {feature.title}
      </Typography>
      <Typography variant="body2" className="feature-card-text">
        {feature.text}
      </Typography>
    </div>
  </Grid>
);

// Service Card component
const ServiceCard = ({ service, index }) => (
  <Grid 
    item 
    xs={12} 
    md={6} 
    key={index} 
    data-aos="fade-up" 
    data-aos-delay={index % 2 * 100}
    sx={{ mb: 4 }}
  >
    <div className="service-card">
      {service.image && (
        <div 
          className="service-card-image"
          style={{ backgroundImage: `url(${service.image})` }}
        />
      )}
      <div className="service-card-content">
        <Typography variant="h5" component="h3" className="service-title">
          {service.title}
        </Typography>
        <ul className="service-list">
          {service.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      </div>
    </div>
  </Grid>
);

// Main Home component
const Home = () => {
  useEffect(() => {
    initScrollAnimations();
  }, []);

  return (
    <div className="home-container">
      <NavBar />
      
      <section className="hero-section">
        <HeroVideoBackground />
        <HeroContent />
      </section>
      
      <Box sx={{ 
        maxWidth: 1200, 
        margin: 'auto', 
        padding: { xs: 3, md: 6 },
        '& section': {
          marginBottom: '6rem',
          '&:last-child': {
            marginBottom: '3rem'
          }
        }
      }}>
        {/* About Section */}
        <section className="about-section scroll-animate">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} data-aos="fade-left">
              <Typography variant="h4" gutterBottom className="section-title" sx={{ mb: 4 }}>
                Sobre Nosotros
              </Typography>
              <Typography paragraph className="section-text" sx={{ mb: 3 }}>
                En Ambiolab, nos dedicamos a ofrecer soluciones precisas y confiables 
                en el campo del análisis ambiental. Nuestro equipo de expertos trabaja 
                incansablemente para asegurar que nuestros clientes obtengan datos 
                exactos y útiles.
              </Typography>
              <Typography paragraph className="section-text">
                Utilizamos tecnología de punta y métodos analíticos avanzados para 
                garantizar la máxima precisión en nuestros resultados.
              </Typography>
            </Grid>
          </Grid>
        </section>

        <Divider sx={{ 
          my: 8, 
          backgroundColor: '#dd6b20', 
          height: '2px',
          background: 'linear-gradient(to right, transparent, #dd6b20, transparent)'
        }} />

        {/* Why Us Section */}
        <section className="why-us-section scroll-animate">
          <Typography variant="h4" gutterBottom className="section-title" data-aos="fade-up" sx={{ mb: 6 }}>
            ¿Por qué elegirnos?
          </Typography>
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {FEATURES.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </Grid>
        </section>

        <Divider sx={{ my: 8, height: '2px', background: 'linear-gradient(to right, transparent, #dd6b20, transparent)' }} />

        {/* Services Section */}
        <section className="services-section scroll-animate">
          <Typography variant="h4" gutterBottom className="section-title" data-aos="fade-up" sx={{ mb: 6 }}>
            Nuestros Servicios
          </Typography>
          <Grid container spacing={4}>
            {SERVICES.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </Grid>
        </section>

        <Divider sx={{ my: 8, height: '2px', background: 'linear-gradient(to right, transparent, #dd6b20, transparent)' }} />

        {/* Team Section */}
        <section className="team-section scroll-animate">
          <Typography variant="h4" gutterBottom className="section-title" sx={{ mb: 6 }}>
            Nuestro Equipo
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} data-aos="fade-right">
              <Typography paragraph className="section-text" sx={{ mb: 3 }}>
                Contamos con un equipo multidisciplinario de profesionales 
                altamente capacitados y certificados.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} data-aos="fade-left">
              <img 
                src={teamImage} 
                alt="Equipo Ambiolab" 
                className="team-image"
                style={{ width: '50%', borderRadius: '8px', boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              />
            </Grid>
          </Grid>
        </section>

        {/* Privacy Section */}
        <section className="privacy-section scroll-animate">
          <Typography variant="h4" gutterBottom className="section-title" data-aos="fade-up" sx={{ mb: 6 }}>
            Aviso de Privacidad
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} data-aos="fade-up">
              <div className="privacy-card">
                <Typography variant="h5" className="privacy-subtitle">
                  Datos personales que recabamos y protegemos:
                </Typography>
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
                <Typography variant="h5" className="privacy-subtitle">
                  Finalidades del uso de sus datos:
                </Typography>
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
            <Typography variant="h5" className="privacy-subtitle">
              Derechos ARCO:
            </Typography>
            <Typography paragraph className="section-text">
              Usted puede acceder, rectificar, cancelar u oponerse al tratamiento de sus datos enviando su solicitud a <a href="mailto:contacto@ambiolab.mx" className="contact-link">contacto@ambiolab.mx</a> o llamando al <a href="tel:7229382338" className="contact-link">722 938 2338</a>.
            </Typography>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer scroll-animate" data-aos="fade-up">
          <Typography variant="body2" className="copyright">
            © Ambiolab – Derechos Reservados {new Date().getFullYear()}
          </Typography>
        </footer>
      </Box>
    </div>
  );
};

export default Home;
