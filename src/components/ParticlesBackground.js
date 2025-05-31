import React, { useEffect } from 'react';

const ParticlesBackground = () => {
  useEffect(() => {
    const initParticles = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.9, random: false },  // más blancas
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.3,  // más visible
              width: 1
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              out_mode: "out"
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: false },
              onclick: { enable: false }
            }
          },
          retina_detect: true
        });
      }
    };

    const loadParticlesJS = () => {
      if (!window.particlesJS) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = initParticles;
        document.body.appendChild(script);
      } else {
        initParticles();
      }
    };

    loadParticlesJS();

    return () => {
      const canvas = document.querySelector("#particles-js > canvas");
      if (canvas) canvas.remove();
    };
  }, []);

  return (
    <div
      id="particles-js"
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: -1,
        top: 0,
        left: 0,
        background: 'linear-gradient(to bottom, #0a0a0a, #0f0f0f)', // más oscuro
      }}
    />
  );
};

export default ParticlesBackground;
