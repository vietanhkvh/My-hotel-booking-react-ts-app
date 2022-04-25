import { FunctionComponent } from "react";
import styles from "./RingProgressChart.module.scss";
import { RingProgress } from '@ant-design/plots';
import { Row } from "antd";

interface RingProgressChartProps {
  percent?:number;
}
 
const RingProgressChart: FunctionComponent<RingProgressChartProps> = (props) => {
  const {percent} = props;
  const config = {
    height: 100,
    width: 100,
    autoFit: false,
    percent: percent!,
    color: [percent! <= 0.5? '#F4664A':'#5B8FF9', '#E8EDF3'],
    innerRadius: 0.85,
    radius: 0.98,
    statistic: {
      title: {
        style: {
          color: '#363636',
          fontSize: '12px',
          lineHeight: '14px',
        },
        // formatter: () => '234',
      },
    },
  };
  return <Row className={styles['ring-progress-chart']}>
    <RingProgress {...config} />
    
  </Row>;
}
 
export default RingProgressChart;