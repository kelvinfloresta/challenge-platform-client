import Bullet from '@ant-design/plots/es/components/bullet';
import { Datum, TooltipAttr } from '@antv/g2plot';
import React from 'react';

const BulletFixed = Bullet as any;

interface IDepartmentIMPD {
  readonly type: string;
  readonly ranges: readonly number[];
  readonly IMPD: readonly number[];
  readonly target: number;
}

interface IBulletChartProps {
  readonly loading: boolean;
  readonly data: IDepartmentIMPD[];
}

export const BulletChart = ({ data, loading }: IBulletChartProps) => {
  return (
    <BulletFixed
      data={data}
      key={400 + 40 * data.length}
      loading={loading}
      measureField='IMPD'
      rangeField='ranges'
      targetField='target'
      xField='type'
      height={400 + 40 * data.length}
      label={{
        measure: {
          formatter: ({ IMPD }: Datum) => `${IMPD}%`,
        },
      }}
      tooltip={{
        formatter: ({ mKey, IMPD }: Datum): ReturnType<TooltipAttr> => {
          return { name: mKey, value: `${IMPD}%` };
        },
      }}
      color={{
        range: ['#FFbcb8', '#FFe0b0', '#bfeec8'],
      }}
      yAxis={{
        tickMethod: ({ max }: any) => {
          const interval = Math.ceil(max / 4); // ticks
          return [0, interval, interval * 2, interval * 3, interval * 4, max];
        },
      }}
    />
  );
};
