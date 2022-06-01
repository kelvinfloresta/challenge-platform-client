import { Card, Col, Row } from 'antd';
import React, { useContext, useEffect, useMemo } from 'react';

import PageWrapper from '../../components/PageWrapper';
import { useDepartmentIMPDList } from '../../hooks/campaign/campaign.hook';
import { IMPDContext } from '../../hooks/campaign/impd.context';

import { BulletChart } from './BulletChart';
import { GaugeChart } from './GaugeChart';

const Dashboard = () => {
  const { loading: impdLoading, element: impd } = useContext(IMPDContext);
  const { list, elements, listLoading: loading } = useDepartmentIMPDList();

  useEffect(() => {
    const sub = list().subscribe();
    return () => sub.unsubscribe();
  }, [list]);

  const bulletChartData = useMemo(() => {
    return elements.map(el => {
      return {
        type: el.DepartmentName,
        ranges: [50, 75, 100],
        IMPD: [el.AVG],
        target: 100,
      };
    });
  }, [elements]);

  return (
    <PageWrapper title='Dashboard'>
      <Row gutter={32}>
        <Col lg={6} xs={24}>
          <Card title='IMPD Geral'>
            <GaugeChart loading={impdLoading} data={impd.companyAvg} />
          </Card>
        </Col>
        <Col lg={18} xs={24}>
          <Card title='IMPD por departamento'>
            <BulletChart loading={loading} data={bulletChartData} />
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  );
};

export default Dashboard;
