import React from 'react';

const AmbiolabLogo = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="ambiolab-logo">
        {/* Contenedor de los círculos en formación piramidal */}
        <div className="circles-container">
          {/* Círculo superior - Viento/Aire (Azul) */}
          <div className="circle circle-wind circle-top">
            <div className="wind-container">
              <svg viewBox="0 0 60 40" className="wind-svg">
                <path className="wind-curve wind-curve-1" d="M5,15 C15,5 25,25 35,15 C45,5 55,25 55,15" />
                <path className="wind-curve wind-curve-2" d="M0,25 C10,15 20,35 30,25 C40,15 50,35 60,25" />
              </svg>
            </div>
          </div>
          
          {/* Fila inferior */}
          <div className="bottom-row">
            {/* Círculo izquierdo - Casco con Rectángulo (Verde) */}
            <div className="circle circle-helmet">
              <div className="helmet-container">
                <svg viewBox="0 0 60 60" className="helmet-svg">
                  {/* Cúpula del casco - línea curva superior */}
                  <path 
                    className="helmet-dome"
                    d="M10,42 C10,24 16,18 30,18 C44,18 50,24 50,42"
                    fill="none"
                    stroke="#7BC67B"
                    strokeWidth="2.5"
                  />
                  
                  {/* Rectángulo vertical conectando la cúpula con la visera */}
                  <rect 
                    className="helmet-body"
                    x="26" 
                    y="18" 
                    width="8" 
                    height="20"
                    fill="none"
                    stroke="#7BC67B"
                    strokeWidth="2"
                  />
                  
                  {/* Ala/visera del casco */}
                  <ellipse 
                    className="helmet-brim"
                    cx="30" 
                    cy="42" 
                    rx="20" 
                    ry="4"
                    fill="none"
                    stroke="#7BC67B"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
            
            {/* Círculo derecho - Rectángulo Industrial Simple (Naranja) */}
            <div className="circle circle-chimney">
              <div className="chimney-container">
                <svg viewBox="0 0 60 60" className="chimney-svg">
                  {/* Rectángulo principal largo y simple */}
                  <rect 
                    className="chimney-main"
                    x="22" 
                    y="10" 
                    width="16" 
                    height="40"
                    fill="none"
                    stroke="#FF8C42"
                    strokeWidth="2.5"
                  />
                </svg>
                
                {/* Vapor como cuadros con solo líneas */}
                <div className="vapor-container">
                  <div className="vapor-square vapor-1"></div>
                  <div className="vapor-square vapor-2"></div>
                  <div className="vapor-square vapor-3"></div>
                  <div className="vapor-square vapor-4"></div>
                  <div className="vapor-square vapor-5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Texto AMBIOLAB con animación sutil */}
        <div className="logo-text">
          AMBIOLAB
        </div>
        
        {/* Línea decorativa */}
        <div className="decorative-line"></div>
        
        <style jsx>{`
          .ambiolab-logo {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: 'Arial', sans-serif;
          }
          
          .circles-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            margin-bottom: 25px;
          }
          
          .bottom-row {
            display: flex;
            gap: 60px;
            align-items: center;
          }
          
          .circle {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            border: 3px solid;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background: rgba(255, 255, 255, 0.95);
            animation: circleFloat 4s ease-in-out infinite;
            overflow: visible;
          }
          
          .circle-wind {
            border-color: #6B8FE8;
            animation-delay: 0s;
          }
          
          .circle-helmet {
            border-color: #7BC67B;
            animation-delay: 1s;
          }
          
          .circle-chimney {
            border-color: #FF8C42;
            animation-delay: 2s;
          }
          
          @keyframes circleFloat {
            0%, 100% {
              transform: translateY(0px) scale(1);
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            50% {
              transform: translateY(-8px) scale(1.02);
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            }
          }
          
          /* Viento/Aire - Curvas SVG */
          .wind-container {
            width: 60px;
            height: 40px;
            position: relative;
          }
          
          .wind-svg {
            width: 100%;
            height: 100%;
          }
          
          .wind-curve {
            fill: none;
            stroke: #6B8FE8;
            stroke-width: 2;
            stroke-linecap: round;
            animation: windFlow 3s linear infinite;
          }
          
          .wind-curve-1 {
            animation-delay: 0s;
          }
          
          .wind-curve-2 {
            animation-delay: 0.5s;
            stroke-width: 1.5;
            opacity: 0.7;
          }
          
          @keyframes windFlow {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          
          /* CASCO CON RECTÁNGULO CONECTANDO */
          .helmet-container {
            position: relative;
            width: 60px;
            height: 60px;
          }
          
          .helmet-svg {
            width: 100%;
            height: 100%;
          }
          
          .helmet-dome {
            animation: helmetPulse 3s ease-in-out infinite;
          }
          
          .helmet-body {
            animation: helmetPulse 3s ease-in-out infinite 0.3s;
          }
          
          .helmet-brim {
            animation: helmetPulse 3s ease-in-out infinite 0.5s;
          }
          
          @keyframes helmetPulse {
            0%, 100% {
              stroke-opacity: 0.8;
            }
            50% {
              stroke-opacity: 1;
              stroke-width: 3;
            }
          }
          
          /* RECTÁNGULO INDUSTRIAL SIMPLE - SOLO LÍNEAS */
          .chimney-container {
            position: relative;
            width: 60px;
            height: 60px;
          }
          
          .chimney-svg {
            width: 100%;
            height: 100%;
          }
          
          .chimney-main {
            animation: chimneyPulse 4s ease-in-out infinite;
          }
          
          @keyframes chimneyPulse {
            0%, 100% {
              stroke-opacity: 0.8;
            }
            50% {
              stroke-opacity: 1;
              stroke-width: 3;
            }
          }
          
          /* VAPOR COMO CUADROS CON SOLO LÍNEAS */
          .vapor-container {
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 35px;
          }
          
          .vapor-square {
            position: absolute;
            width: 8px;
            height: 8px;
            border: 1.5px solid #FF8C42;
            border-radius: 1px;
            animation: vaporFloat 4s ease-out infinite;
          }
          
          .vapor-1 {
            top: 20px;
            left: 16px;
            animation-delay: 0s;
          }
          
          .vapor-2 {
            top: 15px;
            left: 10px;
            animation-delay: 0.8s;
          }
          
          .vapor-3 {
            top: 10px;
            left: 22px;
            animation-delay: 1.6s;
          }
          
          .vapor-4 {
            top: 5px;
            left: 14px;
            animation-delay: 2.4s;
          }
          
          .vapor-5 {
            top: 0px;
            left: 18px;
            animation-delay: 3.2s;
          }
          
          @keyframes vaporFloat {
            0% {
              opacity: 0;
              transform: translateY(0) scale(0.5) rotate(0deg);
            }
            20% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translateY(-40px) scale(1.2) rotate(180deg);
            }
          }
          
          /* Texto AMBIOLAB con animación sutil */
          .logo-text {
            font-size: 32px;
            font-weight: bold;
            color: rgb(36, 38, 41);
            letter-spacing: 1.5px;
            margin-bottom: 15px;
            font-family: 'Arial', sans-serif;
            opacity: 0;
            animation: fadeScaleIn 0.6s ease forwards;
          }
          
          @keyframes fadeScaleIn {
            0% {
              opacity: 0;
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          /* Línea decorativa con animación rápida */
          .decorative-line {
            width: 0;
            height: 3px;
            background: linear-gradient(90deg, #ff8c42 0%, #7BC67B 50%, #6b8fe8 100%);
            border-radius: 2px;
            animation: lineExpand 0.5s ease-out forwards;
            animation-delay: 0.6s;
          }
          
          @keyframes lineExpand {
            to {
              width: 200px;
            }
          }
          
          /* Efectos hover */
          .ambiolab-logo:hover .circle {
            animation-duration: 2s;
          }
          
          .ambiolab-logo:hover .wind-curve {
            animation-duration: 1.5s;
          }
          
          .ambiolab-logo:hover .vapor-square {
            animation-duration: 2.5s;
          }
          
          .ambiolab-logo:hover .helmet-dome,
          .ambiolab-logo:hover .helmet-body,
          .ambiolab-logo:hover .helmet-brim {
            animation-duration: 1.5s;
          }
          
          .ambiolab-logo:hover .logo-text {
            color: #2D3748;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }
          
          .ambiolab-logo:hover .decorative-line {
            box-shadow: 0 0 15px rgba(107, 143, 232, 0.4);
            transition: box-shadow 0.3s ease;
          }
        `}</style>
      </div>
    </div>
  );
};

export default AmbiolabLogo;
