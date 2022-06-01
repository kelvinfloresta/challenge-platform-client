import Gauge from '@ant-design/plots/es/components/gauge';
import React from 'react';

interface IGaugeChartProps {
  readonly data: number;
  readonly loading: boolean;
}

export const GaugeChart = ({ data, loading }: IGaugeChartProps) => {
  function getColor() {
    if (data >= 75) {
      return '#228B22';
    }
    if (data >= 50) {
      return '#FFFF00';
    }
    return '#FF0000';
  }

  return (
    <Gauge
      loading={loading}
      percent={data / 100}
      range={{
        color: getColor(),
      }}
      axis={{
        label: {
          formatter: v => +v * 100,
        },
      }}
      indicator={{
        pointer: {
          style: {
            stroke: '#D0D0D0',
          },
        },
        pin: {
          style: {
            stroke: '#D0D0D0',
          },
        },
      }}
      statistic={{
        content: {
          offsetY: 20,
          style: {
            fontSize: '36px',
          },
          formatter: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
        },
      }}
    />
  );
};
