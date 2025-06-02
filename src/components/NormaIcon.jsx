import React from 'react';
import '../styles/NormaIcon.css';

const NormaIcon = ({ norma }) => {
  const getNormaType = (normaText) => {
    if (!normaText) return 'default';
    
    const normaLower = normaText.toLowerCase();
    
    if (normaLower.includes('agua potable') || normaLower.includes('nom-230')) {
      return 'agua-potable';
    } else if (normaLower.includes('agua residual') || normaLower.includes('nom-001') || 
               normaLower.includes('nom-002') || normaLower.includes('nom-003')) {
      return 'agua-residual';
    } else if (normaLower.includes('agua congénita') || normaLower.includes('congénita')) {
      return 'agua-congenita';
    } else if (normaLower.includes('ambiente laboral') || normaLower.includes('stps')) {
      return 'ambiente-laboral';
    } else if (normaLower.includes('metales') || normaLower.includes('metaloides')) {
      return 'metales';
    } else if (normaLower.includes('contaminantes')) {
      return 'contaminantes';
    } else {
      return 'default';
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'agua-potable':
        return <i className="fas fa-tint norma-icon agua-potable-icon" title="Agua Potable"></i>;
      case 'agua-residual':
        return <i className="fas fa-water norma-icon agua-residual-icon" title="Agua Residual"></i>;
      case 'agua-congenita':
        return <i className="fas fa-oil-can norma-icon agua-congenita-icon" title="Agua Congénita"></i>;
      case 'ambiente-laboral':
        return <i className="fas fa-hard-hat norma-icon ambiente-laboral-icon" title="Ambiente Laboral"></i>;
      case 'metales':
        return <i className="fas fa-flask norma-icon metales-icon" title="Metales y Metaloides"></i>;
      case 'contaminantes':
        return <i className="fas fa-biohazard norma-icon contaminantes-icon" title="Contaminantes"></i>;
      default:
        return <i className="fas fa-file-alt norma-icon default-icon" title="Norma"></i>;
    }
  };

  const normaType = getNormaType(norma);
  
  return (
    <span className="norma-icon-container">
      {renderIcon(normaType)}
      <span className="norma-text">{norma}</span>
    </span>
  );
};

export default NormaIcon;