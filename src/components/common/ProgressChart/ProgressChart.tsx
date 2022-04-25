import { FunctionComponent } from "react";
import styles from "./ProgressChart.module.scss";
import { Progress } from '@ant-design/plots';
interface ProgressChartProps {
  percent?:number;
}
 
const ProgressChart: FunctionComponent<ProgressChartProps> = (props) => {
  const {percent} = props;
  const config = {
    height: 30,
    width: 350,
    autoFit: false,
    percent: percent!,
    color: ['#5B8FF9', '#E8EDF3'],
  };
  return <div className={styles['progress-chart']}>
    <Progress {...config} />
  </div>;
}
 
export default ProgressChart;