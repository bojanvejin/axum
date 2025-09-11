import React from 'react';

interface AxumLogoProps {
  className?: string;
}

const AxumLogo: React.FC<AxumLogoProps> = ({ className }) => {
  return (
    <img src="/axum-logo.png" alt="Axum Logo" className={className} />
  );
};

export default AxumLogo;