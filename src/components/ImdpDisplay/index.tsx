import React from 'react';

import { getIMPDImage, getIMPDColor } from '../../utils/IMPD.util';

import { DataContainer, IndexContainer, ImdpTextIndicator } from './styles';

interface IImdpDisplayProps {
  readonly impd: number;
  readonly companyImpd: number;
}

const ImdpDisplay: React.FC<IImdpDisplayProps> = ({ impd, companyImpd }) => {
  return (
    <IndexContainer>
      <DataContainer>
        {getIMPDImage(impd)}
        <span>Meu IMPD</span>
        <ImdpTextIndicator color={getIMPDColor(impd)}>
          {impd}%
        </ImdpTextIndicator>
      </DataContainer>
      <DataContainer>
        {getIMPDImage(companyImpd)}
        <span>Empresa</span>
        <ImdpTextIndicator color={getIMPDColor(companyImpd)}>
          {companyImpd}%
        </ImdpTextIndicator>
      </DataContainer>
    </IndexContainer>
  );
};

export default ImdpDisplay;
