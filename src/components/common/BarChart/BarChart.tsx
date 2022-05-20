import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { each, groupBy } from '@antv/util';
import styles from './BarChart.module.scss';
import { getTotalHotelIncomeY, getTotalRoomIncomeM } from '../../../services/common.service';
import { SUCCESS_CODE } from '../../constants';
interface BarChartProps {
  idAccout?: number;
  idHotel?: string;
  year?:any;
  xField?: string;
  yField?: string;
  seriesField?: string;
  setIncomeTHY?:(val:number)=>void
}

const BarChart: FunctionComponent<BarChartProps> = (props) => {
  const { idAccout, idHotel, year, xField, setIncomeTHY } = props;
  /////////////////////////////state
  const [data, setData] = useState<any>([]);
  const annotations: any = [];
  each(groupBy(data, xField!), (values, k) => {
    const value = values.reduce((a, b) => a + b.value, 0);
    annotations.push({
      type: 'text',
      position: [k, value],
      content: `${value}`,
      style: {
        textAlign: 'center',
        fontSize: 14,
        fill: 'rgba(0,0,0,0.85)',
      },
      offsetY: -10,
    });
  });
  const config = {
    data,
    width:1200,
    height:300,
    isStack: true,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    label: {
      // position: 'bottom',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
    annotations,
  };
  ///////////////////////////api
  const getTotalRIM = useCallback(
    async (idAccount?: number, idHotel?: string, year?:string) => {
      const payload = {
        idAccount: idAccount,
        idHotel: idHotel,
        year: year
      };
      const respond = await getTotalRoomIncomeM(payload);
      try {
        const res = await respond;
        if (res?.data?.code === SUCCESS_CODE) {
          setData(res?.data?.data);
        }
      } catch (error) {}
    },
    []
  );
  const getTotalIHY = useCallback(async (idAccount?: number, idHotel?:string, year?:any) => {
    const payload = {
      idAccount: idAccount,
      idHotel:idHotel,
      year:year
    };
    const respond = await getTotalHotelIncomeY(payload);
    try {
      const res = await respond;
      if (res?.data?.code === SUCCESS_CODE) {
        setIncomeTHY&&setIncomeTHY(res?.data?.data);
      }
    } catch (error) {}
  }, [setIncomeTHY]);
  //////////////////////event
  useEffect(() => {
    getTotalRIM(idAccout, idHotel, year);
    getTotalIHY(idAccout, idHotel, year);
  }, [getTotalIHY, getTotalRIM, idAccout, idHotel, year]);
  return (
    <div className={styles['bar-chart']}>
      <Column {...config} />
    </div>
  );
};

export default BarChart;
