import { FunctionComponent } from "react";
import styles from "./LineChart.module.scss";
import { TinyArea } from '@ant-design/plots';
interface LineChartProps {
  data?: any;
}
 
const LineChart: FunctionComponent<LineChartProps> = (props) => {
  const {data} = props;
  ////////////////state
  const config = {
    height: 60,
    autoFit: false,
    data,
    smooth: true,
    areaStyle: {
      fill: '#d6e3fd',
    },
  };
  return <div className={styles['line-chart']}>
    <TinyArea {...config} />
  </div>;
}
 
export default LineChart;