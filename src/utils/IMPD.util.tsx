import React from 'react';

import BadFace from '../assets/bad-face.svg';
import HappyFace from '../assets/happy-face.svg';
import NormalFace from '../assets/normal-face.svg';

export function getIMPDSVG(impd: number) {
  if (impd >= 75) {
    return HappyFace;
  }

  if (impd >= 50) {
    return NormalFace;
  }

  return BadFace;
}

export function getIMPDColor(impd: number) {
  if (impd >= 75) {
    return '#03A35B';
  }

  if (impd >= 50) {
    return 'rgb(226, 174, 2)';
  }

  return 'rgb(153, 24, 43)';
}

export function getIMPDImage(impd: number) {
  if (impd >= 75) {
    return <img src={HappyFace} alt='Happy Icon' />;
  }

  if (impd >= 50) {
    return <img src={NormalFace} alt='Normal Icon' />;
  }

  return <img src={BadFace} alt='Bad Icon' />;
}
