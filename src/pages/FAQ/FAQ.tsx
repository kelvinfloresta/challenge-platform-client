import { Collapse } from 'antd';
import React from 'react';

import { FAQData } from './FAQData';
import { CollapsePanel, DescriptionText } from './styles';

export const FAQ = () => {
  return (
    <Collapse style={{ marginTop: '-1rem' }} accordion ghost>
      {FAQData.map(element => (
        <CollapsePanel key={element.id} header={element.title}>
          <DescriptionText>{element.description}</DescriptionText>
        </CollapsePanel>
      ))}
    </Collapse>
  );
};
