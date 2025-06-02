import React, { useState, useEffect, useRef } from 'react';
import '../styles/NormaAutocomplete.css';

const NormaAutocomplete = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const wrapperRef = useRef(null);
  const modalRef = useRef(null);

  // Base de datos de normas organizadas por categorías
  const normasDB = {
    "AGUAS POTABLE - MUESTREO": {
      "NOM-230-SSA1-2002": {
        "Tabla 1 - Especificaciones sanitarias físicas": [
          "Turbiedad - STANDARD METHODS 2130 24TH ED. 2023",
          "Ph - STANDARD METHODS 4500-H⁺ 24TH ED. 2023",
          "Color verdadero - STANDARD METHODS 2120 24TH ED. 2023"
        ],
        "Tabla 2 - Especificaciones sanitarias químicas": [
          "Cianuros totales - STANDARD METHODS 4500 CN¯E 24TH ED. 2023",
          "Dureza total como CaCO3 - STANDARD METHODS 2340 24TH ED. 2023",
          "Fluoruros - STANDARD METHODS 4500 F 24TH ED. 2023",
          "Nitrógeno amoniacal - STANDARD METHODS 4500-NH3 24TH ED. 2023",
          "Nitrógeno de nitratos - NMX-AA-079-SCFI-2001 / STANDARD METHODS 4500-NO3¯ 24TH ED. 2023",
          "Nitrógeno de nitritos - STANDARD METHODS 4500-NO2¯ 24TH ED. 2023",
          "Sólidos disueltos totales - STANDARD METHODS 2540 24TH ED. 2023",
          "Sulfatos - STANDARD METHODS 4500-SO4¯² 24TH ED. 2023",
          "Sustancias Activas al azul de metileno - STANDARD METHODS 5540 24TH ED. 2023"
        ],
        "Tabla 4 - Especificaciones sanitarias de metales y metaloides": [
          "Arsénico - NMX-AA-131/1-SCFI-2021",
          "Bario",
          "Aluminio",
          "Cadmio",
          "Cobre",
          "Cromo total",
          "Hierro",
          "Manganeso",
          "Níquel",
          "Plomo",
          "Selenio",
          "MERCURIO"
        ],
        "Tabla 9 - Especificaciones sanitarias de residuales de la desinfección": [
          "Cloro residual libre - STANDARD METHODS 4500-Cl 24TH ED. 2023 / NOM-201-SSA1-2015 A.3.10",
          "Yodo residual libre - STANDARD METHODS 4500-I 24TH ED. 2023",
          "Plata total - NMX-AA-131/1-SCFI-2021"
        ]
      }
    },
    "AGUA RESIDUAL NOM-001-SEMARNAT-2021 Y NOM-001-SEMARNAT-1996": {
      "MUESTREO": [
        "AGUAS RESIDUALES - MUESTREO - NMX-AA-003-1980",
        "CUERPOS RECEPTORES - MUESTREO - NMX-AA-014-1980"
      ],
      "CONTAMINANTES BÁSICOS": [
        "TEMPERATURA - NMX-AA-007-SCFI-2013",
        "PH - NMX-AA-008-SCFI-2016",
        "MATERIA FLOTANTE - NMX-AA-006-SCFI-2010",
        "CONDUCTIVIDAD - NMX-AA-093-SCFI-2018",
        "NITRATOS - NMX-AA-079-SCFI-2001",
        "NITRITOS - NMX-AA-099-SCFI-2021",
        "NITRÓGENO TOTAL KJELDAHL - NMX-AA-026-SCFI-2010",
        "SÓLIDOS SUSPENDIDOS TOTALES - NMX-AA-034-SCFI-2015",
        "SÓLIDOS SEDIMENTABLES - NMX-AA-004-SCFI-2013",
        "FOSFORO TOTAL - NMX-AA-029-SCFI-2001",
        "GRASAS Y ACEITES - NMX-AA-005-SCFI-2013",
        "DEMANDA BIOQUIMICA DE OXÍGENO - NMX-AA-028-SCFI-2021",
        "COLOR VERDADERO - NMX-AA-017-SCFI-2021",
        "DEMANDA QUIMICA DE OXÍGENO - NMX-AA-030/2-SCFI-2011",
        "CLORUROS - NMX-AA-073-SCFI-2001",
        "CARBONO ORGÁNICO TOTAL - (NMX-AA-187-SCFI-2021)",
        "HUEVOS DE HELMINTO - NMX-AA-113-SCFI-2012",
        "E. COLI - NMX-AA-042-SCFI-2015",
        "COLIFORMES FECALES - NMX-AA-042-SCFI-2015",
        "ENTEROCOCOS FECALES - NMX-AA-120-SCFI-2016 / NMX-AA-167-SCFI-2017",
        "TOXICIDAD AGUDA (VIBRIO FISHERI) - NMX-AA-112-SCFI-2017"
      ],
      "METALES Y METALOIDES": [
        "CIANURO - NMX-AA-058-SCFI-2001",
        "ARSÉNICO - NMX-AA-131/1-SCFI-2021",
        "CADMIO - NMX-AA-131/1-SCFI-2021",
        "COBRE - NMX-AA-131/1-SCFI-2021",
        "CROMO - NMX-AA-131/1-SCFI-2021",
        "NIQUEL - NMX-AA-131/1-SCFI-2021",
        "PLOMO - NMX-AA-131/1-SCFI-2021",
        "ZINC - NMX-AA-131/1-SCFI-2021",
        "MERCURIO - NMX-AA-131/1-SCFI-2021"
      ]
    },
    "AGUA RESIDUAL NOM-002-SEMARNAT-1996": {
      "MUESTREO": [
        "AGUAS RESIDUALES - MUESTREO - NMX-AA-003-1980"
      ],
      "CONTAMINANTES BÁSICOS": [
        "TEMPERATURA - NMX-AA-007-SCFI-2013",
        "PH - NMX-AA-008-SCFI-2016",
        "MATERIA FLOTANTE - NMX-AA-006-SCFI-2010",
        "CONDUCTIVIDAD - NMX-AA-093-SCFI-2018",
        "SÓLIDOS SUSPENDIDOS TOTALES - NMX-AA-034-SCFI-2015",
        "SÓLIDOS SEDIMENTABLES - NMX-AA-004-SCFI-2013",
        "GRASAS Y ACEITES - NMX-AA-005-SCFI-2013",
        "DEMANDA BIOQUIMICA DE OXÍGENO - NMX-AA-028-SCFI-2021",
        "DEMANDA QUIMICA DE OXÍGENO - NMX-AA-030/2-SCFI-2011"
      ],
      "METALES Y METALOIDES": [
        "CIANURO - NMX-AA-058-SCFI-2001",
        "ARSÉNICO - NMX-AA-131/1-SCFI-2021",
        "CADMIO - NMX-AA-131/1-SCFI-2021",
        "COBRE - NMX-AA-131/1-SCFI-2021",
        "NIQUEL - NMX-AA-131/1-SCFI-2021",
        "PLOMO - NMX-AA-131/1-SCFI-2021",
        "ZINC - NMX-AA-131/1-SCFI-2021",
        "MERCURIO - NMX-AA-131/1-SCFI-2021",
        "CROMO HEXAVALENTE - NMX-AA-044-SCFI-2014"
      ]
    },
    "AGUA RESIDUAL NOM-003-SEMARNAT-1996": {
      "MUESTREO": [
        "AGUAS RESIDUALES - MUESTREO - NMX-AA-003-1980",
        "CUERPOS RECEPTORES - MUESTREO - NMX-AA-014-1980"
      ],
      "CONTAMINANTES BÁSICOS": [
        "TEMPERATURA - NMX-AA-007-SCFI-2013",
        "PH - NMX-AA-008-SCFI-2016",
        "MATERIA FLOTANTE - NMX-AA-006-SCFI-2010",
        "CONDUCTIVIDAD - NMX-AA-093-SCFI-2018",
        "SÓLIDOS SUSPENDIDOS TOTALES - NMX-AA-034-SCFI-2015",
        "GRASAS Y ACEITES - NMX-AA-005-SCFI-2013",
        "DEMANDA BIOQUIMICA DE OXÍGENO - NMX-AA-028-SCFI-2021",
        "DEMANDA QUIMICA DE OXÍGENO - NMX-AA-030/2-SCFI-2011",
        "HUEVOS DE HELMINTO - NMX-AA-113-SCFI-2012",
        "COLIFORMES FECALES Y TOTALES - NMX-AA-042-SCFI-2015"
      ],
      "METALES Y METALOIDES": [
        "CIANURO - NMX-AA-058-SCFI-2001",
        "ARSÉNICO - NMX-AA-131/1-SCFI-2021",
        "CADMIO - NMX-AA-131/1-SCFI-2021",
        "COBRE - NMX-AA-131/1-SCFI-2021",
        "CROMO - NMX-AA-131/1-SCFI-2021",
        "NIQUEL - NMX-AA-131/1-SCFI-2021",
        "PLOMO - NMX-AA-131/1-SCFI-2021",
        "ZINC - NMX-AA-131/1-SCFI-2021",
        "MERCURIO - NMX-AA-131/1-SCFI-2021"
      ]
    },
    "AGUA CONGÉNITA": {
      "MUESTREO": [
        "AGUAS CONGÉNITAS - MUESTREO - MÉTODO INTERNO"
      ],
      "CROMATOGRAFICOS": [
        "GASOLINA RANGO ORGÁNICO (HFL) - EPA 8015D 2003",
        "DIÉSEL RANGO ORGÁNICO (HFM) - EPA 8015D 2003"
      ],
      "FISICOQUÍMICOS": [
        "HIDROCARBUROS DE FRACCIÓN PESADA (HFP) - EPA METHOD 1664B 2010",
        "SOLIDOS DISUELTOS TOTALES - NOM-143-SEMARNAT-2003 ANEXO 2"
      ]
    },
    "AMBIENTE LABORAL": {
      "AMBIENTE LABORAL": [
        "Iluminación - NOM-025-STPS-2008",
        "Ruido laboral SONOMETRÍA - NOM-011-STPS-2001",
        "Ruido laboral DOSIMETRÍA - NOM-011-STPS-2001",
        "Tierras físicas (CONTINUIDAD) - NOM-022-STPS-2015",
        "Tierras físicas (ESTUDIO) - NOM-022-STPS-2015",
        "Condiciones térmicas (Elevadas) - NOM-015-STPS-2001",
        "Condiciones térmicas (Abatidas) - NOM-015-STPS-2001"
      ]
    }
  };

  // Función para aplanar la estructura jerárquica en una lista de sugerencias
  const getAllSuggestions = () => {
    const suggestions = [];
    
    // Recorrer categorías principales
    Object.entries(normasDB).forEach(([categoria, contenido]) => {
      suggestions.push(categoria);
      
      // Recorrer subcategorías o normas
      Object.entries(contenido).forEach(([subcategoria, items]) => {
        if (typeof items === 'object' && !Array.isArray(items)) {
          // Es un objeto con más niveles
          suggestions.push(`${categoria} - ${subcategoria}`);
          
          // Recorrer tablas o secciones
          Object.entries(items).forEach(([tabla, parametros]) => {
            suggestions.push(`${categoria} - ${subcategoria} - ${tabla}`);
            
            // Recorrer parámetros individuales
            parametros.forEach(parametro => {
              suggestions.push(`${parametro}`);
            });
          });
        } else if (Array.isArray(items)) {
          // Es un array de items
          suggestions.push(`${categoria} - ${subcategoria}`);
          items.forEach(item => {
            suggestions.push(`${item}`);
          });
        }
      });
    });
    
    return suggestions;
  };

  // Filtrar sugerencias basadas en el input
  const filterSuggestions = (input) => {
    const allSuggestions = getAllSuggestions();
    const filtered = allSuggestions.filter(
      suggestion => suggestion.toLowerCase().includes(input.toLowerCase())
    );
    return filtered.slice(0, 10); // Limitar a 10 sugerencias para mejor rendimiento
  };

  // Actualizar sugerencias cuando cambia el input
  useEffect(() => {
    if (inputValue.length > 0) {
      setFilteredSuggestions(filterSuggestions(inputValue));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue]);

  // Manejar clic fuera del componente para cerrar sugerencias
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target) && event.target.className !== 'browse-button') {
        setShowModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Manejar cambio en el input
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange({ target: { name: 'norma', value: e.target.value } });
  };

  // Manejar selección de sugerencia
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    onChange({ target: { name: 'norma', value: suggestion } });
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  // Manejar navegación con teclado
  const handleKeyDown = (e) => {
    // Flecha abajo
    if (e.keyCode === 40 && showSuggestions) {
      e.preventDefault();
      setActiveIndex(prevIndex => 
        prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
    // Flecha arriba
    else if (e.keyCode === 38 && showSuggestions) {
      e.preventDefault();
      setActiveIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : 0);
    }
    // Enter
    else if (e.keyCode === 13 && activeIndex > -1) {
      e.preventDefault();
      handleSuggestionClick(filteredSuggestions[activeIndex]);
    }
    // Escape
    else if (e.keyCode === 27) {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  // Abrir modal de navegación
  const openBrowseModal = () => {
    setShowModal(true);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  // Seleccionar categoría en el modal
  const selectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  // Seleccionar subcategoría en el modal
  const selectSubcategory = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  // Seleccionar norma final del modal
  const selectNorma = (norma) => {
    setInputValue(norma);
    onChange({ target: { name: 'norma', value: norma } });
    setShowModal(false);
  };

  return (
    <div className="autocomplete-container">
      <div className="autocomplete-wrapper" ref={wrapperRef}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue && setShowSuggestions(true)}
          placeholder="Buscar norma o parámetro..."
          className="autocomplete-input"
          name="norma"
        />
        <button 
          type="button" 
          className="browse-button"
          onClick={openBrowseModal}
        >
          Explorar
        </button>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className={index === activeIndex ? 'suggestion-item active' : 'suggestion-item'}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="normas-modal" ref={modalRef}>
            <div className="modal-header">
              <h3>Seleccionar Norma</h3>
              <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-content">
              {!selectedCategory ? (
                <div className="category-list">
                  <h4>Categorías</h4>
                  <ul>
                    {Object.keys(normasDB).map((category, index) => (
                      <li key={index} onClick={() => selectCategory(category)}>
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : !selectedSubcategory ? (
                <div className="subcategory-list">
                  <div className="modal-breadcrumb">
                    <span onClick={() => setSelectedCategory(null)}>Categorías</span> &gt; {selectedCategory}
                  </div>
                  <h4>Subcategorías</h4>
                  <ul>
                    {Object.keys(normasDB[selectedCategory]).map((subcategory, index) => (
                      <li key={index} onClick={() => selectSubcategory(subcategory)}>
                        {subcategory}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="normas-list">
                  <div className="modal-breadcrumb">
                    <span onClick={() => setSelectedCategory(null)}>Categorías</span> &gt; 
                    <span onClick={() => setSelectedSubcategory(null)}> {selectedCategory}</span> &gt; 
                    {selectedSubcategory}
                  </div>
                  <h4>Normas</h4>
                  <ul>
                    {Array.isArray(normasDB[selectedCategory][selectedSubcategory]) ? (
                      normasDB[selectedCategory][selectedSubcategory].map((norma, index) => (
                        <li key={index} onClick={() => selectNorma(norma)}>
                          {norma}
                        </li>
                      ))
                    ) : (
                      Object.entries(normasDB[selectedCategory][selectedSubcategory]).map(([tabla, normas], index) => (
                        <li key={index}>
                          <div className="tabla-header">{tabla}</div>
                          <ul className="tabla-normas">
                            {normas.map((norma, idx) => (
                              <li key={idx} onClick={() => selectNorma(norma)}>
                                {norma}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NormaAutocomplete;