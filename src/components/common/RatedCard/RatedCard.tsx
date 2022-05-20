import { ratingInfor } from '@const/interface';
import { Card, Divider, Rate, Row, Space, Typography } from 'antd';
import moment from 'moment';
import { FunctionComponent } from 'react';
import styles from './RatedCard.module.scss';
const {Text} = Typography;
interface RatedCardProps {
  /**
   * rated infor
   */
  rateInfor?: ratingInfor;
}

const RatedCard: FunctionComponent<RatedCardProps> = (props) => {
  const { rateInfor } = props;
  return (
    <div className={styles['rated-card']}>
      <Card
        title={
          <>
            <Row><Rate disabled defaultValue={rateInfor?.Rate_Counting} /></Row>
            <Row>"{rateInfor?.Rate_Detail}"</Row>
          </>
        }
        bordered={false}
        style={{ width: 300 }}
      >
        <Row>
          <Space size={'small'}>
          <Text>{rateInfor?.FullName}</Text>
          <Divider type='vertical'/>
          <Text>{moment(rateInfor?.Date_Out).format('MMMM D, YYYY')}</Text>
          </Space>
        </Row>
        
      </Card>
    </div>
  );
};

export default RatedCard;
